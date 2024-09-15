import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, TouchableOpacity, TouchableHighlight, TextInput, Alert, Text, View } from "react-native";
import Conversations from "../components/Conversations";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Stories from "../components/Stories";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { AuthContext } from "../App";

const Container = styled.View`
  margin-top: 20px;
  padding: 10px;
  padding-top: 30px;
  background-color: #1e2121;
  height: 100%;
  position: relative;
`;

export default function HomeScreen({ navigation }) {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        Alert.alert("Permision not granted");
        navigation.navigate("login");
      }
    });
    return unSub;
  }, []);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Вы вышли из учетной записи");
        navigation.navigate("login");
      })
      .then(() => setIsLoggedIn(false))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container>
        <LinearGradient
          colors={["#1E2322", "#1F433A", "#1E2322", "#1F433A"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={{ height: "100%", width: "100%", borderRadius: 18 }}
        >
          <Header />
          <Stories navigation={navigation} />
          <Conversations navigation={navigation} />
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="white"
            translucent={true}
            networkActivityIndicatorVisible={true}
          />
        </LinearGradient>
      </Container>
      <Footer handleSignOut={handleSignOut} />
    </>
  );
}
