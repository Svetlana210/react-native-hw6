import React, { useState, useEffect, useCallback } from "react";
import { useTogglePasswordVisibility } from "../../hooks/togglePasswordVisibility";
import { authSignUpUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { AvatarContainer } from "../../components/Avatar";
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
  LogBox,
} from "react-native";
import { auth } from "../../firebase/config";

function RegistrationScreen({ navigation }) {
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [state, setstate] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
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

  const displayNameHandler = (text) => setDisplayName(text.trim());
  const passwordHandler = (text) => setPassword(text.trim());
  const emailHandler = (text) => setEmail(text.trim());

  const handleSubmit = () => {
    if (email && password) {
      setIsShowKeyboard(false);
      dispatch(authSignUpUser({ displayName, password, email }));
      Keyboard.dismiss();
      setEmail("");
      setPassword("");
      setDisplayName("");
    } else {
      Alert.alert("Введите данные");
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/bg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                width: dimensions,
                paddingBottom: isShowKeyboard ? 2 : 55,
              }}
            >
              <View style={styles.imageContainer}>
                <AvatarContainer />
              </View>

              <View>
                <Text
                  style={{
                    ...styles.text,
                    marginTop: isShowKeyboard ? 68 : 82,
                    marginBottom: isShowKeyboard ? 10 : 30,
                  }}
                >
                  Регистрация
                </Text>
              </View>
              <View>
                <TextInput
                  style={{
                    ...styles.input,

                    borderColor: isFocusedLogin ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusedLogin ? "#FFFFFF" : "#F6F6F6",
                  }}
                  placeholder="Логин"
                  value={displayName}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsFocusedLogin(true);
                  }}
                  onBlur={() => {
                    setIsShowKeyboard(false);
                    setIsFocusedLogin(false);
                  }}
                  onChangeText={displayNameHandler}
                />
                <TextInput
                  style={{
                    ...styles.input,

                    borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusedEmail ? "#FFFFFF" : "#F6F6F6",
                  }}
                  placeholder="Адрес электронной почты"
                  value={email}
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
                  onChangeText={emailHandler}
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
                    value={password}
                    secureTextEntry={passwordVisibility}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocusedPassword(true);
                    }}
                    onBlur={() => {
                      setIsShowKeyboard(false);
                      setIsFocusedPassword(false);
                    }}
                    onChangeText={passwordHandler}
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
                style={{
                  ...styles.btn,
                  display: isShowKeyboard ? "none" : "block",
                }}
                activeOpacity={0.7}
                onPress={handleSubmit}
              >
                <Text style={styles.btnText}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    ...styles.smallText,
                    display: isShowKeyboard ? "none" : "block",
                  }}
                >
                  Уже есть аккаунт? Войти
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
    // paddingHorizontal: 16,
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
    marginTop: 15,
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
  },
  imageContainer: {
    position: "absolute",
    zIndex: 1,
    left: 125,
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#ff45ff",
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
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

export default RegistrationScreen;
