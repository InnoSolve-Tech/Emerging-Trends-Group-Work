import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ITodoItem from '../interfaces/ITodoItem';
import { fetchTodoById, updateTodo } from '../api/todoApi'; // Ensure you have these API functions

function TodoDetails() {
  const { id } = useParams<{ id: string }>(); // Get ID from the URL
  const [todo, setTodo] = useState<ITodoItem | null>(null); // State for the todo item
  const [loading, setLoading] = useState(true); // State for loading status
  const [newTask, setNewTask] = useState(''); // State for new task input
  const [newComment, setNewComment] = useState(''); // State for new comment input
  const [commentUser, setCommentUser] = useState(''); // State for user input in comments

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const fetchedTodo = await fetchTodoById(id!);
        setTodo(fetchedTodo);
      } catch (error) {
        console.error('Error fetching todo:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodo();
  }, [id]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return;

    const updatedTodo = {
      ...todo,
      tasks: [...todo.tasks, newTask], // Add the new task to the existing tasks
    };

    try {
      await updateTodo(id!, updatedTodo); // Make API call to update the todo
      setTodo(updatedTodo); // Update local state
      setNewTask(''); // Clear the input
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return;

    const updatedTodo: ITodoItem = {
      ...todo,
      comments: [
        ...todo.comments,
        { user: commentUser, comment: newComment, date: new Date() }, // Add the new comment
      ],
    };

    try {
      await updateTodo(id!, updatedTodo); // Make API call to update the todo
      setTodo(updatedTodo); // Update local state
      setNewComment(''); // Clear the input
      setCommentUser(''); // Clear the user input
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteTask = async (taskToDelete: string) => {
    if (!todo) return;

    const updatedTodo = {
      ...todo,
      tasks: todo.tasks.filter((task) => task !== taskToDelete), // Remove the deleted task
    };

    try {
      await updateTodo(id!, updatedTodo); // Make API call to update the todo
      setTodo(updatedTodo); // Update local state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDeleteComment = async (commentToDelete: { user: string; comment: string; date: Date; }) => {
    if (!todo) return;

    const updatedTodo = {
      ...todo,
      comments: todo.comments.filter((comment) => comment !== commentToDelete), // Remove the deleted comment
    };

    try {
      await updateTodo(id!, updatedTodo); // Make API call to update the todo
      setTodo(updatedTodo); // Update local state
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!todo) {
    return <p className="text-red-500">Todo not found!</p>;
  }

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-purple-600 mb-8">Todo Details</h1>
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">{todo.title}</h2>
        <p className="text-gray-600 mb-6">Assigned to: {todo.assignedTo}</p>

        <h3 className="text-xl font-semibold text-purple-600 mb-2">Tasks:</h3>
        {todo.tasks.length > 0 ? (
          <ul className="list-disc pl-5 mb-6 space-y-2">
            {todo.tasks.map((task, index) => (
              <li key={index} className="text-gray-700 flex justify-between items-center">
                {task}
                <button 
                  onClick={() => handleDeleteTask(task)} 
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mb-6">No tasks added yet.</p>
        )}

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="mb-6 flex">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="border p-2 rounded flex-grow"
            required
          />
          <button type="submit" className="ml-2 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">Add Task</button>
        </form>

        <h3 className="text-xl font-semibold text-purple-600 mb-2">Comments:</h3>
        <div className="space-y-4 mb-6">
          {todo.comments.length > 0 ? (
            todo.comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{comment.user}</p>
                  <p className="text-gray-600">{comment.comment}</p>
                  <p className="text-gray-500 text-sm">{new Date(comment.date.toString()).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => handleDeleteComment(comment)} 
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleAddComment} className="flex">
          <input
            type="text"
            value={commentUser}
            onChange={(e) => setCommentUser(e.target.value)}
            placeholder="Your name"
            className="border p-2 rounded mr-2 flex-grow"
            required
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a new comment"
            className="border p-2 rounded mr-2 flex-grow"
            required
          />
          <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">Add Comment</button>
        </form>

        <Link
          to="/"
          className="mt-6 inline-block bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default TodoDetails;
