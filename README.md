
# Express & React TypeScript Project

This project contains a simple web application with a **backend** powered by Express and a **frontend** built with React, both written in TypeScript. The backend runs on Node.js 20.

## Project Structure

The project is split into two main directories:

- **backend**: An Express.js API.
- **frontend**: A React application.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js v20](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/InnoSolve-Tech/Group_BSE24_16.git
cd your-repo
```

### 2. Install Dependencies

Install dependencies for both the backend and frontend:

#### Backend (Express)
```bash
cd backend
npm install
```

#### Frontend (React)
```bash
cd frontend
npm install
```

### 3. Running the Application

#### Running Backend (Express)
To start the backend API, run the following commands:

```bash
cd backend
npm run dev
```

The Express server will start on `http://localhost:4000` (default port).

#### Running Frontend (React)
To start the React frontend, run the following commands:

```bash
cd frontend
npm start
```

The React application will start on `http://localhost:3000` (default port).

### 4. Building for Production

#### Backend
To build the backend for production, run:

```bash
cd backend
npm run start
```

#### Frontend
To build the frontend for production, run:

```bash
cd frontend
npm run build
```

This will generate a `build/` directory for your React app, ready for deployment.

## API Endpoints

### Backend API

| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| GET    | `/`  | Sample API route       |

## Technologies Used

- **Backend**: [Express.js](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/)
- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Node.js v20**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
