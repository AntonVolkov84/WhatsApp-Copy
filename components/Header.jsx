import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  TextInput,
  Alert,
  Text,
  View,
} from "react-native";
import React from "react";
import styled from "styled-components";
import Feather from "@expo/vector-icons/Feather";

const IconWhatsApp = styled.Image`
  width: 40px;
  height: 40px;
  margin: 10px;
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

const DivSearch = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
`;

function Header({ navigation }) {
  return (
    <DivHeader>
      <IconWhatsApp
        source={require("../assets/free-icon-whatsapp-134937.png")}
        onPress={() => navigation.navigate("login")}
      ></IconWhatsApp>
      <DivText>WhatsVolkov</DivText>
      <DivSearch>
        <Feather name="search" size={24} color="white" />
      </DivSearch>
    </DivHeader>
  );
}

export default Header;
