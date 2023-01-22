import React, { useState, useContext } from "react";
import { FlatList, Alert, View } from "react-native";

import { CredentialsContext } from "../contexts/CredentialsContext";

import { ParkingSpotListImageWrapper } from "../components/containers/ParkingSpotListImageWrapper";
import { ParkingSpotListDetailsWrapper } from "../components/containers/ParkingSpotListDetailsWrapper";

import { ParkingSpotListImage } from "../components/images/ParkingSpotListImage";
import { ParkingSpotFavoriteIcon } from "../components/icons/ParkingSpotFavoriteIcon";

import { CityText } from "../components/texts/CityText";
import { DescriptionText } from "../components/texts/DescriptionText";
import { PriceText } from "../components/texts/PriceText";

import { ScreenHeight, ScreenWidth } from "../components/dimensions/dimensions";
import { FloatingMapButton } from "../components/buttons/FloatingMapButton";

import data from "../data/parkingSpots";

import { colors } from "../components/colors/colors";

const { white } = colors;

const ParkingSpotList = ({ navigation }) => {
  const [parkingSpots, setParkingSpots] = useState(data);
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  // console.log("storedCredentials", storedCredentials);

  const toggleFavorite = (listing_id) => {
    const newParkingSpots = parkingSpots.map((spot) => {
      if (spot.listing_id === listing_id) {
        return { ...spot, is_favorite: !spot.is_favorite };
      }
      return spot;
    });
    setParkingSpots(newParkingSpots);
  };

  return (
    <>
      <FloatingMapButton onPress={() => navigation.navigate("Search")} />
      <FlatList
        style={{
          width: ScreenWidth * 0.9,
          marginLeft: ScreenWidth * 0.05,
          marginBottom: ScreenHeight * 0.05,
        }}
        data={parkingSpots}
        renderItem={({ item }) => (
          <>
            <ParkingSpotListImageWrapper
              onRouteChange={() =>
                navigation.navigate("Parking Spot Listing", {
                  parkingSpot: parkingSpots.filter(
                    (spot) => spot.listing_id === item.listing_id
                  ),
                })
              }>
              <ParkingSpotListImage source={item.image_url} borderRadius={10}>
                <ParkingSpotFavoriteIcon
                  is_favorite={item.is_favorite}
                  onPress={() => toggleFavorite(item.listing_id)}
                />
              </ParkingSpotListImage>
            </ParkingSpotListImageWrapper>
            <ParkingSpotListDetailsWrapper>
              <CityText>{`${item.city}, California`}</CityText>
              <DescriptionText>{item.highlight}</DescriptionText>
              <PriceText>{`$${item.price} per day`}</PriceText>
            </ParkingSpotListDetailsWrapper>
          </>
        )}
        keyExtractor={(item) => item.listing_id}
      />
    </>
  );
};

export default ParkingSpotList;
