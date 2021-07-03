import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
} from "react-native";
import { Accuracy, requestForegroundPermissionsAsync } from "expo-location";
import * as Location from "expo-location";
import { Input } from "react-native-elements";
import { Camera } from "expo-camera";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { NavigationEvents } from "react-navigation";
import * as MediaLibrary from "expo-media-library";
import { Context as PostsContext } from "../Context/PostsContext";

const CameraScreen = function ({ navigation }) {
  const camRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [hasPermission, setHaspermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  const { createPost } = useContext(PostsContext);

  const getPermissions = async () => {
    try {
      const { granted: isGranted } = await requestForegroundPermissionsAsync(); // Tenta dar destructure mas dar um nome diferente à variavel
      if (!isGranted) {
        AlertForLocation();
      } else {
        const { status: cameraStatus } = await Camera.requestPermissionsAsync();
        setHaspermission(cameraStatus === "granted");
        if (cameraStatus != "granted") {
          AlertForCameraAndGalery();
        } else {
          const { status: libraryStatus } =
            await MediaLibrary.requestPermissionsAsync();
          setHaspermission(libraryStatus === "granted");
          if (libraryStatus != "granted") {
            AlertForCameraAndGalery();
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const AlertForLocation = () =>
    Alert.alert(
      "Permissão da localização recusada!",
      "Esta aplicação necessita da sua permissão para aceder à sua localização para poder funcionar. Por favor ative estas funcionalidades.",
      [{ text: "Ok", onPress: () => getPermissions() }],
      { cancelable: false }
    );

  const AlertForCameraAndGalery = () =>
    Alert.alert(
      "Permissão da camera recusada!",
      "Esta aplicação necessita da sua permissão para aceder à sua camera e à sua galeria para poder funcionar. Por favor ative estas funcionalidades.",
      [{ text: "Ok", onPress: () => getPermissions() }],
      { cancelable: false }
    );

  const AlertForCoordinatesNull = () =>
    Alert.alert(
      "Localização falhou",
      "A Nature Friend App não conseguiu ler as suas coordenas!\nPor favor verifique que está com a localização ativada!",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "Sim" },
      ],
      { cancelable: false }
    );

  useEffect(() => {
    getPermissions();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text> Sem acesso à câmera</Text>;
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
      const location = await Location.getCurrentPositionAsync({
        accuracy: Accuracy.BestForNavigation,
      });
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
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
                style={styles.flash}
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
                  size={35}
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
            <TouchableOpacity
              style={styles.exitPostSubmit}
              onPress={() => {
                setOpen(false);
                setTitle("");
                setDescription("");
              }}
            >
              <AntDesign name="arrowleft" size={40} color="#19456b" />
            </TouchableOpacity>

            <Image style={styles.Image} source={{ uri: capturedPhoto }} />

            <TouchableOpacity
              style={styles.savePostSubmit}
              onPress={savePicture}
            >
              <FontAwesome name="save" size={40} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.inputForm}>
              <Input
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
              />
              <Input
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                if (latitude === null || longitude === null) {
                  AlertForCoordinatesNull();
                } else {
                  createPost({
                    capturedPhoto,
                    title,
                    description,
                    latitude,
                    longitude,
                  });
                  setOpen(false);
                }
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#FFF" }}>
                Submeter
              </Text>
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
    paddingRight: 35,
    paddingTop: 30,
    marginRight: wp("25%"),
  },
  flash: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginRight: wp("35%"),
    marginTop: 15,
  },
  Image: {
    width: wp("80%"),
    height: hp("40%"),
    borderRadius: 10,
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
  exitPostSubmit: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  savePostSubmit: {
    position: "absolute",
    top: 305,
    right: 25,
  },
});

export default CameraScreen;
