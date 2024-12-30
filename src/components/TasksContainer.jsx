import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PendingTasks from "./PendingTasks";
import CompletedTasks from "./CompletedTasks";
import NewTask from "./NewTask";
import Button from "react-bootstrap/esm/Button";
import { AppContext } from "../context/AppContext";
import Header from "./Header";

const TasksContainer = () => {
  const { showNewTaskModal, isUserLoggedIn } = useContext(AppContext);
  const handleNewTask = () => {
    showNewTaskModal();
  };

  return (
    <>
      {isUserLoggedIn && (
        <Container fluid style={{ backgroundColor: "#E7E8D1" }}>
          <Row>
            <Col>
              <Header />
            </Col>
          </Row>
          <Row>
            <Col
              lg={6}
              style={{
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <PendingTasks />
            </Col>
            <Col
              lg={6}
              style={{
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <CompletedTasks />
            </Col>
          </Row>
          <Button
            style={{ position: "fixed", bottom: 10, right: 10 }}
            onClick={handleNewTask}
          >
            New Task
          </Button>
          <NewTask />
        </Container>
      )}
    </>
  );
};

export default TasksContainer;
