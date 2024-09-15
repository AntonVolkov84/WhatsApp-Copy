import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";

const TextLoading = styled.Text`
  color: #fff;
  font-style: italic;
  font-weight: bold;
`;

export default function Loader() {
  return (
    <View>
      <TextLoading>Loading...</TextLoading>
    </View>
  );
}
