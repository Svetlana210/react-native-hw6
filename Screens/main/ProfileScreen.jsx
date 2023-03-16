// import React, { useState, useEffect } from "react";
// import {
//   View,
//   ImageBackground,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   Image,
// } from "react-native";
// import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
// import PostsList from "../../components/PostsList";
// import db from "../../firebase/config";
// import { useDispatch, useSelector } from "react-redux";
// import { authSignOutUser } from "../../redux/auth/authOperations";

// const BG = "../../assets/photo.png";

// const ProfileScreen = ({ navigation }) => {
//   const [userPosts, setUserPosts] = useState([]);
//   const dispatch = useDispatch();

//   const { userId, login } = useSelector((state) => state.auth);

//   useEffect(() => {
//     getUserPosts();
//   }, []);

//   const getUserPosts = async () => {
//     await db
//       .firestore()
//       .collection("posts")
//       .where("userId", "==", userId)
//       .onSnapshot((data) =>
//         setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
//       );
//   };

//   const signOut = () => {
//     dispatch(authSignOutUser());
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={require(BG)} style={styles.bgImage}>
//         <View style={styles.profile}>
//           <View style={styles.avatar}>
//             <View style={styles.avatarContainer}>
//               <Image
//                 style={styles.avatarImg}
//                 source={require("../../assets/profile.png")}
//               />

//               {/* Кнопка Добавить/Удалить аватар */}
//               <TouchableOpacity style={styles.avatarButton} activeOpacity={0.8}>
//                 <Image source={require("../../assets/remove.png")} />
//                 {/* <Ionicons
//                   name="add-circle-outline"
//                   size={25}
//                   color={"#FF6C00"}
//                   style={styles.avatarRemoveIcon}
//                 /> */}
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Кнопка Логаут */}
//           <TouchableOpacity
//             style={styles.logoutButton}
//             activeOpacity={0.8}
//             onPress={signOut}
//           >
//             <MaterialIcons name="logout" size={24} color={"#BDBDBD"} />
//           </TouchableOpacity>

//           {/* Профиль имя */}
//           <Text style={styles.profileTitle}>{login}</Text>
//           <PostsList posts={userPosts} navigation={navigation} />
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: "flex-end",
//     // alignItems: "center",
//   },
//   bgImage: {
//     flex: 1,
//     resizeMode: "cover",
//     // justifyContent: "flex-end",
//     // alignItems: "center",
//     // alignContent: "center",
//   },
//   profile: {
//     flex: 1,
//     alignItems: "center",
//     // выставляем карточки по центру в столбце

//     backgroundColor: "#FFFFFF",
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,

//     marginTop: 133,
//     paddingTop: 82,
//     paddingHorizontal: 16,

//     position: "relative",
//   },
//   avatar: {
//     position: "absolute",
//     top: -60,
//     // left: 128,
//   },
//   logoutButton: {
//     position: "absolute",
//     top: 22,
//     right: 16,
//   },
//   profileTitle: {
//     fontFamily: "Roboto-Medium",
//     fontSize: 30,
//     lineHeight: 35,
//     textAlign: "center",
//     letterSpacing: 0.01,
//     color: "#212121",

//     marginBottom: 32,
//   },
//   avatarContainer: {
//     paddingHorizontal: 12.5,
//   },
//   avatarImg: {
//     borderRadius: 16,
//     backgroundColor: "#F6F6F6",

//     width: 120,
//     height: 120,
//   },
//   avatarButton: {
//     width: 25,
//     height: 25,

//     position: "absolute",
//     bottom: 14,
//     right: 5,
//   },
//   avatarRemoveIcon: {
//     // borderRadius: 150,
//     // backgroundColor: "#FFFFFF",
//     color: "#BDBDBD",
//   },
//   listItem: {
//     width: 375,

//     // marginHorizontal: 10,
//     marginBottom: 32,
//   },
//   image: {
//     marginLeft: 16,
//     borderRadius: 8,

//     // width: '100%',
//     height: 240,

//     marginBottom: 8,
//   },
//   description: {
//     marginLeft: 17,
//     fontSize: 1,
//     fontFamily: "Roboto-Medium",
//     // alignSelf: "flex-start",
//   },

//   buttonsContainer: {
//     marginTop: 5,
//     marginHorizontal: 16,
//     // flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   btnCont: {
//     flexDirection: "row",
//   },
//   commentsAndLikesBtn: {
//     marginRight: 27,
//     alignItems: "flex-end",
//     // maxWidth: "20%",

//     flexDirection: "row",
//   },
//   numberComments: {
//     fontSize: 16,
//     lineHeight: 19,

//     color: "#BDBDBD",
//   },

//   locationBtn: {
//     maxWidth: "80%",
//     alignItems: "flex-end",
//     flexDirection: "row",
//   },
//   locationLink: {
//     fontSize: 16,
//     lineHeight: 19,
//     textDecorationLine: "underline",

//     color: "#212121",
//   },
// });

// export default ProfileScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import PostsList from "../../components/PostsList";

import { useSelector, useDispatch } from "react-redux";

import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperations";

const BG = "../../assets/photo.png";

const ProfileScreen = ({ navigation }) => {
  const [posts2, setPosts2] = useState([]);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  const { displayName, userId, userAvatar } = useSelector(
    (state) => state.auth
  );

  const getAllPosts = async () => {
    const firestoreRef = collection(firestore, "posts");
    onSnapshot(firestoreRef, (querySnapshot) => {
      const postsFromDB = [];
      querySnapshot.forEach((doc) =>
        postsFromDB.push({ ...doc.data(), id: doc.id })
      );

      const userPostsFromDB = postsFromDB.filter(
        (post) => post.userId == userId
      );
      setPosts2(userPostsFromDB);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground source={require(BG)} style={styles.bgImage}>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <View style={styles.avatarContainer}>
              <Image style={styles.avatarImg} source={{ uri: userAvatar }} />

              {/* Кнопка Добавить/Удалить аватар */}
              <TouchableOpacity style={styles.avatarButton} activeOpacity={0.8}>
                <Image source={require("../../assets/remove.png")} />
                {/* <Ionicons
                  name="add-circle-outline"
                  size={25}
                  color={"#FF6C00"}
                  style={styles.avatarRemoveIcon}
                /> */}
              </TouchableOpacity>
            </View>
          </View>

          {/* Кнопка Логаут */}
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            onPress={signOut}
          >
            <MaterialIcons name="logout" size={24} color={"#BDBDBD"} />
          </TouchableOpacity>

          {/* Профиль имя */}
          <Text style={styles.profileTitle}>{displayName}</Text>
          <PostsList posts={posts2} navigation={navigation} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "flex-end",
    // alignItems: "center",
    // alignContent: "center",
  },
  profile: {
    flex: 1,
    alignItems: "center",
    // выставляем карточки по центру в столбце

    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    marginTop: 133,
    paddingTop: 82,
    paddingHorizontal: 16,

    position: "relative",
  },
  avatar: {
    position: "absolute",
    top: -60,
    // left: 128,
  },
  logoutButton: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  profileTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",

    marginBottom: 32,
  },
  avatarContainer: {
    paddingHorizontal: 12.5,
  },
  avatarImg: {
    borderRadius: 16,
    backgroundColor: "#F6F6F6",

    width: 120,
    height: 120,
  },
  avatarButton: {
    width: 25,
    height: 25,

    position: "absolute",
    bottom: 14,
    right: 5,
  },
  avatarRemoveIcon: {
    // borderRadius: 150,
    // backgroundColor: "#FFFFFF",
    color: "#BDBDBD",
  },
  listItem: {
    width: 375,

    // marginHorizontal: 10,
    marginBottom: 32,
  },
  image: {
    marginLeft: 16,
    borderRadius: 8,

    // width: '100%',
    height: 240,

    marginBottom: 8,
  },
  description: {
    marginLeft: 17,
    fontSize: 1,
    fontFamily: "Roboto-Medium",
    // alignSelf: "flex-start",
  },

  buttonsContainer: {
    marginTop: 5,
    marginHorizontal: 16,
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnCont: {
    flexDirection: "row",
  },
  commentsAndLikesBtn: {
    marginRight: 27,
    alignItems: "flex-end",
    // maxWidth: "20%",

    flexDirection: "row",
  },
  numberComments: {
    fontSize: 16,
    lineHeight: 19,

    color: "#BDBDBD",
  },

  locationBtn: {
    maxWidth: "80%",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  locationLink: {
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",

    color: "#212121",
  },
});

export default ProfileScreen;
