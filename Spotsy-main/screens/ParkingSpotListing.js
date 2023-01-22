import React, { useContext, useState, useEffect } from "react";
import {
  FlatList,
  ImageBackground,
  View,
  Pressable,
  Text,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { useStripe } from "@stripe/stripe-react-native";
import { CredentialsContext } from "../contexts/CredentialsContext";
import { Constants } from "expo-constants";
import { BackArrow } from "../components/buttons/BackArrow";
import { TitleText } from "../components/texts/TitleText";

import { ScreenWidth, ScreenHeight } from "../components/dimensions/dimensions";
import { Platform } from "react-native";
import { CityText } from "../components/texts/CityText";
import { Line } from "../components/styles/Line";
import { DescriptionText } from "../components/texts/DescriptionText";

import { ProfileImage } from "../components/images/ProfileImage";

import { colors } from "../components/colors/colors";
import { PriceText } from "../components/texts/PriceText";

const { black, white, darkGray, secondary } = colors;

const ParkingSpotListing = ({ navigation, route }) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const { parkingSpot } = route.params;
  console.log(parkingSpot);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const amount = parseInt(parkingSpot[0].price * 100);
  const fetchPaymentSheetParams = async () => {
    const API_URL =
      "https://us-central1-dryvwaze.cloudfunctions.net/createStripePaymentSheet";
    // Platform.OS === "ios" ? "http://127.0.0.1:3000" : "http://10.0.2.2:3000";
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRIPE_SECRET_TEST_KEY}`,
        },
        body: JSON.stringify({
          email: storedCredentials?.email,
          amount,
        }),
      });

      const { paymentIntent, ephemeralKey, customer, publishableKey } =
        await response.json();
      console.log("paymentIntent", paymentIntent);
      console.log("ephemeralKey", ephemeralKey);
      console.log("customer", customer);
      return {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      };
    } catch (error) {
      console.log(error);
      return { error };
    }
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "Spotsy",
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    // see below
    const { error } = await presentPaymentSheet();
    if (error) {
      console.log(
        `Error code: ${error.code}`,
        `Error message: ${error.message}`
      );
      Alert.alert(error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  return (
    <>
      <FlatList
        style={{ marginTop: ScreenHeight * 0.03 }}
        data={parkingSpot}
        renderItem={({ item }) => (
          <>
            <BackArrow onPress={() => navigation.goBack()} />
            <ImageBackground
              source={item.image_url}
              style={{ height: 250, width: "100%" }}
            />
            <View
              style={{
                display: "flex",
                width: ScreenWidth * 0.9,
                marginLeft: ScreenWidth * 0.05,
                marginTop: ScreenHeight * 0.03,
                marginBottom: ScreenHeight * 0.11,
              }}>
              <TitleText>{item.title}</TitleText>
              <Ionicons name="star" size={16} style={{ marginTop: 20 }}>
                <CityText> {`${item.rating}`}</CityText>
              </Ionicons>
              <CityText fw={400}>{`${item.city}, California`}</CityText>
              <Line mt={30} mb={30} />
              <DescriptionText color={black} fs={20}>
                {item.description}
              </DescriptionText>
              <Line mt={30} mb={30} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <TitleText>{`Hosted by ${item.host}`}</TitleText>
                <Pressable
                  onPress={async () => {
                    let data = await fetch(
                      "https://us-central1-dryvwaze.cloudfunctions.net/helloWorld"
                    );
                    let response = await data.json();
                    console.log(response);
                  }}>
                  <ProfileImage source={item.profile_image_url} />
                </Pressable>
              </View>
              <Line mt={30} mb={30} />
              <DescriptionText color={black} fs={25}>
                Where you'll park
              </DescriptionText>
              <CityText mt={15} mb={15}>
                {`${item.city}, California, United States`}
              </CityText>
              <MapView
                style={{ height: 200, width: "100%", marginBottom: 50 }}
                initialRegion={item.coordinates}>
                <Marker
                  coordinate={item.coordinates}
                  title={`Exact location provided after booking`}
                />
              </MapView>
            </View>
          </>
        )}></FlatList>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: ScreenWidth,
          height: 80,
          backgroundColor: white,
          borderWidth: 0.5,
          borderColor: darkGray,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
        }}>
        <PriceText>{`$${parkingSpot[0].price} per hour`}</PriceText>
        {storedCredentials?.email !== undefined ? (
          <Pressable
            onPress={openPaymentSheet}
            style={{
              backgroundColor: secondary,
              height: 50,
              width: 120,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}>
            <Text style={{ color: white }}>Reserve</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{
              backgroundColor: secondary,
              height: 50,
              width: 150,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}>
            <Text style={{ color: white }}>Login to reserve</Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

export default ParkingSpotListing;
