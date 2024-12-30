import React, { useContext, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { AppContext } from "../context/AppContext";

const NewTask = () => {
  const { isNewTaskModalVisible, hideNewTaskModal, taskList, updateTaskList } =
    useContext(AppContext);
  const taskTitleRef = useRef(null);
  const taskDescriptionRef = useRef(null);

  const handleSave = () => {
    let tempTaskList = taskList;
    let newTaskObj = {
      userId: 1,
      id: Math.floor(
        Math.random() * (1000 - (taskList.length + 10)) + (taskList.length + 10)
      ),
      title: taskTitleRef.current.value,
      completed: false,
      description: taskDescriptionRef.current.value,
    };
    tempTaskList.push(newTaskObj);
    updateTaskList(tempTaskList);
    hideNewTaskModal();
  };
  return (
    <>
      <Modal
        show={isNewTaskModalVisible}
        onHide={hideNewTaskModal}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                ref={taskTitleRef}
                onChange={(e) => (taskTitleRef.current.value = e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                type="text"
                ref={taskDescriptionRef}
                onChange={(e) =>
                  (taskDescriptionRef.current.value = e.target.value)
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideNewTaskModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewTask;
