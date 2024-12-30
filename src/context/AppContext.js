import React, { useState, useContext, useEffect } from "react";
import pushUserCredToEndOfList from "../utils/pushUserCredToEndOfList";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const initilizeAppOnPageRefresh = () => {
      // This utility function is invoked whenever the page loads for the first time or page has been refreshed after user has logged-in and is used to initialize global app states like logged-in user's email, associated task-list, etc.
      // The function basically checks the last element in the "loginCreds" localStorage key since whenever an user logs-in/logs-out to the app, his/her login creds are pushed at the end of "loginCreds" localStorage key
      const storedLoginCreds = JSON.parse(
        localStorage.getItem("loginCreds") || "[]"
      );
      if (storedLoginCreds && storedLoginCreds.length) {
        const currLoginUserCreds =
          storedLoginCreds[storedLoginCreds.length - 1];
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        if (currLoginUserCreds.isUserLoggedIn) {
          setUserLogin();
          setUserEmail(currLoginUserCreds.email);
          const currUserStoredTasks = storedTasks.filter(
            (task) => task.user.email === currLoginUserCreds.email
          );
          if (currUserStoredTasks && currUserStoredTasks.length) {
            updateTaskList(currUserStoredTasks[0].tasks);
          }
        }
      }
    };

    initilizeAppOnPageRefresh();
  }, []);
  const setUserLogout = () => {
    pushUserCredToEndOfList(userEmail, false);
    setIsUserLoggedIn(false);
  };

  const setUserLogin = () => {
    setIsUserLoggedIn(true);
  };

  const updateTaskList = (newTasks) => {
    // update the "loginCreds" localStorage key whenever we are updating the "task list" state of the app
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks = storedTasks.map((task) => {
      if (task.user.email === userEmail) {
        task.tasks = newTasks;
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    setTaskList(newTasks);
  };

  const showNewTaskModal = () => {
    setIsNewTaskModalVisible(true);
  };

  const hideNewTaskModal = () => {
    setIsNewTaskModalVisible(false);
  };

  return (
    <AppContext.Provider
      value={{
        isUserLoggedIn,
        setUserLogout,
        setUserLogin,
        taskList,
        updateTaskList,
        userEmail,
        setUserEmail,
        isNewTaskModalVisible,
        showNewTaskModal,
        hideNewTaskModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
