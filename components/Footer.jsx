import { StyleSheet, Button, TouchableOpacity, TextInput, Alert, Text, View } from "react-native";
import React from "react";
import styled from "styled-components";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, signOut } from "firebase/auth";

const ContainerFooter = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  border-radius: 18px;
  border: solid;
  border-width: 1px;
  background-color: #1a1a1a;
  border-color: #373737;
  position: absolute;
  bottom: -1px;
  align-items: center;
  justify-content: space-around;
`;
const ContainerForPlus = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: #33a7a3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Footer({ navigation }) {
  const auth = getAuth();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Вы вышли из учетной записи");
        navigation.navigate("login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ContainerFooter>
      <FontAwesome name="home" size={20} color="#32C45B" />
      <Feather name="phone" size={20} color="#969696" />
      <ContainerForPlus>
        <LinearGradient
          colors={["#559DF4", "#0CB442"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={{ height: 60, width: 60, alignItems: "center", justifyContent: "center", borderRadius: 50 }}
        >
          <Entypo name="plus" size={26} color="white" />
        </LinearGradient>
      </ContainerForPlus>
      <MaterialIcons name="add-a-photo" size={20} color="#969696" />
      <TouchableOpacity onPress={() => handleSignOut()}>
        <Entypo name="remove-user" size={20} color="#969696" />
      </TouchableOpacity>
    </ContainerFooter>
  );
}

export default Footer;
