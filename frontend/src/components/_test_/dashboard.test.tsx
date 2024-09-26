import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../../pages/Dashboard";
import { fetchTodos, createTodo, deleteTodo } from "../../api/todoApi";

// Mock the API functions
jest.mock("../../api/todoApi", () => ({
  fetchTodos: jest.fn(),
  createTodo: jest.fn(),
  deleteTodo: jest.fn(),
}));

describe("Dashboard Component", () => {
  const mockTodos = [
    {
      _id: "1",
      title: "First Todo",
      assignedTo: "User1",
      tasks: [],
      comments: [],
    },
    {
      _id: "2",
      title: "Second Todo",
      assignedTo: "User2",
      tasks: [],
      comments: [],
    },
  ];

  beforeEach(() => {
    fetchTodos.mockResolvedValue(mockTodos);
    createTodo.mockResolvedValue({
      _id: "3",
      title: "New Todo",
      assignedTo: "User3",
      tasks: [],
      comments: [],
    });
    deleteTodo.mockResolvedValue({});
  });

  test("renders todos correctly after fetching from API", async () => {
    render(<Dashboard />);

    expect(screen.getByText("No todos added yet.")).toBeInTheDocument();

    await waitFor(() => expect(fetchTodos).toHaveBeenCalled());

    expect(screen.getByText("First Todo")).toBeInTheDocument();
    expect(screen.getByText("Assigned to: User1")).toBeInTheDocument();
    expect(screen.getByText("Second Todo")).toBeInTheDocument();
    expect(screen.getByText("Assigned to: User2")).toBeInTheDocument();
  });

  test("opens and closes the dialog when clicking the Create New Todo button", () => {
    render(<Dashboard />);

    expect(screen.queryByText("Add New Todo")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Create New Todo"));

    expect(screen.getByText("Add New Todo")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.queryByText("Add New Todo")).not.toBeInTheDocument();
  });

  test("adds a new todo and closes the dialog", async () => {
    render(<Dashboard />);

    fireEvent.click(screen.getByText("Create New Todo"));

    fireEvent.change(screen.getByPlaceholderText("Todo title"), {
      target: { value: "New Todo" },
    });
    fireEvent.change(screen.getByPlaceholderText("Assign to"), {
      target: { value: "User3" },
    });

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() =>
      expect(createTodo).toHaveBeenCalledWith({
        title: "New Todo",
        assignedTo: "User3",
        tasks: [],
        comments: [],
      })
    );

    expect(screen.getByText("New Todo")).toBeInTheDocument();
    expect(screen.getByText("Assigned to: User3")).toBeInTheDocument();
    expect(screen.queryByText("Add New Todo")).not.toBeInTheDocument();
  });

  test("deletes a todo from the list", async () => {
    render(<Dashboard />);

    await waitFor(() => expect(fetchTodos).toHaveBeenCalled());

    fireEvent.click(screen.getAllByText("Delete")[0]);

    await waitFor(() => expect(deleteTodo).toHaveBeenCalledWith("1"));

    expect(screen.queryByText("First Todo")).not.toBeInTheDocument();
  });
});
