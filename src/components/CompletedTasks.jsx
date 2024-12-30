import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import { AppContext } from "../context/AppContext";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Task from "./Task";
import EmptyTaskPlaceholder from "./EmptyTaskPlaceholder";

const CompletedTasks = () => {
  const { taskList } = useContext(AppContext);
  const completedTasks = taskList.filter((task) => task.completed === true);
  return (
    <Container
      style={{
        backgroundColor: "#A7BEAE",
        borderRadius: "10px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Row>
        <Col style={{ marginTop: "15px" }}>
          <h3>Completed Tasks</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          {taskList && taskList.length
            ? taskList.map((task) => {
                if (task?.completed) {
                  return <Task key={task.id} task={task} />;
                }
                return null;
              })
            : null}
        </Col>
      </Row>
      <Row>
        <Col>
          {completedTasks && !completedTasks.length ? (
            <EmptyTaskPlaceholder textToShow="Please complete some tasks!" />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default CompletedTasks;
