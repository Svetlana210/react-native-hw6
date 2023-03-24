import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Button,
} from "react-native";
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { firestore, storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";

import * as Location from "expo-location";

const CreatePostsScreen = ({ navigation }) => {
  // const [state, setState] = useState(initialState);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [postName, setPostName] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [coords, setCoords] = useState("");
  const [region, setRegion] = useState("");
  const [startCamera, setStartCamera] = useState(true);

  const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
  const [hasPermissionLocation, setHasPermissionLocation] = useState(null);

  const { userId, displayName, userAvatar } = useSelector(
    (state) => state.auth
  );

  const nameInputHandler = (text) => {
    setPostName(text);
  };

  const placeInputHandler = (text) => {
    setPostLocation(text);
  };

  const hideKeyboard = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  };
  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          alert("Sorry, we need these permissions to make this work!");
        }
      }
      let cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasPermissionCamera(cameraPermission.status === "granted");

      let locationPermission =
        await Location.requestForegroundPermissionsAsync();
      setHasPermissionLocation(locationPermission.status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (camera) {
      const options = {
        // quality: 1,
        // base64: true,
        exif: true,
        skipProcessing: true,
      };
      const photo = await camera.takePictureAsync(options);
      const photoLocation = await Location.getCurrentPositionAsync({});
      let coords = {
        latitude: photoLocation.coords.latitude,
        longitude: photoLocation.coords.longitude,
      };
      let address = await Location.reverseGeocodeAsync(coords);
      let city = address[0].city;
      setPhoto(photo.uri);
      setCoords(coords);
      setRegion(city);
      setStartCamera(false);
    }
  };

  const takePhotoGallery = async () => {
    setStartCamera(false);

    let imageFromGallery = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!imageFromGallery.canceled) {
      setPhoto(imageFromGallery.assets[0].uri);
    }
  };

  const uploadPhotoToServer = async () => {
    const postId = Date.now().toString();

    const path = `images/${postId}.jpeg`;
    const storageRef = ref(storage, path);

    const response = await fetch(photo);
    const file = await response.blob();

    await uploadBytes(storageRef, file).then(() => {
      console.log("Uploaded a blob or file!");
    });

    const processedPhoto = await getDownloadURL(storageRef)
      .then((downloadURL) => {
        return downloadURL;
      })
      .catch((error) => {
        console.log(error.message);
      });

    return processedPhoto;
  };
  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const newPost = {
      photo,
      postName,
      postLocation,
      userId,
      displayName,
      coords,
      region,
      comments: [],
      likes: [],
    };

    try {
      await addDoc(collection(firestore, "posts"), newPost);
      console.log("Post is loaded. Well Done");
    } catch (error) {
      console.error("Error while adding doc: ", error.message);
    }
  };

  const publishPhoto = () => {
    // uploadPhotoToServer();
    uploadPostToServer();
    navigation.navigate("Posts");
    setPostName("");
    setPostLocation("");
    setPhoto(null);
  };
  const deletePost = () => {
    setPostName("");
    setPostLocation("");
    setPhoto(null);

    setStartCamera(true);
  };

  const isSubmitButtonDisabled = () => {
    return !photo || postName === "" || postLocation === "" ? true : false;
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View
          style={{ ...styles.inner, marginBottom: showKeyboard ? -200 : 0 }}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.pictureContainer}>
              <Camera style={styles.camera} ref={setCamera}>
                {photo && (
                  <View style={styles.cont}>
                    <Image
                      source={{ uri: photo }}
                      style={{ height: 100, width: 100 }}
                    />
                  </View>
                )}

                <TouchableOpacity
                  onPress={takePhoto}
                  style={styles.snapBtn}
                  activeOpacity={0.8}
                >
                  <MaterialIcons
                    name="camera-alt"
                    size={24}
                    style={styles.snapIcon}
                  />
                </TouchableOpacity>
              </Camera>
            </View>
            {/* Блок под превью/камерой */}
            <TouchableOpacity onPress={takePhotoGallery} activeOpacity={0.8}>
              <Text style={styles.uploadEditButton}>
                Загрузить фото из галереи
              </Text>
            </TouchableOpacity>

            <TextInput
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
              style={styles.inputDescription}
              value={postName}
              onChangeText={nameInputHandler}
              // onFocus={() => setShowKeyboard(true)}
              // onBlur={() => setShowKeyboard(false)}
            />

            <View>
              <Feather
                name="map-pin"
                size={24}
                color={"#BDBDBD"}
                style={styles.iconLocality}
              />
              <TextInput
                placeholder="Местность..."
                placeholderTextColor="#BDBDBD"
                style={styles.inputLocality}
                value={postLocation}
                onChangeText={placeInputHandler}
                // onFocus={() => setShowKeyboard(true)}
                // onBlur={() => setShowKeyboard(false)}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                isSubmitButtonDisabled()
                  ? styles.invalidButton
                  : styles.validButton,
              ]}
              activeOpacity={0.8}
              onPress={publishPhoto}
            >
              <Text
                style={[
                  styles.submitBtnText,
                  isSubmitButtonDisabled()
                    ? styles.invalidBtn
                    : styles.validBtn,
                ]}
              >
                Опубликовать
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.deleteBtnContainer}
            activeOpacity={0.8}
            onPress={deletePost}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  cont: {
    position: "absolute",
    top: 0,
    left: 0,
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  isloading: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
  },

  pictureContainer: {
    flex: 1,

    maxHeight: 210,
    width: 343,
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e8e8e8",
    overflow: "hidden",

    marginTop: 32,
    marginHorizontal: 16,
    marginLeft: "auto",
    marginRight: "auto",

    justifyContent: "center",
    alignItems: "center",
  },

  camera: {
    height: 240,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    flex: 1,
  },

  flipBtn: {
    position: "absolute",
    top: 5,
    right: 10,
    borderRadius: 10,
    backgroundColor: "lightgrey",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ratioBtn: {
    position: "absolute",
    bottom: 5,
    left: 10,
    borderRadius: 10,
    backgroundColor: "lightgrey",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  sizeIndicator: {
    position: "absolute",
    bottom: 5,
    right: 10,
    borderRadius: 10,
    backgroundColor: "lightgrey",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  snapBtn: {
    position: "absolute",
    top: 75,
    left: 140,
    backgroundColor: "#ffffff",
    borderRadius: 50,

    width: 60,
    height: 60,

    justifyContent: "center",
    alignItems: "center",
  },
  snapIcon: {
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowRadius: 4,
    // shadowOpacity: 0.25,
    color: "#bdbdbd",
    width: 24,
    height: 24,
  },

  preview: {
    flex: 1,
    maxHeight: 240,
    width: 320,
  },
  uploadEditButton: {
    fontSize: 16,
    lineHeight: 19,
    color: "#bdbdbd",

    marginTop: 8,
    marginBottom: 32,
    marginHorizontal: 16,
  },
  inputDescription: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    borderColor: "#e8e8e8",
    borderBottomWidth: 1,

    height: 50,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  iconLocality: {
    position: "absolute",
    top: 13,
    left: 16,
  },

  inputLocality: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    borderColor: "#e8e8e8",
    borderBottomWidth: 1,

    paddingStart: 28,

    height: 50,
    marginBottom: 32,
    marginHorizontal: 16,
  },

  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 40,
    height: 50,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#F6F6F6",
  },
  validButton: {
    backgroundColor: "#FF6C00",
    color: "#FFFFFF",
  },
  invalidButton: {
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
  },
  submitBtnText: {
    fontSize: 16,
  },
  deleteWrapp: {
    height: 40,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
  deleteBtnContainer: {
    borderRadius: 20,
    backgroundColor: "#F6F6F6",

    width: 70,
    height: 40,
    marginBottom: 25,

    alignSelf: "center",

    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtnIcon: {
    width: 24,
    height: 24,
  },
});
export default CreatePostsScreen;
