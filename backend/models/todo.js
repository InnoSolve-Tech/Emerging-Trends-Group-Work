const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Comment Schema (subdocument)
const commentSchema = new Schema({
  user: {
    type: String,
    required: true,
    comment: "Name of the user who made the comment"
  },
  comment: {
    type: String,
    required: true,
    comment: "The actual comment text"
  },
  date: {
    type: Date,
    default: Date.now,
    comment: "Date the comment was created"
  }
});

// Define Todo Schema
const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    comment: "Title of the todo task"
  },
  assignedTo: {
    type: String,
    required: true,
    comment: "Person to whom the todo is assigned"
  },
  tasks: {
    type: [String], // Array of task descriptions
    required: true,
    comment: "List of tasks associated with this todo"
  },
  comments: [commentSchema] // Array of Comment subdocuments
});

// Create the Todo model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
