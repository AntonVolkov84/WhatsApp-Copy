// Установлен display none на Container
import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  Text,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import styled from "styled-components";
import { collection, doc, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../App";

const ContainerStories = styled.SafeAreaView`
  height: 200px;
  padding-left: 10px;
  width: 400px;
  flex-direction: row;
  /* display: none; */
`;
const ContainerAdd = styled.TouchableOpacity`
  flex-direction: column;
  margin: 10px;
  align-items: center;
  justify-content: flex-start;
  width: 60px;
  height: 60px;
  margin-top: 5px;
`;
const BoxStories = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  border: solid 0.5px #969696;
  border-radius: 10px;
`;
const BoxStoriesPlus = styled.View`
  border: dashed 1px #506762;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;
const AllInContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 5px;
  margin-bottom: 20px;
`;
const ContainerAddNew = styled.TouchableOpacity`
  flex-direction: column;
  margin: 10px;
  align-items: center;
  justify-content: flex-start;
  width: 60px;
  height: 60px;
  margin-top: 5px;
`;

const BoxStoriesAddNew = styled.Image`
  border: dashed 1px #506762;
  border-radius: 50px;
  width: 53px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;
const TextStoriesAdd = styled.Text`
  color: #edeeee;
  text-justify: center;
`;
const BoxStoriesAdd = styled.View`
  border: dashed 1px #506762;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

function Stories({ navigation }) {
  const { db, auth } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  const getData = async () => {
    onSnapshot(query(collection(db, "users"), orderBy("timestamp", "asc")), (snapshot) => {
      setUserData(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ContainerStories>
        <BoxStories>
          <BoxStoriesPlus>
            <Entypo name="plus" size={24} color="#EDEEEE" />
          </BoxStoriesPlus>
          <View>
            <Text style={{ textAlign: "center", fontSize: 13, marginTop: 5, color: "#EDEEEE" }}>Create Your Story</Text>
          </View>
        </BoxStories>
      </ContainerStories>
      <AllInContainer>
        <ScrollView horizontal={true}>
          <ContainerAdd>
            <BoxStoriesAdd>
              <Entypo name="plus" size={24} color="#EDEEEE" />
            </BoxStoriesAdd>
            <TextStoriesAdd>Add</TextStoriesAdd>
          </ContainerAdd>
          {userData.map((item, index) =>
            item.userId === auth.currentUser.uid ? null : (
              <ContainerAddNew key={index} onPress={() => navigation.navigate("conversation", { userId: item.userId })}>
                <BoxStoriesAddNew src={item.avatar}></BoxStoriesAddNew>
                <TextStoriesAdd>{item.userFullName}</TextStoriesAdd>
              </ContainerAddNew>
            )
          )}
        </ScrollView>
      </AllInContainer>
    </>
  );
}

export default Stories;
