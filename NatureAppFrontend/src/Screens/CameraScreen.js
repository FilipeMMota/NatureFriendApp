import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { Input } from "react-native-elements";
import { Camera } from "expo-camera";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { NavigationEvents } from "react-navigation";
import * as MediaLibrary from "expo-media-library";

const CameraScreen = function ({ navigation }) {
  const camRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [hasPermission, setHaspermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHaspermission(status === "granted");
    })();

    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHaspermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text> No acess to Camera</Text>;
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
    }
  }

  async function savePicture() {
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
      .then(() => {
        alert("Picture Saved!");
      })
      .catch((error) => {
        console.log("err,error");
      });
  }

  return (
    <View>
      <NavigationEvents
        onWillFocus={() => setIsFocused(navigation.isFocused())}
        onWillBlur={() => setIsFocused(navigation.isFocused())}
      />
      {isFocused && (
        <Camera
          flashMode={flash}
          type={type}
          style={styles.camera}
          ref={camRef}
        >
          <View
            style={{
              flex: 1,
              position: "relative",
              backgroundColor: "transparent",
            }}
          >
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              <TouchableOpacity
                style={styles.flipCamera}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <MaterialIcons
                  name="flip-camera-ios"
                  size={40}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.flipCamera}
                onPress={() => {
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  );
                }}
              >
                <Feather
                  name={
                    flash === Camera.Constants.FlashMode.on ? "zap" : "zap-off"
                  }
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={takePicture}
              >
                <FontAwesome name="camera" size={25} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      )}

      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={open}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <View style={{ margin: 10, flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.closeModal}
                onPress={() => setOpen(false)}
              >
                <FontAwesome name="window-close" size={50} color="#19456b" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeModal} onPress={savePicture}>
                <FontAwesome name="upload" size={50} color="#121212" />
              </TouchableOpacity>
            </View>

            <Image style={styles.Image} source={{ uri: capturedPhoto }} />

            <View style={styles.inputForm}>
              <Input
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
              />
              <Input
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={{ fontWeight: "bold", color: "#FFF" }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: hp("100%"),
    width: wp("130%"),
  },
  cameraButton: {
    backgroundColor: "#19456b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("9%"),
    marginRight: wp("72%"),
    marginLeft: wp("43%"),
    height: 50,
    borderRadius: 100,
  },
  flipCamera: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    padding: 35,
    marginRight: wp("25%"),
  },
  closeModal: {
    margin: 10,
  },
  Image: {
    width: wp("80%"),
    height: hp("40%"),
    borderRadius: 20,
  },
  inputForm: {
    marginTop: hp("5%"),
    width: wp("80%"),
  },
  submitButton: {
    backgroundColor: "#70af85",
    justifyContent: "center",
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 30,
  },
});

export default CameraScreen;
