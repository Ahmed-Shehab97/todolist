import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../context/TodoContext.js";

export default function TodoList() {
  const { todos, setTodo } = useContext(TodoContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("All");

  // filteration arrays
  const doneTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const notDoneTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;
  if (displayedTodosType === "Done") {
    todosToBeRendered = doneTodos;
  } else if (displayedTodosType === "notDone") {
    todosToBeRendered = notDoneTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todoJsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    console.log("calling use effect");
    const storageTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodo(storageTodos);
  });

  function changeDisplayType(e) {
    setDisplayedTodosType(e.target.value);
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          maxHeight: "80vh",
          overflow: "scroll",
        }}
      >
        <CardContent>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            مهامي
          </Typography>
          <Divider />

          {/* filter buttons */}
          <ToggleButtonGroup
            className="my-toggle-group"
            color="primary"
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayType}
            aria-label="Platform"
          >
            <ToggleButton value="notDone">غير منجز</ToggleButton>
            <ToggleButton value="Done">منجز</ToggleButton>
            <ToggleButton value="All">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* filter buttons */}

          {/* All Todo */}
          {todoJsx}
          {/* All Todo */}

          {/* Input + Add Button */}
          <Grid container sx={{ marginTop: "10px" }} spacing={2}>
            <Grid
              size={8}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="عنوان المهمه"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>

            <Grid
              size={4}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                onClick={() => {
                  const newTodo = {
                    id: uuidv4(),
                    title: titleInput,
                    details: "",
                    isCompleted: false,
                  };

                  const updatedTodos = [...todos, newTodo];
                  setTodo(updatedTodos);
                  localStorage.setItem("todos", JSON.stringify(updatedTodos));
                  setTitleInput("");
                }}
                disabled={titleInput.length === 0}
              >
                اضافه
              </Button>
            </Grid>
          </Grid>
          {/* Input + Add Button */}
        </CardContent>
      </Card>
    </Container>
  );
}
