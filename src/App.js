import React from "react";
import "./App.css";
import TodoList from "./Componant/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodoContext } from "./context/TodoContext.js";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
});

const todoValue = [
  {
    id: uuidv4(),
    title: "قراءه كتاب",
    details: "كتاب الحياه",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءه كتاب",
    details: "كتاب الحياه",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءه كتاب",
    details: "كتاب الحياه",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodo] = useState(todoValue);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TodoContext.Provider value={{ todos, setTodo }}>
          <TodoList />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
