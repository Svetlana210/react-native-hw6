import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "../auth/authReducer";

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password }, photoURL) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { login, photoURL });
      const { uid } = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          login,
          email,
          photoURL,
        })
      );
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
  async (dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const { uid, login, photoURL } = auth.currentUser;
      dispatch(updateUserProfile({ userId: uid, login, email, photoURL }));
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

export const authSignOutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error", error.message);
  }
};
export const authStateChangeUser = () => async (dispatch) => {
  await onAuthStateChanged(auth, (user) => {
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
