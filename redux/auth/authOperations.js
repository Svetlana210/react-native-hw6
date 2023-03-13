import db from "../../firebase/config";
import { authSlice } from "../auth/authReducer";

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;
      await user.updateProfile({ displayName: login, email: email });
      const { uid, displayName, userEmail } = await db.auth().currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
          email: email,
        })
      );
      console.log("user", user);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode == "auth/weak-password") {
        alert("The password is too weak");
      }
      if (errorCode == "auth/email-already-in-use") {
        alert("Already exists an account with the given email address");
      }
      if (errorCode == "auth/invalid-email") {
        alert("Email address is not valid");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert(
          "Password is invalid for the given email, or the account corresponding to the email does not have a password set"
        );
      }
      if (errorCode === "auth/user-not-found") {
        alert("No user corresponding to the given email");
      }
      if (errorCode === "auth/user-disabled") {
        alert("User corresponding to the given email has been disabled");
      }
      if (errorCode === "auth/invalid-email") {
        alert("Email address is not valid");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOut());
};
export const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        email: user.email,
      };
      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
