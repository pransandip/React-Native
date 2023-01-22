import React from "react";
import { TouchableOpacity, Text, View, Pressable } from "react-native";
import {
  Ionicons,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { ScrollableContainer } from "../components/containers/ScrollableContainer";
import { ProfileImage } from "../components/images/ProfileImage";
import { TitleText } from "../components/texts/TitleText";

import { colors } from "../components/colors/colors";

const { white } = colors;

const PaymentScreen = ({ navigation }) => {
  return (
    <ScrollableContainer>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back-outline"
          size={30}
          style={{ marginTop: 20 }}
        />
      </TouchableOpacity>
      <TitleText mt={20} fs={35}>
        Edit your payment methods
      </TitleText>
      <View>
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#f5f5f5" : white,
            },
            {
              flexDirection: "row",
              height: 60,
              borderBottomWidth: 0.2,
              marginTop: 25,
              alignItems: "center",
              paddingBottom: 10,
              paddingTop: 10,
              width: "100%",
            },
          ]}>
          <Entypo name="paypal" size={30} style={{ marginRight: 20 }} />
          <Text style={{ fontSize: 18 }}>PayPal</Text>
          <Entypo
            name="chevron-small-right"
            size={30}
            style={{ justifyContent: "flex-end", marginLeft: "auto" }}
          />
        </Pressable>
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#f5f5f5" : white,
            },
            {
              flexDirection: "row",
              height: 60,
              borderBottomWidth: 0.2,
              marginTop: 25,
              alignItems: "center",
              paddingBottom: 10,
              paddingTop: 10,
              width: "100%",
            },
          ]}>
          <FontAwesome5
            name="google-pay"
            size={30}
            style={{ marginRight: 20 }}
          />
          <Text style={{ fontSize: 18 }}>Google Pay</Text>
          <Entypo
            name="chevron-small-right"
            size={30}
            style={{ justifyContent: "flex-end", marginLeft: "auto" }}
          />
        </Pressable>
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#f5f5f5" : white,
            },
            {
              flexDirection: "row",
              height: 60,
              borderBottomWidth: 0.2,
              marginTop: 25,
              alignItems: "center",
              paddingBottom: 10,
              paddingTop: 10,
              width: "100%",
            },
          ]}>
          <MaterialCommunityIcons
            name="bank"
            size={30}
            style={{ marginRight: 20 }}
          />
          <Text style={{ fontSize: 18 }}>Add bank account</Text>
          <Entypo
            name="chevron-small-right"
            size={30}
            style={{ justifyContent: "flex-end", marginLeft: "auto" }}
          />
        </Pressable>
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#f5f5f5" : white,
            },
            {
              flexDirection: "row",
              height: 60,
              borderBottomWidth: 0.2,
              marginTop: 25,
              alignItems: "center",
              paddingBottom: 10,
              paddingTop: 10,
              width: "100%",
            },
          ]}>
          <Entypo name="credit-card" size={30} style={{ marginRight: 20 }} />
          <Text style={{ fontSize: 18 }}>Add credit/debit card</Text>
          <Entypo
            name="chevron-small-right"
            size={30}
            style={{ justifyContent: "flex-end", marginLeft: "auto" }}
          />
        </Pressable>
      </View>
    </ScrollableContainer>
  );
};

export default PaymentScreen;
