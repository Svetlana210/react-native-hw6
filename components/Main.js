import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { moduleName } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase/config";
import { authStateChangeUser } from "../redux/auth/authOperations";

const Main = () => {
  const [user, setUser] = useState(null);
  const { stateChange } = useSelector((state) => state.auth);

  const routing = useRoute(stateChange);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
