import React from "react";
import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

const GoBackBtn = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      navigation={navigation}
      style={{ width: 24, marginLeft: 16 }}
      // onPress={() => navigation.navigate('Posts')}
      onPress={() => navigation.goBack()}
    >
      <Feather name="arrow-left" size={22} color={"#212121cc"} />
    </TouchableOpacity>
  );
};
export default GoBackBtn;
