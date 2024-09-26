export default interface ITodoItem {
    _id: string;
    title: string;
    assignedTo: string;
    tasks: string[];
    comments: { user: string; comment: string, date: Date }[];
  }