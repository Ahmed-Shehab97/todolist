import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// DIALOG IMPORT
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext.js";

export default function Todo({ todo }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { todos, setTodo } = useContext(TodoContext);
  const [showEditeDialog, setShowEditeDialog] = useState(false);
  const [Edite, SetEdite] = useState({
    title: todo.title,
    details: todo.details,
  });

  // EVENT HANLERS
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodo(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleEditeClick() {
    setShowEditeDialog(true);
  }

  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }

  function handleEditeClose() {
    setShowEditeDialog(false);
  }

  function handleDelete() {
    const DeletedTodo = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodo(DeletedTodo);
    localStorage.setItem("todos", JSON.stringify(DeletedTodo));
  }

  function handleEdite() {
    const EditeTodo = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: Edite.title, details: Edite.details };
      } else {
        return t;
      }
    });
    setTodo(EditeTodo);
    setShowEditeDialog(false);
    localStorage.setItem("todos", JSON.stringify(EditeTodo));
  }

  // {
  //   /*  ======================== ICON STYLE ================================ */
  // }

  const iconButtonStyle = {
    border: "solid 3px",
    background: "white",
    transition: "transform 0.2s ease, color 0.3s ease",
  };

  const deleteButtonStyle = {
    ...iconButtonStyle,
    color: "#f44336",
    "&:hover": {
      transform: "scale(1.2)",
      background: "white",
    },
  };

  const editButtonStyle = {
    ...iconButtonStyle,
    color: "#2196f3",
    "&:hover": {
      transform: "scale(1.2)",
      background: "white",
    },
  };

  const checkButtonStyle = {
    ...iconButtonStyle,
    color: todo.isCompleted ? "#4caf50" : "#9e9e9e",
    "&:hover": {
      transform: "scale(1.2)",
      background: "white",
    },
  };

  // {
  //   /*  ======================== ICON STYLE ================================ */
  // }

  return (
    <>
      {/*  ======================== DELETE MODAL ================================ */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متاكد من حذف هذه المهمه؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            اضغط علي زر حذف اذا كنت تريد حذف هذه المهمه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>الغاء</Button>
          <Button onClick={handleDelete} autoFocus>
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/*  ======================== DELETE MODAL ================================ */}

      {/*  ======================== EDITE MODAL ================================ */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showEditeDialog}
        onClose={handleEditeClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"تعديل المهمه"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمه"
            fullWidth
            variant="standard"
            value={Edite.title}
            onChange={(e) => SetEdite({ ...Edite, title: e.target.value })}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="تفاصيل المهمه"
            fullWidth
            variant="standard"
            value={Edite.details}
            onChange={(e) => SetEdite({ ...Edite, details: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditeClose}>الغاء</Button>
          <Button onClick={handleEdite} autoFocus>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/*  ======================== EDITE MODAL ================================ */}

      <Card
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  fontWeight: "bold",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>

            {/* Action buttons */}
            <Grid
              item
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton sx={checkButtonStyle} onClick={handleCheckClick}>
                <CheckCircleIcon />
              </IconButton>
              <IconButton sx={editButtonStyle} onClick={handleEditeClick}>
                <EditIcon />
              </IconButton>
              <IconButton sx={deleteButtonStyle} onClick={handleDeleteClick}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
