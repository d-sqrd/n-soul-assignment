// Component that renders the initial UI whenver an user comes to this app _> This component renders a Login form

import React, { useContext, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { AppContext } from "../context/AppContext";
import useWindowSize from "../hooks/useWindowSize";
import Header from "./Header";
import pushUserCredToEndOfList from "../utils/pushUserCredToEndOfList";

function Login() {
  // use useRef instead of useState to capture user input as we don't want to unneccessarily re-render on user input
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { isUserLoggedIn, setUserLogin, updateTaskList, setUserEmail } =
    useContext(AppContext);
  const windowSize = useWindowSize();

  const fetchTasks = async (currLoginCreds, storedTasks) => {
    console.log(`fetch-taks...${currLoginCreds}`);
    let response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1/todos"
    );
    response = await response.json();
    response = response.map((item) => {
      let dummyDescription =
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates dicta, reiciendis exercitationem earum accusantium fuga dolor suscipit laborum fugiat accusamus incidunt nisi voluptatem est saepe! Eligendi voluptates non itaque ratione.";
      let sliceLen = Math.random() * (dummyDescription.length - 20) + 20;
      dummyDescription = dummyDescription.slice(0, sliceLen);
      item.description = dummyDescription;
      return item;
    });
    let tasksObj = {
      user: {
        email: currLoginCreds.email,
      },
      tasks: response,
    };
    storedTasks.push(tasksObj);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    updateTaskList(response);
    console.log(response);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userName = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let storedLoginCreds = JSON.parse(
      localStorage.getItem("loginCreds") || "[]"
    );
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const currLoginCreds = {
      userName: userName,
      email: email,
      password: password,
      isUserLoggedIn: true,
    };
    // if user has logged in the for the first time from a particular client(eg: a new browser on a particular device)
    if (!storedLoginCreds.length) {
      console.log(currLoginCreds);
      storedLoginCreds.push(currLoginCreds);
      localStorage.setItem("loginCreds", JSON.stringify(storedLoginCreds));
      //   fetch a new set of tasks from JSON-placeholder API and then localStorage.setItem("tasks", apiResponse);
      fetchTasks(currLoginCreds, storedTasks);
    } else {
      const checkIfExistingUser = storedLoginCreds.filter(
        (user) =>
          user.email === currLoginCreds.email &&
          user.password === currLoginCreds.password
      );
      //   a new user has logged in from the same client(ie the same browser on the same device) for the first time
      if (!checkIfExistingUser.length) {
        console.log("new user-same client");
        storedLoginCreds.push(currLoginCreds);
        localStorage.setItem("loginCreds", JSON.stringify(storedLoginCreds));
        //   fetch a new set of tasks from JSON-placeholder API and then localStorage.setItem("tasks", apiResponse);
        fetchTasks(currLoginCreds, storedTasks);
      } else {
        // existing user has logged in from the same client(ie the same browser on the same device)
        console.log("existing user-same client");
        if (!storedTasks.length) {
          //   fetch a new set of tasks from JSON-placeholder API and then localStorage.setItem("tasks", apiResponse);
          fetchTasks(currLoginCreds, storedTasks);
        } else {
          const currUserStoredTasks = storedTasks.filter(
            (task) => task.user.email === currLoginCreds.email
          );
          // no tasks exist for currently logged in user _> fetch some!
          if (!currUserStoredTasks.length) {
            //   fetch a new set of tasks from JSON-placeholder API and then localStorage.setItem("tasks", apiResponse);
            fetchTasks(currLoginCreds, storedTasks);
          } else {
            // render the stored tasks for the user, ie render the list: currUserStoredTasks
            updateTaskList(currUserStoredTasks[0].tasks);
          }
        }
        pushUserCredToEndOfList(currLoginCreds.email, true);
      }
    }
    setUserEmail(currLoginCreds.email);
    setUserLogin();
  };
  return (
    <>
      {!isUserLoggedIn && (
        <Container
          fluid
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#8AAAE5",
          }}
        >
          <Header />
          <Container style={{ width: windowSize.width > 768 ? "50%" : "100%" }}>
            <Form
              style={{
                borderRadius: "30px",
                padding: "15px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                backgroundColor: "white",
              }}
            >
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your fullname"
                  ref={nameRef}
                  onChange={(e) => (nameRef.current.value = e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  ref={emailRef}
                  onChange={(e) => (emailRef.current.value = e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  onChange={(e) => (passwordRef.current.value = e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={(event) => handleSubmit(event)}
              >
                Submit
              </Button>
            </Form>
          </Container>
        </Container>
      )}
    </>
  );
}

export default Login;
