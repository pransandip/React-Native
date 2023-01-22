import React, { useState, useContext, useEffect } from "react";
import { Pressable, Text, View, ActivityIndicator, Alert } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

import { CredentialsContext } from "../contexts/CredentialsContext";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ScrollableContainer } from "../components/containers/ScrollableContainer";
import { ProfileImage } from "../components/images/ProfileImage";
import { TitleText } from "../components/texts/TitleText";
import { FullWidthButton } from "../components/buttons/FullWidthButton";
import { ButtonText } from "../components/texts/ButtonText";

import { colors } from "../components/colors/colors";

const { white, secondary, primary } = colors;

const MenuScreen = ({ navigation }) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        await signOut(auth);
        setIsLoading(false);
        setStoredCredentials(null);
        await AsyncStorage.removeItem("spotsyCredentials");
        Alert.alert("Logged Out", "You have been logged out");
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      console.log("error signing out", error);
      setIsLoading(false);
    }
  };

  return (
    <ScrollableContainer>
      {storedCredentials && (
        <>
          <ProfileImage
            height={80}
            width={80}
            source={require("../assets/images/woman.png")}
          />
          <TitleText mt={20} fs={40}>
            Tish
          </TitleText>
          <TitleText mt={40} fs={25}>
            Manage Spots
          </TitleText>
          <View>
            <Pressable
              onPress={() => navigation.navigate("New Spotsy Listing")}
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
              <Ionicons
                name="ios-car-outline"
                size={30}
                style={{ marginRight: 20 }}
              />
              <Text style={{ fontSize: 18 }}>New Spotsy Listing</Text>
              <Entypo
                name="chevron-small-right"
                size={30}
                style={{ justifyContent: "flex-end", marginLeft: "auto" }}
              />
            </Pressable>
            <Pressable
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
              <Ionicons
                name="list-outline"
                size={30}
                style={{ marginRight: 20 }}
              />
              <Text style={{ fontSize: 18 }}>My Spots</Text>
              <Entypo
                name="chevron-small-right"
                size={30}
                style={{ justifyContent: "flex-end", marginLeft: "auto" }}
              />
            </Pressable>
          </View>
          <TitleText mt={40} fs={25}>
            Account Settings
          </TitleText>
          <View>
            <Pressable
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
              <Ionicons
                name="person-circle-outline"
                size={30}
                style={{ marginRight: 20 }}
              />
              <Text style={{ fontSize: 18 }}>Personal Information</Text>
              <Entypo
                name="chevron-small-right"
                size={30}
                style={{ justifyContent: "flex-end", marginLeft: "auto" }}
              />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Payment Methods")}
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
              <Ionicons
                name="card-outline"
                size={30}
                style={{ marginRight: 20 }}
              />
              <Text style={{ fontSize: 18 }}>Payments</Text>
              <Entypo
                name="chevron-small-right"
                size={30}
                style={{ justifyContent: "flex-end", marginLeft: "auto" }}
              />
            </Pressable>
          </View>
        </>
      )}
      <TitleText mt={40} fs={25}>
        Support
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
          <Ionicons
            name="help-circle-outline"
            size={30}
            style={{ marginRight: 20 }}
          />
          <Text style={{ fontSize: 18 }}>How Spotsy Works</Text>
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
          <Ionicons
            name="md-document-text-outline"
            size={30}
            style={{ marginRight: 20 }}
          />
          <Text style={{ fontSize: 18 }}>Terms of Service</Text>
          <Entypo
            name="chevron-small-right"
            size={30}
            style={{ justifyContent: "flex-end", marginLeft: "auto" }}
          />
        </Pressable>
      </View>
      {storedCredentials && (
        <View style={{ alignItems: "center" }}>
          {isLoading && (
            <FullWidthButton
              backgroundColor={secondary}
              borderColor={secondary}>
              <ActivityIndicator size="large" color={white} />
            </FullWidthButton>
          )}
          {!isLoading && (
            <FullWidthButton
              backgroundColor={secondary}
              borderColor={secondary}
              onPress={handleSignOut}>
              <ButtonText>Logout</ButtonText>
            </FullWidthButton>
          )}
        </View>
      )}
      {storedCredentials === null && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <FullWidthButton
            backgroundColor={primary}
            borderColor={primary}
            onPress={() => navigation.navigate("Signup")}>
            <ButtonText>Register</ButtonText>
          </FullWidthButton>
        </View>
      )}
      <View style={{ height: 50 }}></View>
    </ScrollableContainer>
  );
};

export default MenuScreen;
