import { View, Text, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { collection, addDoc, setDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../App";
import Message from "../components/Message";
import { FlatList } from "react-native-gesture-handler";

const Container = styled.View`
  margin-top: 20px;
  padding: 10px;
  padding-top: 20px;
  background-color: #1e2121;
  height: 100%;
  position: relative;
`;
const BlockScrollView = styled.ScrollView``;

const BoxInput = styled.View`
  background-color: #1c1c1c;
  padding: 10px;
  width: 98%;
  height: 60px;
  position: absolute;
  bottom: 140px;
  left: 10px;
  border-radius: 10px;
  flex-direction: row;
  margin: 0 5px;
`;
const BoxInputText = styled.TextInput`
  background-color: #1c1c1c;
  padding: 10px;
  width: 100%;
  height: 100%;
  color: #f9f9f9;
`;

export default function ConversationScreen({ route }) {
  const { db, auth, q2 } = useContext(AuthContext);
  const [text, onChangeText] = useState("");
  const [messages, setMessages] = useState([]);
  const { userId } = route.params;
  const user = auth.currentUser.uid;

  useEffect(() => {
    onSnapshot(query(collection(db, "rooms", userId, "messages"), orderBy("timestamp", "asc")), (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  const handleSendMessage = async () => {
    try {
      await addDoc(collection(db, "rooms", userId, "messages"), {
        timestamp: serverTimestamp(),
        userFromAvatar: auth.currentUser.photoURL,
        userFrom: user,
        text: text,
        userTo: userId,
      });
      onChangeText("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Message from Screen", messages);
  return (
    <>
      <Container>
        <LinearGradient
          colors={["#1E2322", "#1F433A", "#1E2322", "#1F433A"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={{ height: "100%", width: "100%", borderRadius: 18, padding: 10 }}
        >
          <Header />
          <SafeAreaView>
            <FlatList
              style={{ height: "70%" }}
              data={messages}
              renderItem={({ item }) => <Message message={item} />}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </LinearGradient>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="white"
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <BoxInput>
          <BoxInputText
            placeholderTextColor={"lightblue"}
            placeholder="Создать сообщение"
            multiline
            onChangeText={(text) => onChangeText(text)}
            value={text}
          ></BoxInputText>
          <TouchableOpacity style={{ position: "absolute", top: "50%", right: 10 }} onPress={() => handleSendMessage()}>
            <FontAwesome name="send" size={24} color="#2A7562" />
          </TouchableOpacity>
        </BoxInput>
      </Container>
      <Footer />
    </>
  );
}
