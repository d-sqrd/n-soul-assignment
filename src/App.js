import React from "react";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import Login from "./components/Login";
import TasksContainer from "./components/TasksContainer";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Login />
        <TasksContainer />
      </div>
    </AppProvider>
  );
}

export default App;
