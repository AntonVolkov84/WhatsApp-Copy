import { View, Text, Touchable, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../App";

const ViewBlock = styled.View`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export default function ConversationItem({ conversation, navigation }) {
  const { auth } = useContext(AuthContext);

  if (auth.currentUser.uid === conversation.userId) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={{ flexDirection: "row", padding: 10 }}
        onPress={() => navigation.navigate("conversation", { userId: conversation.userId })}
      >
        <Image source={conversation.image} style={{ width: 50, height: 50, borderRadius: 50 }} />
        <View style={{ flex: 1, marginLeft: 10, flexDirection: "column" }}>
          <ViewBlock>
            <Text style={{ color: "#F9F9F9" }}>{conversation.name}</Text>
            <Text style={{ color: "#BDBDBD", position: "absolute", right: 0 }}>{conversation.time}</Text>
          </ViewBlock>
          <View>
            <Text style={{ color: "#8D8D8D" }}>{conversation.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
