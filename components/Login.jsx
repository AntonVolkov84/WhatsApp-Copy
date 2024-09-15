import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Loader from "./Loader";

const Container = styled.View`
  margin-top: 20px;
  padding: 10px;
  padding-top: 20px;
  background-color: #1e2121;
  height: 100%;
  position: relative;
  margin: 0;
`;
const InputAuth = styled.TextInput`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border: solid 0.5px white;
  border-radius: 10px;
  border-color: lightblue;
  padding-left: 10px;
  color: lightblue;
  font-weight: 300;
`;
const InputButton = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: lightblue;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  height: 30px;
`;
const DivHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;
const DivText = styled.Text`
  width: 150px;
  text-align: center;
  margin-top: 10px;
  height: 40px;
  color: white;
  font-size: 20px;
`;
const IconWhatsApp = styled.Image`
  width: 40px;
  height: 40px;
  margin: 10px;
`;
const TextEnter = styled.Text`
  color: lightblue;
  text-align: center;
  margin-top: 30px;
`;
const TextEnterRegister = styled.Text`
  color: #3a66ff;
  text-align: center;
  margin-top: 30px;
`;
const GoogleContainer = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: lightblue;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  height: 30px;
`;
const GoogleContainerText = styled.Text``;

export default function Login({ navigation }) {
  const [email, setEmail] = useState("testphoto@gmail.com");
  const [password, setPassword] = useState("123123");
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  const handleAuth = (auth, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.uid) {
          navigation.navigate("home");
        }
      })
      .catch((error) => {
        Alert.alert(error.message);
      })
      .finally(setIsLoading(false));
  };
  return (
    <Container>
      <LinearGradient
        colors={["#1E2322", "#1F433A", "#1E2322", "#1F433A"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={{ height: "100%", width: "100%", borderRadius: 18, padding: 10 }}
      >
        <DivHeader>
          <IconWhatsApp
            source={require("../assets/free-icon-whatsapp-134937.png")}
            onPress={() => navigation.navigate("login")}
          ></IconWhatsApp>
          <DivText>WhatsVolkov</DivText>
        </DivHeader>
        <TextEnter>Войти в учетную запись</TextEnter>
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
        <InputButton
          onPress={() => {
            setIsLoading(true);
            handleAuth(auth, email, password);
          }}
        >
          <Text>Авторизоваться</Text>
        </InputButton>
        {isLoading ? <Loader /> : <></>}
        <TextEnterRegister onPress={() => navigation.navigate("register")}>Зарегистрироваться</TextEnterRegister>
      </LinearGradient>
      <StatusBar hidden={true} />
    </Container>
  );
}
