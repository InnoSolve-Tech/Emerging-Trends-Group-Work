import React from "react";

interface DialogProps {
  isOpen: boolean;
  newTodoTitle: string;
  newTodoAssignedTo: string;
  setNewTodoTitle: (title: string) => void;
  setNewTodoAssignedTo: (assignedTo: string) => void;
  closeDialog: () => void;
  addTodo: () => void;
}

function DialogComponent({
  isOpen,
  newTodoTitle,
  newTodoAssignedTo,
  setNewTodoTitle,
  setNewTodoAssignedTo,
  closeDialog,
  addTodo,
}: DialogProps) {
  if (!isOpen) return null; // Don't render anything if the dialog is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">
          Create New Todo
        </h2>
        <div>
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Enter Todo Title"
            className="w-full p-2 mb-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            value={newTodoAssignedTo}
            onChange={(e) => setNewTodoAssignedTo(e.target.value)}
            placeholder="Assign to"
            className="w-full p-2 mb-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={closeDialog}
            className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={addTodo}
            className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
}

export default DialogComponent;
