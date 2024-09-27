import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DialogComponent from '../components/DialogComponent';
import ITodoItem from '../interfaces/ITodoItem';
import { fetchTodos, createTodo, deleteTodo } from '../api/todoApi';

function Dashboard() {
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoAssignedTo, setNewTodoAssignedTo] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch todos from the backend
  const loadTodos = async () => {
    try {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Add a new todo
  const addTodo = async () => {
    if (newTodoTitle && newTodoAssignedTo) {
      const newTodo: Omit<ITodoItem, '_id'> = {
        title: newTodoTitle,
        assignedTo: newTodoAssignedTo,
        tasks: [],
        comments: [],
      };
      try {
        const createdTodo = await createTodo(newTodo);
        setTodos([...todos, createdTodo]);
        setNewTodoTitle('');
        setNewTodoAssignedTo('');
        setIsDialogOpen(false); // Close the dialog after adding
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Fetch todos when the component mounts
  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-purple-600 mb-8">Todo Dashboard</h1>

      {/* Open Create Todo Dialog */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
      >
        Create New Todo
      </button>

      {/* Todo List */}
      <div className="w-full max-w-lg mt-8">
        {todos.length === 0 ? (
          <p className="text-gray-500">No todos added yet.</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li key={todo._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                <Link to={`/todo/${todo._id}`}>
                  <h2 className="text-xl font-semibold text-purple-700">{todo.title}</h2>
                  <p className="text-gray-600">Assigned to: {todo.assignedTo}</p>
                </Link>
                <button
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dialog Component */}
      <DialogComponent
        isOpen={isDialogOpen}
        newTodoTitle={newTodoTitle}
        newTodoAssignedTo={newTodoAssignedTo}
        setNewTodoTitle={setNewTodoTitle}
        setNewTodoAssignedTo={setNewTodoAssignedTo}
        closeDialog={() => setIsDialogOpen(false)}
        addTodo={addTodo}
      />
    </div>
  );
}

export default Dashboard;
