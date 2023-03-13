import React, { useState, useEffect, useCallback } from "react";
import { useTogglePasswordVisibility } from "../../hooks/togglePasswordVisibility";

import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  const { passwordVisibility, rightWord, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const dispatch = useDispatch();
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 40 * 2;
      setDimensions(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => {
      dimensionsHandler?.remove();
    };
  }, []);

  const handleSubmit = () => {
    if (state.email && state.password) {
      setIsShowKeyboard(false);
      console.log("submit", state);
      dispatch(authSignInUser(state));

      Keyboard.dismiss();
      setstate(initialState);
    } else {
      Alert.alert("Введите данные");
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const image = "../../assets/photo.png";
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground style={styles.image} source={require(image)}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                width: dimensions,
                paddingBottom: isShowKeyboard ? 5 : 134,
              }}
            >
              <View>
                <Text
                  style={{
                    ...styles.text,
                  }}
                >
                  Войти
                </Text>
              </View>
              <View>
                <TextInput
                  style={{
                    ...styles.input,

                    borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusedEmail ? "#FFFFFF" : "#F6F6F6",
                  }}
                  placeholder="Адрес электронной почты"
                  value={state.email}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsFocusedEmail(true);
                  }}
                  onBlur={() => {
                    setIsShowKeyboard(false);
                    setIsFocusedEmail(false);
                  }}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <View style={styles.inputContainer}>
                  <TextInput
                    style={{
                      ...styles.input,

                      borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isFocusedPassword
                        ? "#FFFFFF"
                        : "#F6F6F6",
                    }}
                    placeholder="Пароль"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={state.password}
                    secureTextEntry={passwordVisibility}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocusedPassword(true);
                    }}
                    onBlur={() => {
                      setIsShowKeyboard(false);
                      setIsFocusedPassword(false);
                    }}
                    onChangeText={(value) =>
                      setstate((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <Pressable
                    onPress={handlePasswordVisibility}
                    style={styles.btnPass}
                  >
                    <Text style={styles.rightWord}>{rightWord}</Text>
                  </Pressable>
                </View>
              </View>
              <TouchableOpacity
                // style={styles.btn}
                style={{
                  ...styles.btn,
                  display: isShowKeyboard ? "none" : "block",
                }}
                activeOpacity={0.7}
                onPress={handleSubmit}
              >
                <Text style={styles.btnText}>Войти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text
                  style={{
                    ...styles.smallText,
                    display: isShowKeyboard ? "none" : "block",
                  }}
                >
                  Нет аккаунта? Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    resizeMode: "cover",
    justifyContent: "flex-end",
    flex: 1,
    alignItems: "center",
  },
  form: {
    paddingHorizontal: 16,
    position: "relative",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  text: {
    color: "212121",
    fontSize: 30,
    fontFamily: "Roboto-Bold",
    marginBottom: 32,
    marginTop: 32,
  },
  input: {
    width: 343,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    color: "#212121",
    fontSize: 16,
    marginBottom: 16,
    outLineColor: "#FF6C00",
    fontFamily: "Roboto-Regular",
  },
  btn: {
    width: 343,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  btnText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Roboto-Regular",
  },
  smallText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  imageContainer: {
    position: "absolute",
    left: 125,
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#ff45ff",
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  plus: {
    position: "absolute",
    bottom: 10,
    right: -12,
  },
  inputContainer: {
    position: "relative",
  },
  btnPass: {
    position: "absolute",
    right: 10,
    bottom: 34,
  },
  rightWord: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});

export default LoginScreen;
