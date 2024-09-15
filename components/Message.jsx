import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../App";
import styled from "styled-components";

const BlockView = styled.View`
  border-radius: 12px;
  margin-top: 5px;
  flex-direction: row;
  padding: 5px;
  align-items: center;
  min-width: 100px;
  max-width: 75%;
  flex-wrap: wrap;
`;

export default function Message({ message }) {
  const { auth } = useContext(AuthContext);
  const userUid = auth.currentUser.uid;
  const isValide = userUid === message.userFrom;
  console.log(message);
  return (
    <BlockView
      style={{
        backgroundColor: isValide ? "#1BCC2D" : "#e9eba4",
        alignSelf: isValide ? "flex-end" : "flex-start",
      }}
    >
      <Image
        source={isValide ? { uri: auth.currentUser.photoURL } : { uri: message.userFromAvatar }}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
      <Text
        style={{
          color: isValide ? "#F9F9F9" : "black",
          fontSize: 18,
          marginLeft: 5,
        }}
      >
        {message.text}
      </Text>
    </BlockView>
  );
}
