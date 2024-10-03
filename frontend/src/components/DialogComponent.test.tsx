// DialogComponent.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DialogComponent from './DialogComponent';

describe('DialogComponent', () => {
  const setNewTodoTitle = jest.fn();
  const setNewTodoAssignedTo = jest.fn();
  const closeDialog = jest.fn();
  const addTodo = jest.fn();

  test('renders the dialog when isOpen is true', () => {
    render(
      <DialogComponent
        isOpen={true}
        newTodoTitle=""
        newTodoAssignedTo=""
        setNewTodoTitle={setNewTodoTitle}
        setNewTodoAssignedTo={setNewTodoAssignedTo}
        closeDialog={closeDialog}
        addTodo={addTodo}
      />
    );

    expect(screen.getByText('Create New Todo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Todo Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Assign to')).toBeInTheDocument();
  });

  test('does not render the dialog when isOpen is false', () => {
    render(
      <DialogComponent
        isOpen={false}
        newTodoTitle=""
        newTodoAssignedTo=""
        setNewTodoTitle={setNewTodoTitle}
        setNewTodoAssignedTo={setNewTodoAssignedTo}
        closeDialog={closeDialog}
        addTodo={addTodo}
      />
    );

    expect(screen.queryByText('Create New Todo')).not.toBeInTheDocument();
  });

  test('updates newTodoTitle when the input changes', () => {
    render(
      <DialogComponent
        isOpen={true}
        newTodoTitle=""
        newTodoAssignedTo=""
        setNewTodoTitle={setNewTodoTitle}
        setNewTodoAssignedTo={setNewTodoAssignedTo}
        closeDialog={closeDialog}
        addTodo={addTodo}
      />
    );

    const titleInput = screen.getByPlaceholderText('Enter Todo Title');
    fireEvent.change(titleInput, { target: { value: 'New Todo' } });
    
    expect(setNewTodoTitle).toHaveBeenCalledWith('New Todo');
  });

  test('updates newTodoAssignedTo when the input changes', () => {
    render(
      <DialogComponent
        isOpen={true}
        newTodoTitle=""
        newTodoAssignedTo=""
        setNewTodoTitle={setNewTodoTitle}
        setNewTodoAssignedTo={setNewTodoAssignedTo}
        closeDialog={closeDialog}
        addTodo={addTodo}
      />
    );

    const assignedToInput = screen.getByPlaceholderText('Assign to');
    fireEvent.change(assignedToInput, { target: { value: 'Alice' } });
    
    expect(setNewTodoAssignedTo).toHaveBeenCalledWith('Alice');
  });

  test('calls closeDialog when the Cancel button is clicked', () => {
    render(
      <DialogComponent
        isOpen={true}
        newTodoTitle=""
        newTodoAssignedTo=""
        setNewTodoTitle={setNewTodoTitle}
        setNewTodoAssignedTo={setNewTodoAssignedTo}
        closeDialog={closeDialog}
        addTodo={addTodo}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(closeDialog).toHaveBeenCalled();
  });

  test('calls addTodo when the Add Todo button is clicked', () => {
    render(
      <DialogComponent
        isOpen={true}
        newTodoTitle=""
        newTodoAssignedTo=""
        setNewTodoTitle={setNewTodoTitle}
        setNewTodoAssignedTo={setNewTodoAssignedTo}
        closeDialog={closeDialog}
        addTodo={addTodo}
      />
    );

    const addButton = screen.getByText('Add Todo');
    fireEvent.click(addButton);
    
    expect(addTodo).toHaveBeenCalled();
  });
});
