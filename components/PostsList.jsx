// import React from "react";
// import {
//   View,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   Image,
//   FlatList,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { useSelector } from "react-redux";
// import { doc, updateDoc } from "firebase/firestore";

// import { db } from "../firebase/config";

// const PostsList = ({ posts, navigation }) => {
//   const { userId } = useSelector((state) => state.auth);
//   const setLike = async (postId, likeUserIdsArray) => {
//     const userExist = likeUserIdsArray.find((user) => user === userId);

//     if (!userExist) {
//       const docRef = doc(db, "posts", postId);
//       await updateDoc(docRef, {
//         likes: [...likeUserIdsArray, userId],
//       });
//     }
//   };

//   return (
//     <FlatList
//       data={posts}
//       keyExtractor={(item, indx) => indx.toString()}
//       renderItem={({ item }) => (
//         <View style={styles.listItem}>
//           {/* Фото */}
//           <Image source={{ uri: item.photo }} style={styles.image} />

//           {/* Описание */}
//           <Text style={styles.description}>{item.comment}</Text>

//           <View style={styles.buttonsContainer}>
//             {/* Кнопка Комментарии */}
//             <View style={styles.btnCont}>
//               <TouchableOpacity
//                 style={styles.commentsAndLikesBtn}
//                 onPress={() => {
//                   navigation.navigate("Comments", {
//                     postId: item.id,
//                     postImage: item.photo,
//                     postComments: item.comment,
//                   });
//                 }}
//               >
//                 <Feather
//                   name="message-circle"
//                   size={22}
//                   style={{
//                     marginRight: 6,
//                     color: item.comment < 1 ? "#bdbdbd" : "#FF6C00",
//                   }}
//                 />
//                 <Text style={styles.numberComments}>{item.comment.length}</Text>
//               </TouchableOpacity>

//               {/* Кнопка Лайки */}
//               <TouchableOpacity
//                 style={styles.commentsAndLikesBtn}
//                 onPress={() => setLike(item.id, item.likes)}
//               >
//                 <Feather
//                   name="thumbs-up"
//                   size={22}
//                   style={{
//                     marginRight: 6,
//                     color: "#bdbdbd",
//                   }}
//                 />
//                 <Text style={styles.numberComments}>0</Text>
//               </TouchableOpacity>
//             </View>
//             {/* Кнопка Геолокация */}
//             <TouchableOpacity
//               style={styles.locationBtn}
//               onPress={() => {
//                 navigation.navigate("Map", { location: item.location });
//               }}
//             >
//               <Feather
//                 name="map-pin"
//                 size={22}
//                 color={"#BDBDBD"}
//                 style={{ marginRight: 4 }}
//               />
//               <Text style={styles.locationLink}>{item.locality}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     />
//   );
// };

// // const styles = StyleSheet.create({
// //   listItem: {
// //     width: 325,

// //     marginHorizontal: 10,
// //     marginBottom: 32,
// //   },
// //   image: {
// //     borderRadius: 8,

// //     // width: '100%',
// //     height: 240,

// //     marginBottom: 8,
// //   },
// //   description: {
// //     alignSelf: "flex-start",
// //   },

// //   buttonsContainer: {
// //     flex: 1,
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //   },

// //   commentsAndLikesBtn: {
// //     marginRight: 10,
// //     maxWidth: "20%",

// //     flexDirection: "row",
// //   },
// //   numberComments: {
// //     fontSize: 16,
// //     lineHeight: 19,

// //     color: "#BDBDBD",
// //   },

// //   locationBtn: {
// //     maxWidth: "80%",

// //     flexDirection: "row",
// //   },
// //   locationLink: {
// //     fontSize: 16,
// //     lineHeight: 19,
// //     textDecorationLine: "underline",

// //     color: "#212121",
// //   },
// // });

// const styles = StyleSheet.create({
//   listItem: {
//     width: 335,

//     // marginHorizontal: 10,
//     marginBottom: 32,
//   },
//   image: {
//     // marginLeft: 16,
//     borderRadius: 8,

//     // width: '100%',
//     height: 240,

//     marginBottom: 8,
//   },
//   description: {
//     marginLeft: 17,
//     fontSize: 16,
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

// export default PostsList;

import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

import { firestore } from "../firebase/config";
const PostsList = ({ posts, navigation }) => {
  const { userId } = useSelector((state) => state.auth);
  const [likes2, setLikes] = useState([]);

  // const setLike = async (postId, likes2) => {
  //   const userExist = likes2.find((user) => user === userId);

  //   if (!userExist) {
  //     const postsRef = doc(firestore, "posts", postId);
  //     await updateDoc(postsRef, {
  //       likes: [...likes2, userId],
  //     });
  //   }
  //   setLikes(likes2);
  // };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, indx) => indx.toString()}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          {/* Фото */}
          <Image source={{ uri: item.photo }} style={styles.image} />

          {/* Описание */}
          <Text style={styles.description}>{item.postName}</Text>

          <View style={styles.buttonsContainer}>
            {/* Кнопка Комментарии */}
            <View style={styles.btnCont}>
              <TouchableOpacity
                style={styles.commentsAndLikesBtn}
                onPress={() => {
                  navigation.navigate("Comments", {
                    postId: item.id,
                    postImage: item.photo,
                    postComments: item.comments,
                  });
                }}
              >
                <Feather
                  name="message-circle"
                  size={22}
                  style={{
                    marginRight: 6,
                    color: item.comments < 1 ? "#BDBDBD" : "#FF6C00",
                  }}
                />
                <Text
                  style={{
                    ...styles.numberComments,
                    color: item.comments < 1 ? "#BDBDBD" : "#FF6C00",
                  }}
                >
                  {item.comments.length}
                </Text>
              </TouchableOpacity>

              {/* Кнопка Лайки */}
              <TouchableOpacity
                style={styles.commentsAndLikesBtn}
                // onPress={() => setLike(item.id, item.likes)}
              >
                <Feather
                  name="thumbs-up"
                  size={22}
                  style={{
                    marginRight: 6,
                    color: "#bdbdbd",
                  }}
                />
                <Text style={styles.numberComments}>0</Text>
              </TouchableOpacity>
            </View>
            {/* Кнопка Геолокация */}
            <TouchableOpacity
              style={styles.locationBtn}
              onPress={() => {
                navigation.navigate("Map", {
                  location: item.coords,
                  locality: item.postLocation,
                });
              }}
            >
              <Feather
                name="map-pin"
                size={22}
                color={"#BDBDBD"}
                style={{ marginRight: 4 }}
              />
              <Text style={styles.locationLink}>{item.postLocation}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

// const styles = StyleSheet.create({
//   listItem: {
//     width: 325,

//     marginHorizontal: 10,
//     marginBottom: 32,
//   },
//   image: {
//     borderRadius: 8,

//     // width: '100%',
//     height: 240,

//     marginBottom: 8,
//   },
//   description: {
//     alignSelf: "flex-start",
//   },

//   buttonsContainer: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   commentsAndLikesBtn: {
//     marginRight: 10,
//     maxWidth: "20%",

//     flexDirection: "row",
//   },
//   numberComments: {
//     fontSize: 16,
//     lineHeight: 19,

//     color: "#BDBDBD",
//   },

//   locationBtn: {
//     maxWidth: "80%",

//     flexDirection: "row",
//   },
//   locationLink: {
//     fontSize: 16,
//     lineHeight: 19,
//     textDecorationLine: "underline",

//     color: "#212121",
//   },
// });

const styles = StyleSheet.create({
  listItem: {
    width: 335,

    // marginHorizontal: 10,
    marginBottom: 32,
  },
  image: {
    // marginLeft: 16,
    borderRadius: 8,

    // width: '100%',
    height: 240,

    marginBottom: 8,
  },
  description: {
    marginLeft: 17,
    fontSize: 16,
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

export default PostsList;
