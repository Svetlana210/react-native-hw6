import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import db from "../../firebase/config";
import { useSelector } from "react-redux";

const CommentsScreen = ({ route }) => {
  const { postId, postImage, postComments } = route.params;
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState(postComments);
  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(postComments)
      .add({ comment, login });
  };

  const getAllPosts = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(postComments)
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  const onFocusCommentInput = () => {
    setShowKeyboard(true);
  };
  const onBlurCommentInput = () => {
    setShowKeyboard(false);
  };
  const hideKeyboard = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View style={styles.inner}>
          {/* Пост фото */}
          <Image style={styles.postImage} source={{ uri: postImage }} />
          {/* Список комментариев */}
          <FlatList
            style={styles.list}
            data={allComments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 24,
                  flexDirection: "row",
                }}
              >
                {/* Аватарка комментария */}
                <Image
                  style={{
                    borderRadius: 50,
                    width: 28,
                    height: 28,
                    marginRight: 16,
                    marginLeft: 16,
                  }}
                  source={require("../../assets/ava.png")}
                />
                {/* Текст комментария */}
                <View
                  style={{
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 6,
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 6,
                    backgroundColor: "#00000008",
                    padding: 16,
                  }}
                >
                  <Text>{item.login}</Text>
                  <Text>{item.comment}</Text>
                </View>
              </View>
            )}
          />
          {/* Форма ввода комментария */}
          <View
            style={{
              ...styles.form,
              marginBottom: showKeyboard ? 65 : 0,
            }}
          >
            {/* Comment */}
            <TextInput
              placeholder="Комментировать..."
              placeholderTextColor="#BDBDBD"
              onFocus={onFocusCommentInput}
              onBlur={onBlurCommentInput}
              style={styles.input}
              onChangeText={setComment}
            />

            {/* Кнопка Отправить комментарий */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={createPost}
            >
              <AntDesign name="arrowup" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
  },
  postImage: {
    flex: 1,
    borderRadius: 8,
    // width: 343,
    height: 240,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  list: {
    flex: 1,

    marginHorizontal: 16,
  },
  form: {
    justifyContent: "center",
    height: 80,
    marginHorizontal: 16,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 100,
    borderWidth: 1,
    paddingHorizontal: 16,
    minHeight: 50,
  },
  button: {
    position: "absolute",
    right: 8,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CommentsScreen;
