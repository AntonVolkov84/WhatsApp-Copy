import { View, Text, Image } from "react-native";
import React, { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../App";
import { collection, doc, addDoc, setDoc, serverTimestamp } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View`
  margin-top: 20px;
  padding: 10px;
  padding-top: 20px;
  background-color: #1e2121;
  height: 100%;
  position: relative;
  margin: 0;
`;

const TextEnter = styled.Text`
  color: lightblue;
  text-align: center;
  margin-top: 30px;
`;

const InputAuth = styled.TextInput`
  margin-top: 20px;
  width: 100%;
  height: 50px;
  border: solid 0.5px white;
  border-radius: 10px;
  border-color: lightblue;
  padding-left: 10px;
  color: lightblue;
  font-weight: 300;
`;
const InputAuthAvatar = styled.TouchableOpacity`
  margin-top: 20px;
  width: 100%;
  height: 50px;
  border: solid 0.5px white;
  border-radius: 10px;
  border-color: lightblue;
  padding-left: 10px;
  color: lightblue;
  font-weight: 300;
  justify-content: center;
`;
const InputAuthAvatarText = styled.Text`
  color: lightblue;
`;
const InputButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: lightblue;
  height: 50px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;
const ImageOfAvatar = styled.Image`
  width: 150px;
  height: 150px;
  margin-top: 20px;
  justify-self: center;
  align-self: center;
  border-radius: 75px;
  /* background-color: red; */
`;

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const { db, app, auth } = useContext(AuthContext);
  const [photoURL, setPhotoURL] = useState(null);
  const storage = getStorage(app);

  const openAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const storageRef = ref(storage, `avatar/${result.assets[0].fileName}`);

    try {
      const response = await fetch(result.assets[0].uri);
      if (!response) {
        console.log("Failed to fetch file");
      }
      const mediaBlob = await response.blob();
      const uploadToStorage = uploadBytesResumable(storageRef, mediaBlob);

      uploadToStorage.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadToStorage.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setPhotoURL(downloadURL);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addToUsers = async (userId) => {
    try {
      const docRef = doc(db, "users", email);
      const user = {
        timestamp: serverTimestamp(),
        userFullName: fullName,
        avatar: photoURL,
        email: email,
        userId: userId,
      };
      await setDoc(docRef, user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = (auth, email, password) => {
    createUserWithEmailAndPassword(auth, email, password, photoURL)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;

        if (user.uid) {
          const auth = getAuth();
          updateProfile(auth.currentUser, { photoURL: photoURL });
          addToUsers(userId);
          navigation.navigate("home");
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <LinearGradient
        colors={["#1E2322", "#1F433A", "#1E2322", "#1F433A"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={{ height: "100%", width: "100%", borderRadius: 18, padding: 10 }}
      >
        <TextEnter>Регистрация</TextEnter>
        <InputAuth
          value={email}
          keyboardAppearance={"light"}
          autoFocus={true}
          placeholderTextColor={"lightblue"}
          placeholder="Введите вашу почту"
          onChangeText={setEmail}
        ></InputAuth>
        <InputAuth
          value={password}
          keyboardAppearance={"light"}
          placeholderTextColor={"lightblue"}
          placeholder="Введите ваш пароль"
          onChangeText={setPassword}
        ></InputAuth>
        <InputAuth
          value={fullName}
          keyboardAppearance={"light"}
          placeholderTextColor={"lightblue"}
          placeholder="Введите ваш ник"
          onChangeText={setFullName}
        ></InputAuth>
        {photoURL ? (
          <TouchableOpacity onPress={() => openAvatar()}>
            <ImageOfAvatar source={{ uri: photoURL }}></ImageOfAvatar>
          </TouchableOpacity>
        ) : (
          <InputAuthAvatar onPress={() => openAvatar()}>
            <InputAuthAvatarText>Выберите аватарку</InputAuthAvatarText>
          </InputAuthAvatar>
        )}
        <InputButton
          onPress={() => {
            handleRegister(auth, email, password);
          }}
        >
          <Text>Зарегистрироваться</Text>
        </InputButton>
      </LinearGradient>
    </Container>
  );
}
