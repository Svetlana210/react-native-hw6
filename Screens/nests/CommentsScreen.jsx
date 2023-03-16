// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   Platform,
//   Keyboard,
//   Image,
//   FlatList,
// } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
// import db from "../../firebase/config";
// import { useSelector } from "react-redux";

// const CommentsScreen = ({ route }) => {
//   const { postId, postImage, postComments } = route.params;
//   const [showKeyboard, setShowKeyboard] = useState(false);
//   const [comment, setComment] = useState("");
//   const [allComments, setAllComments] = useState(postComments);
//   const { login } = useSelector((state) => state.auth);

//   useEffect(() => {
//     getAllPosts();
//   }, []);

//   const createPost = async () => {
//     db.firestore()
//       .collection("posts")
//       .doc(postId)
//       .collection("comments")
//       .doc(postComments)
//       .add({ comment, login });
//   };

//   const getAllPosts = async () => {
//     db.firestore()
//       .collection("posts")
//       .doc(postId)
//       .collection("comments")
//       .doc(postComments)
//       .onSnapshot((data) =>
//         setAllComments(data.docs.map((doc) => ({ ...doc.data() })))
//       );
//   };

//   const onFocusCommentInput = () => {
//     setShowKeyboard(true);
//   };
//   const onBlurCommentInput = () => {
//     setShowKeyboard(false);
//   };
//   const hideKeyboard = () => {
//     setShowKeyboard(false);
//     Keyboard.dismiss();
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS == "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <TouchableWithoutFeedback onPress={hideKeyboard}>
//         <View style={styles.inner}>
//           {/* Пост фото */}
//           <Image style={styles.postImage} source={{ uri: postImage }} />
//           {/* Список комментариев */}
// <FlatList
//   style={styles.list}
//   data={allComments}
//   keyExtractor={(item, index) => index.toString()}
//   renderItem={({ item }) => (
//     <View
//       style={{
//         marginBottom: 24,
//         flexDirection: "row",
//       }}
//     >
//       {/* Аватарка комментария */}
//       <Image
//         style={{
//           borderRadius: 50,
//           width: 28,
//           height: 28,
//           marginRight: 16,
//           marginLeft: 16,
//         }}
//         source={require("../../assets/ava.png")}
//       />
//       {/* Текст комментария */}
//       <View
//         style={{
//           borderTopLeftRadius: 0,
//           borderTopRightRadius: 6,
//           borderBottomLeftRadius: 6,
//           borderBottomRightRadius: 6,
//           backgroundColor: "#00000008",
//           padding: 16,
//         }}
//       >
//         <Text>{item.login}</Text>
//         <Text>{item.comment}</Text>
//       </View>
//     </View>
//   )}
// />
//           {/* Форма ввода комментария */}
//           <View
//             style={{
//               ...styles.form,
//               marginBottom: showKeyboard ? 65 : 0,
//             }}
//           >
//             {/* Comment */}
//             <TextInput
//               placeholder="Комментировать..."
//               placeholderTextColor="#BDBDBD"
//               onFocus={onFocusCommentInput}
//               onBlur={onBlurCommentInput}
//               style={styles.input}
//               onChangeText={setComment}
//             />

//             {/* Кнопка Отправить комментарий */}
//             <TouchableOpacity
//               style={styles.button}
//               activeOpacity={0.7}
//               onPress={createPost}
//             >
//               <AntDesign name="arrowup" size={20} color="#ffffff" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   inner: {
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   postImage: {
//     flex: 1,
//     borderRadius: 8,
//     // width: 343,
//     height: 240,
//     marginHorizontal: 16,
//     marginVertical: 32,
//   },
//   list: {
//     flex: 1,

//     marginHorizontal: 16,
//   },
//   form: {
//     justifyContent: "center",
//     height: 80,
//     marginHorizontal: 16,
//     marginTop: 16,
//   },
//   input: {
//     backgroundColor: "#F6F6F6",
//     borderColor: "#E8E8E8",
//     borderRadius: 100,
//     borderWidth: 1,
//     paddingHorizontal: 16,
//     minHeight: 50,
//   },
//   button: {
//     position: "absolute",
//     right: 8,
//     borderRadius: 50,
//     backgroundColor: "#FF6C00",
//     width: 34,
//     height: 34,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
// export default CommentsScreen;

import React, { useState, useEffect } from "react";
import {
  ScrollView,
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
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { useSelector } from "react-redux";

const CommentsScreen = ({ route }) => {
  const { postId, postImage } = route.params;

  const [showKeyboard, setShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllcomments] = useState([]);
  const { displayName, userEmail, userAvatar } = useSelector(
    (state) => state.auth
  );

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

  const sendCommentToServer = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    try {
      const postsRef = doc(firestore, `posts`, postId);

      await addDoc(collection(postsRef, "comments"), {
        comment,
        displayName,
        date,
        time,
      });
      await updateDoc(postsRef, {
        comments: [
          ...allComments,
          {
            comment,
            displayName,
          },
        ],
      });
      //---------------------------------------------------------------------
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

  const createComment = () => {
    sendCommentToServer();
    hideKeyboard();
    setComment("");
  };

  const getAllComents = async () => {
    try {
      const firestoreRef = doc(firestore, "posts", postId);
      onSnapshot(collection(firestoreRef, "comments"), (docSnap) =>
        setAllcomments(docSnap.docs.map((doc) => ({ ...doc.data() })))
      );
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getAllComents();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.comment}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              borderRadius: 50,
              width: 28,
              height: 28,
              marginRight: 6,
              marginBottom: 5,
            }}
            source={{ uri: userAvatar }}
          />
          <Text style={styles.name}> {displayName}</Text>
        </View>
        <Text
          style={{
            fontSize: 18,
          }}
        >
          {item.comment}
        </Text>
        <Text style={styles.date}>
          {item.date} - {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <ScrollView style={styles.container}>
        <TouchableWithoutFeedback onPress={hideKeyboard}>
          <View>
            <Image
              source={{ uri: postImage }}
              style={{ height: 240, borderRadius: 8 }}
            />
            <View>
              <FlatList
                data={allComments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View
        style={{
          ...styles.form,
          marginBottom: showKeyboard ? 195 : 10,
        }}
      >
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Comment..."
          onFocus={onFocusCommentInput}
          onBlur={onBlurCommentInput}
          style={styles.submitBtn}
        />
        <TouchableOpacity onPress={createComment}>
          <Ionicons
            name="arrow-up-circle"
            size={34}
            color="#FF6C00"
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 22,
  },
  comment: {
    minWidth: 320,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.03)",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  form: {
    minWidth: 320,
    justifyContent: "center",

    marginHorizontal: 16,
  },
  date: {
    fontSize: 12,
    textAlign: "right",
    color: "grey",
  },
  submitBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    padding: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "rgba(189, 189, 189, 1)",
    backgroundColor: "#FFFFFF",
  },
  sendIcon: {
    position: "absolute",

    right: 15,
    bottom: 8,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    height: 50,
    fontSize: 16,
  },
});
