// src/api/todoApi.ts
import axios from 'axios';
import ITodoItem from '../interfaces/ITodoItem';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000/api/todos' // Development API URL
  : 'https://your-live-endpoint/api/todos';

// Function to fetch all todos
export const fetchTodos = async (): Promise<ITodoItem[]> => {
  const response = await axios.get<ITodoItem[]>(API_URL);
  return response.data;
};

// Function to create a new todo
export const createTodo = async (newTodo: Omit<ITodoItem, '_id'>): Promise<ITodoItem> => {
  const response = await axios.post<ITodoItem>(API_URL, newTodo);
  return response.data;
};

// Function to update a todo
export const updateTodo = async (id: string, updatedTodo: ITodoItem): Promise<ITodoItem> => {
  const response = await axios.put<ITodoItem>(`${API_URL}/${id}`, updatedTodo);
  return response.data;
};

// Function to delete a todo
export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

// Function to fetch a single todo by ID
export const fetchTodoById = async (id: string): Promise<ITodoItem> => {
    const response = await axios.get<ITodoItem>(`${API_URL}/${id}`);
    return response.data;
  };