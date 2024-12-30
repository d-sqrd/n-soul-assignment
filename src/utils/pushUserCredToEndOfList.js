// This utility function is used to push the currently logged-in user's login creds to the end of the "loginCreds" localStorage key on pressing the "Logout" button or to push the login creds of the existing user who is logging in at any point of time to the end of the "loginCreds" localStorage key while pressing the "Submit" button on the inital login page.

const pushUserCredToEndOfList = (emailKey, isUserLoggingIn) => {
  const storedLoginCreds = JSON.parse(
    localStorage.getItem("loginCreds") || "[]"
  );
  if (storedLoginCreds && storedLoginCreds.length) {
    let updatedStoredLoginCreds = storedLoginCreds.map((loginCred) => {
      if (loginCred.email === emailKey) {
        if (isUserLoggingIn) {
          loginCred.isUserLoggedIn = true; // set isUserLoggedIn key to true when user logs in so that after logging in if user clicks on refresh button on the browser they do not have to login again _> basically this acts as the login token
        } else {
          loginCred.isUserLoggedIn = false; // set isUserLoggedIn key to false when user logs out
        }
      }
      return loginCred;
    });

    // callback function to get the index of the currently logged in user's creds inside updatedStoredLoginCreds list
    const filterByEmail = (loginCred) => loginCred.email === emailKey;

    let currLoggedInUserCredIndex =
      updatedStoredLoginCreds.findIndex(filterByEmail);

    // remove the currently logged in user's creds from the updatedStoredLoginCreds list
    updatedStoredLoginCreds.splice(currLoggedInUserCredIndex, 1);

    // push the currently logged in user's creds to the last index of updatedStoredLoginCreds list _> when a logged in user hits refresh button on the browser then we simply check the last index of "loginCreds" localStorage key as he/she was the last one to login
    updatedStoredLoginCreds.push(
      storedLoginCreds.filter((loginCred) => loginCred.email === emailKey)[0]
    );
    localStorage.setItem("loginCreds", JSON.stringify(updatedStoredLoginCreds));
  }
};

export default pushUserCredToEndOfList;
