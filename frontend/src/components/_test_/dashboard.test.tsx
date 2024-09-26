// Dashboard.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';
import { fetchTodos, createTodo, deleteTodo } from '../../api/todoApi';
import ITodoItem from '../../interfaces/ITodoItem';


// Mock the API functions
jest.mock('../../api/todoApi');

describe('Dashboard Component', () => {
  // Sample todos data
  const mockTodos: ITodoItem[] = [
    { _id: '1', title: 'First Todo', assignedTo: 'User1', tasks: [], comments: [] },
    { _id: '2', title: 'Second Todo', assignedTo: 'User2', tasks: [], comments: [] },
  ];

  beforeEach(() => {
    (fetchTodos as jest.Mock).mockResolvedValue(mockTodos);
    (createTodo as jest.Mock).mockResolvedValue({ _id: '3', title: 'New Todo', assignedTo: 'User3', tasks: [], comments: [] });
    (deleteTodo as jest.Mock).mockResolvedValue({});
  });

  test('renders todos correctly after fetching from API', async () => {
    render(<Dashboard />);

    // Ensure loading state or empty state is visible first
    expect(screen.getByText('No todos added yet.')).toBeInTheDocument();

    // Wait for the todos to load
    await waitFor(() => expect(fetchTodos).toHaveBeenCalled());

    // Check if the todos are rendered correctly
    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Assigned to: User1')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
    expect(screen.getByText('Assigned to: User2')).toBeInTheDocument();
  });

  test('opens and closes the dialog when clicking the Create New Todo button', () => {
    render(<Dashboard />);

    // Initially, the dialog should not be visible
    expect(screen.queryByText('Add New Todo')).not.toBeInTheDocument();

    // Click the 'Create New Todo' button
    fireEvent.click(screen.getByText('Create New Todo'));

    // The dialog should now be visible
    expect(screen.getByText('Add New Todo')).toBeInTheDocument();

    // Close the dialog
    fireEvent.click(screen.getByText('Cancel'));

    // The dialog should be closed again
    expect(screen.queryByText('Add New Todo')).not.toBeInTheDocument();
  });

  test('adds a new todo and closes the dialog', async () => {
    render(<Dashboard />);

    // Open the dialog
    fireEvent.click(screen.getByText('Create New Todo'));

    // Fill the form fields
    fireEvent.change(screen.getByPlaceholderText('Todo title'), { target: { value: 'New Todo' } });
    fireEvent.change(screen.getByPlaceholderText('Assign to'), { target: { value: 'User3' } });

    // Submit the form
    fireEvent.click(screen.getByText('Add'));

    // Wait for the API call to create a todo
    await waitFor(() => expect(createTodo).toHaveBeenCalledWith({
      title: 'New Todo',
      assignedTo: 'User3',
      tasks: [],
      comments: [],
    }));

    // Check if the new todo is added to the list
    expect(screen.getByText('New Todo')).toBeInTheDocument();
    expect(screen.getByText('Assigned to: User3')).toBeInTheDocument();

    // The dialog should be closed after adding
    expect(screen.queryByText('Add New Todo')).not.toBeInTheDocument();
  });

  test('deletes a todo from the list', async () => {
    render(<Dashboard />);

    // Wait for the todos to load
    await waitFor(() => expect(fetchTodos).toHaveBeenCalled());

    // Click delete on the first todo
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Wait for the delete API call
    await waitFor(() => expect(deleteTodo).toHaveBeenCalledWith('1'));

    // Ensure the first todo is removed from the list
    expect(screen.queryByText('First Todo')).not.toBeInTheDocument();
  });
});
