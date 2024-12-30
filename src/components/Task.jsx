import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { AppContext } from "../context/AppContext";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";

const Task = ({ task }) => {
  const { taskList, updateTaskList } = useContext(AppContext);
  const [isUpdateTask, setIsUpdateTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);

  const handleMarkComplete = () => {
    let updatedTaskList = taskList.map((taskItem) => {
      if (taskItem?.id === task?.id) {
        taskItem.completed = true;
      }
      return taskItem;
    });
    updateTaskList(updatedTaskList);
  };

  const handleMarkPending = () => {
    let updatedTaskList = taskList.map((taskItem) => {
      if (taskItem?.id === task?.id) {
        taskItem.completed = false;
      }
      return taskItem;
    });
    updateTaskList(updatedTaskList);
  };

  const handleDelete = () => {
    let updatedTaskList = taskList.filter((taskItem) => {
      return taskItem?.id !== task?.id;
    });
    updateTaskList(updatedTaskList);
  };

  const handleEdit = () => {
    setIsUpdateTask(true);
  };

  const handleSave = () => {
    let updatedTaskList = taskList.map((taskItem) => {
      if (taskItem.id === task.id) {
        task.title = taskTitle;
        task.description = taskDescription;
      }
      return taskItem;
    });
    updateTaskList(updatedTaskList);
    setIsUpdateTask(false);
  };
  return (
    <>
      <Card
        style={{
          margin: "15px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Card.Header>{`Task #${task?.id}`}</Card.Header>
        <Card.Body>
          <Card.Title>
            {isUpdateTask ? (
              <>
                <Form.Label>Task Title</Form.Label>
                <Form.Control
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
              </>
            ) : (
              taskTitle
            )}
          </Card.Title>
          <Card.Text>
            {isUpdateTask ? (
              <>
                <Form.Label>Task Description</Form.Label>
                <Form.Control
                  type="text"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </>
            ) : (
              taskDescription
            )}
          </Card.Text>
          <Container
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            {!task?.completed ? (
              <Button variant="success" onClick={handleMarkComplete}>
                Mark Complete
              </Button>
            ) : (
              <Button variant="primary" onClick={handleMarkPending}>
                Mark Pending
              </Button>
            )}
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            {isUpdateTask ? (
              <Button variant="secondary" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleEdit}>
                Edit
              </Button>
            )}
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default Task;
