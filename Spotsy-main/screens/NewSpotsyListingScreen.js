import React, { useEffect, useContext, useRef } from "react";
import { ImageBackground, ActivityIndicator, View } from "react-native";
import { CredentialsContext } from "../contexts/CredentialsContext";
import { collection, query, getDocs, where } from "firebase/firestore/lite";
import { db, auth } from "../auth/firebase";
import { Formik } from "formik";
import * as Yup from "yup";
import { MainContainer } from "../components/containers/MainContainer";
import { BackArrow } from "../components/buttons/BackArrow";
import { KeyboardAvoidingContainer } from "../components/containers/KeyboardAvoidingContainer";
import { InnerContainer } from "../components/containers/InnerContainer";
import { TitleText } from "../components/texts/TitleText";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { ScreenWidth, ScreenHeight } from "../components/dimensions/dimensions";
import { colors } from "../components/colors/colors";
import { InputLabel } from "../components/inputs/InputLabel";
import { TextInput } from "../components/inputs/TextInput";
import { TextArea } from "../components/inputs/TextArea";
import { FormArea } from "../components/forms/FormArea";
import { MsgBox } from "../components/dialogues/MsgBox";
import { FormButton } from "../components/buttons/FormButton";
import { ButtonText } from "../components/texts/ButtonText";

const { primary, lightGrey, teritary, white, secondary, darkGrey } = colors;

const NewSpotListingSchema = Yup.object().shape({
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zipCode: Yup.string()
    .min(5, "Zip code must be 5 characters!")
    .max(5, "Zip code cannot be greather than 5 characters!")
    .required("Required"),
  spot_type: Yup.string().required("Required"),
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  highlight: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
});

// when user types in address use google places api to populate address, city, state, zip code
// will need to store coordinates, user_id, and host_name in firestore spots collection -> /spots/{spotId}
// when user clicks submit, create new spot in firestore spots -> /spots/{spotId}

const NewSpotsyListingScreen = ({ navigation }) => {
  const { storedCredentials } = useContext(CredentialsContext);
  const googRef = useRef();
  const createNewSpot = async (host_name) => {
    let response = await fetch(
      "https://us-central1-dryvwaze.cloudfunctions.net/createSpotListing",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: storedCredentials?.uid,
          host_name,
          city: "Torrance",
          description: "This is a test description",
          title: "Test Title",
          highlight: "This is a test highlight",
          spot_type: "Parking",
          price: "10.00",
          has_active_reservation: false,
        }),
      }
    );
    let data = await response.json();
    console.log("new spot:", data);
    return data;
  };

  useEffect(() => {
    // async function getUserFullName() {
    //   const q = query(
    //     collection(db, "users"),
    //     where("user_id", "==", storedCredentials.uid)
    //   );
    //   const querySnapshot = await getDocs(q);
    //   const user = querySnapshot.docs[0].data().full_name;
    //   console.log("user:", user);
    //   return user;
    // }
    // async function createSpot() {
    //   let host_name = await getUserFullName();
    //   console.log("host name:", host_name);
    //   let data = await createNewSpot(host_name);
    //   console.log("new spot:", data);
    // }
    // createSpot();
  }, []);

  return (
    <MainContainer>
      <BackArrow onPress={() => navigation.goBack()} />
      <ImageBackground
        source={require("../assets/images/car-house-driveway.png")}
        resizeMode="cover"
        style={{
          width: ScreenWidth,
          height: ScreenHeight * 0.2,
          justifyContent: "center",
        }}></ImageBackground>
      <KeyboardAvoidingContainer>
        <InnerContainer style={{ marginBottom: 30 }}>
          <TitleText
            style={{ marginTop: 10, marginBottom: 10 }}
            fs={20}
            color={primary}>
            Create a new Spotsy Listing!
          </TitleText>
          <Formik
            initialValues={{
              address: "",
              city: "",
              state: "",
              zipCode: "",
              spot_type: "",
              title: "",
              description: "",
              highlight: "",
              price: "",
            }}
            validationSchema={NewSpotListingSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log(values);
              setSubmitting(true);
              //handleSignUp(values, setSubmitting, resetForm);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              errors,
              touched,
              values,
            }) => (
              <FormArea>
                <InputLabel>{`Address`}</InputLabel>
                <View
                  style={{
                    zIndex: 1,
                    marginBottom: 75,
                    marginTop: 5,
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
                    listViewDisplayed="false"
                    keepResultsAfterBlur={true}
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
                        borderWidth: 1,
                        borderColor: primary,
                        padding: 5,
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

                {errors.address && touched.address && (
                  <MsgBox>{errors.address}</MsgBox>
                )}
                <MyTextInput
                  label="Title"
                  name="title"
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                />
                {errors.title && touched.title && (
                  <MsgBox>{errors.title}</MsgBox>
                )}
                <MyTextInput
                  label="Description"
                  name="description"
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  multiline={true}
                  numberOfLines={10}
                  height={100}
                />
                {errors.description && touched.description && (
                  <MsgBox>{errors.description}</MsgBox>
                )}
                {!isSubmitting && (
                  <FormButton
                    backgroundColor={primary}
                    onPress={() => navigation.goBack()}>
                    <ButtonText>Save & Continue</ButtonText>
                  </FormButton>
                )}
                {isSubmitting && (
                  <FormButton backgroundColor={primary} disabled={true}>
                    <ActivityIndicator size="large" color={white} />
                  </FormButton>
                )}
              </FormArea>
            )}
          </Formik>
        </InnerContainer>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

const MyTextInput = ({ label, ...props }) => {
  return (
    <View>
      <InputLabel>{label}</InputLabel>
      <TextInput {...props} />
    </View>
  );
};

export default NewSpotsyListingScreen;
