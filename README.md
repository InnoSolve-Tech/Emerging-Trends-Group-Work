# Express & React TypeScript Project

This project contains a simple web application with a **backend** powered by Express and a **frontend** built with React, both written in TypeScript. The backend runs on Node.js 20.

## Project Structure

The project is split into two main directories:

- **backend**: An Express.js API.
- **frontend**: A React application.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js v20
- npm or Yarn

## Getting Started

### 1. Clone the Repository

Run the following commands in your terminal:

```
git clone https://github.com/InnoSolve-Tech/Group_BSE24_16.git
cd your-repo
```

### 2. Install Dependencies

Install dependencies for both the backend and frontend:

#### Backend (Express)

Navigate to the backend directory and install the dependencies:

```
cd backend
npm install
```

#### Frontend (React)

Navigate to the frontend directory and install the dependencies:

```
cd frontend
npm install
```

### 3. Running the Application

#### Running Backend (Express)

To start the backend API, run the following commands:

```
cd backend
npm run dev
```

The Express server will start on `http://localhost:4000` (default port).

#### Running Frontend (React)

To start the React frontend, run the following commands:

```
cd frontend
npm start
```

The React application will start on `http://localhost:3000` (default port).

### 4. Building for Production

#### Backend

To build the backend for production, run the following commands:

```
cd backend
npm run start
```

#### Frontend

To build the frontend for production, run the following commands:

```
cd frontend
npm run build
```

This will generate a `build/` directory for your React app, ready for deployment.

## API Endpoints

### Live Endpoints

- **Backend API**: [https://capstone-backend-bse-16.web.app](https://capstone-backend-bse-16.web.app)  
  - Accessible at `https://capstone-backend-bse-16.web.app/api/todos` (for todos)
  
- **Frontend Application**: [https://capstone-frontend-bse-16.web.app](https://capstone-frontend-bse-16.web.app)

### Backend API Documentation

| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| GET    | `/api/todos`   | Fetch all todos        |
| POST   | `/api/todos`   | Create a new todo      |
| GET    | `/api/todos/:id` | Fetch a todo by ID   |
| PUT    | `/api/todos/:id` | Update a todo by ID  |
| DELETE | `/api/todos/:id` | Delete a todo by ID  |
| POST   | `/api/todos/:id/comments` | Add a comment to a specific todo |

## Technologies Used

- **Backend**: Express.js, TypeScript
- **Frontend**: React, TypeScript
- **Node.js v20**

## License

This project is licensed under the MIT License - see the LICENSE file for details.