import { StyleSheet, Button, TouchableOpacity, TextInput, Alert, Text, View } from "react-native";
import React from "react";
import ConversationItem from "./ConversationItem";

const dataConversation = [
  {
    image: require("../assets/01.jpg"),
    name: "Armen",
    text: "Hello1",
    time: "09:11",
    userId: "gSgCFsLehggOHDeS52R5jqnUFlh2",
  },
  {
    image: require("../assets/02.jpg"),
    name: "Roman",
    text: "Hello2",
    time: "09:11",
    userId: "2",
  },
  {
    image: require("../assets/03.jpg"),
    name: "Grisha",
    text: "Hello3",
    time: "09:11",
    userId: "8",
  },
  {
    image: require("../assets/01.jpg"),
    name: "Tanya",
    text: "Hello4",
    time: "09:11",
    userId: "14",
  },
  {
    image: require("../assets/02.jpg"),
    name: "Andrey",
    text: "Hello5",
    time: "09:11",
    userId: "EznpPDREUEgUjwg5PmRnEIIRTzR2",
  },
  {
    image: require("../assets/03.jpg"),
    name: "Sveta",
    time: "09:11",
    text: "Hello45",
    userId: "6",
  },
];

function Conversations({ navigation }) {
  return (
    <>
      <View
        style={{
          height: "100%",
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          backgroundColor: "#1C1C1C",
          width: "100%",
        }}
      >
        {dataConversation.map((el, index) => (
          <ConversationItem key={index} navigation={navigation} conversation={el} />
        ))}
      </View>
    </>
  );
}

export default Conversations;
