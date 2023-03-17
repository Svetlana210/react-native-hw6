import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import PostsList from "../../components/PostsList";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { useSelector } from "react-redux";

const defaultAvatar = "../../assets/prof.png";
const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { displayName, userEmail, userAvatar } = useSelector(
    (state) => state.auth
  );

  const getAllPosts = async () => {
    const firestoreRef = collection(firestore, "posts");
    onSnapshot(firestoreRef, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        {/* Аватар */}
        <Image
          style={styles.avatar}
          source={userAvatar ? { uri: userAvatar } : require(defaultAvatar)}
        />

        <View style={styles.userInfo}>
          {/* Имя */}
          <Text style={styles.userInfoName}>{displayName}</Text>

          {/* Email */}
          <Text style={styles.userInfoEmail}>{userEmail}</Text>
        </View>
      </View>
      <PostsList posts={posts} navigation={navigation} />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',

    paddingHorizontal: 16,

    backgroundColor: "#ffffff",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 32,
    marginRight: "auto",
  },
  avatar: {
    borderRadius: 16,
    width: 60,
    height: 60,
    marginRight: 8,
  },
  userInfoName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,

    color: "#212121",
  },
  userInfoEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "#21212180",
  },
});
