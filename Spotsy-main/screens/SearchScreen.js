import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, Pressable, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { MainContainer } from "../components/containers/MainContainer";
import { FloatingListButton } from "../components/buttons/FloatingListButton";
import { ScreenWidth, ScreenHeight } from "../components/dimensions/dimensions";

import { ParkingSpotListImage } from "../components/images/ParkingSpotListImage";
import { ParkingSpotFavoriteIcon } from "../components/icons/ParkingSpotFavoriteIcon";
import { ParkingSpotListDetailsWrapper } from "../components/containers/ParkingSpotListDetailsWrapper";
import { CityText } from "../components/texts/CityText";
import { DescriptionText } from "../components/texts/DescriptionText";
import { PriceText } from "../components/texts/PriceText";
import { BackArrow } from "../components/buttons/BackArrow";

import { colors } from "../components/colors/colors";

import data from "../data/parkingSpots";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

const { white, black, secondary, primary } = colors;

const SearchScreen = ({ navigation }) => {
  const [parkingSpots, setParkingSpots] = useState(data);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selected, setSelected] = useState(null);
  console.log("selected", selected);
  const [region, setRegion] = useState({
    latitude: 33.8622,
    longitude: -118.3995,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });

  const toggleFavorite = (listing_id) => {
    const newParkingSpots = parkingSpots.map((spot) => {
      if (spot.listing_id === listing_id) {
        return { ...spot, is_favorite: !spot.is_favorite };
      }
      return spot;
    });
    setParkingSpots(newParkingSpots);
  };
  const flatlist = useRef();
  const mapRef = useRef();
  const viewConfig = useRef({
    itemVisiblePercentThreshold: 70,
  });
  const googRef = useRef();
  const onViewChanged = useRef(({ viewableItems }) => {
    // console.log("viewableItems", viewableItems);
    if (viewableItems.length > 0) {
      const selectedListing = viewableItems[0].item;

      setSelected(selectedListing.listing_id);
    }
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log("location", location);
      // setRegion({
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      //   latitudeDelta: 0.04,
      //   longitudeDelta: 0.05,
      // });
      if (mapRef.current) {
        // list of spot listing id's must same that has been provided to the identifier props of the Marker
        mapRef.current.fitToSuppliedMarkers(
          parkingSpots.map((spot) => spot.listing_id)
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (!selected || !flatlist) {
      return;
    }
    let index = parkingSpots.findIndex((spot) => spot.listing_id === selected);
    if (selected === parkingSpots.length) {
      index = parkingSpots.length - 1;
    }

    const selectedListing = parkingSpots[index];
    const region = {
      latitude: selectedListing.coordinates.latitude,
      longitude: selectedListing.coordinates.longitude,
      latitudeDelta: 0.5,
      longitudeDelta: 0.4,
    };
    //setRegion(region);
    mapRef.current.animateToRegion(region, 1000);
    flatlist.current.scrollToIndex({
      index,
    });
  }, [selected]);

  return (
    <MainContainer>
      <BackArrow
        onPress={() => navigation.navigate("Spotsy")}
        style={{ zIndex: 1, position: "absolute", top: ScreenHeight * 0.03 }}
      />
      <View
        style={{
          zIndex: 1,
          position: "absolute",
          top: ScreenHeight * 0.1,
          left: ScreenWidth * 0.03,
          width: ScreenWidth * 0.95,
          alignSelf: "center",
        }}>
        <GooglePlacesAutocomplete
          ref={googRef}
          placeholder="Search by city, address or zip code"
          nearbyPlacesAPI="GooglePlacesSearch"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log("details", details);
            //console.log("details", details?.address_components[0]?.long_name);
            //console.log("details", details?.geometry.location);
          }}
          clearButtonMode="always"
          fetchDetails={true}
          returnKeyType={"search"}
          GooglePlacesSearchQuery={{
            rankby: "distance",
            types: "city",
          }}
          listViewDisplayed="auto"
          styles={{
            container: {
              flex: 1,
              position: "absolute",
              width: "100%",
              zIndex: 1,
              backgroundColor: white,
            },
            textInputContainer: {
              backgroundColor: white,
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
          }}
          textInputProps={{}}
          onFail={(error) => console.error(error)}
          debounce={400}
          query={{
            key: Constants.manifest.extra.GOOGLE_PLACES_API_KEY,
            components: "country:us",
            language: "en",
          }}
        />
      </View>
      <FloatingListButton onPress={() => navigation.navigate("Spotsy")} />
      <MapView
        onMarkerPress={(event) => {
          event.stopPropagation();
          console.log("onMarkerPressEvent", event.nativeEvent.id);
          setSelected(event.nativeEvent.id);
        }}
        ref={mapRef}
        initialRegion={region}
        style={{
          width: ScreenWidth,
          height: ScreenHeight,
        }}>
        <Marker
          title="my location"
          coordinate={{
            latitude: location?.coords?.latitude || 33.8622,
            longitude: location?.coords?.longitude || -118.3995,
          }}
        />
        {parkingSpots.map((spot) => (
          <Marker
            key={spot.listing_id.toString()}
            identifier={spot.listing_id.toString()}
            coordinate={{
              latitude: spot.coordinates.latitude,
              longitude: spot.coordinates.longitude,
            }}>
            <View
              style={{
                backgroundColor: selected === spot.listing_id ? black : white,
                padding: 5,
                width: 50,
                borderRadius: 20,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: black,
              }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: selected === spot.listing_id ? white : black,
                }}>{`$${spot.price}`}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
      <View
        style={{
          position: "absolute",
          top: ScreenHeight * 0.8,
          left: ScreenWidth * 0.05,
        }}>
        <FlatList
          ref={flatlist}
          horizontal={true}
          data={parkingSpots}
          snapToInterval={365}
          getItemLayout={(data, index) => ({
            length: 130,
            offset: index * 365,
            index,
          })}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate={"fast"}
          viewabilityConfig={viewConfig.current}
          onViewableItemsChanged={onViewChanged.current}
          keyExtractor={(item) => item.listing_id}
          renderItem={({ item }) => (
            <View
              style={{
                width: ScreenWidth - 60,
                height: 130,
                flexDirection: "row",
                marginRight: 10,
                flex: 1,
                justifyContent: "space-between",
              }}>
              <Pressable
                onPress={(event) => {
                  event.stopPropagation();
                  navigation.navigate("Parking Spot Listing", {
                    parkingSpot: parkingSpots.filter(
                      (spot) => spot.listing_id === item.listing_id
                    ),
                  });
                }}>
                <View
                  style={{
                    width: 335,
                    height: 130,
                    flex: 1,
                    marginRight: 20,
                    flexDirection: "row",
                    backgroundColor: white,
                    borderRadius: 10,
                    alignItems: "center",
                  }}>
                  <ParkingSpotListImage
                    source={item.image_url}
                    height={130}
                    width={150}
                    resizeMode="cover"
                    borderRadius={10}>
                    <ParkingSpotFavoriteIcon
                      is_favorite={item.is_favorite}
                      onPress={() => toggleFavorite(item.listing_id)}
                    />
                  </ParkingSpotListImage>

                  <ParkingSpotListDetailsWrapper style={{ marginLeft: 10 }}>
                    <CityText>{`${item.city}, California`}</CityText>
                    <DescriptionText>{item.highlight}</DescriptionText>
                    <PriceText>{`$${item.price} per day`}</PriceText>
                  </ParkingSpotListDetailsWrapper>
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>
    </MainContainer>
  );
};

export default SearchScreen;
