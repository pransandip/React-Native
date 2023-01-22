import React, { useState, useContext } from "react";
import {
  View,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Image,
} from "react-native";

import { Octicons, Ionicons } from "@expo/vector-icons";

import { Formik } from "formik";
import * as Yup from "yup";
import { setDoc, doc } from "firebase/firestore/lite";
import { db, auth } from "../auth/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Constants from "expo-constants";

import { CredentialsContext } from "../contexts/CredentialsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MainContainer } from "../components/containers/MainContainer";
import { InnerContainer } from "../components/containers/InnerContainer";
import { KeyboardAvoidingContainer } from "../components/containers/KeyboardAvoidingContainer";

import { TextInput } from "../components/inputs/TextInput";
import { InputLabel } from "../components/inputs/InputLabel";
import { FormArea } from "../components/forms/FormArea";

import { TitleText } from "../components/texts/TitleText";
import { TextLinkContent } from "../components/texts/TextLinkContent";
import { TextLink } from "../components/texts/TextLink";
import { ExtraText } from "../components/texts/ExtraText";
import { ButtonText } from "../components/texts/ButtonText";

import { FormButton } from "../components/buttons/FormButton";
import { BackArrow } from "../components/buttons/BackArrow";

import { ExtraView } from "../components/views/ExtraView";

import { MsgBox } from "../components/dialogues/MsgBox";

import { Line } from "../components/styles/Line";
import { LeftIcon } from "../components/icons/LeftIcon";
import { RightIcon } from "../components/icons/RightIcon";

import { ScreenWidth, ScreenHeight } from "../components/dimensions/dimensions";
import { colors } from "../components/colors/colors";

const { primary, lightGrey, teritary, white, secondary, darkGrey } = colors;

const UserSignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Please enter you first and last name!")
    .max(50, "Please enter you first and last name!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .min(12, "Phone number format: xxx-xxx-xxxx")
    .max(12, "Phone number format: xxx-xxx-xxxx")
    .required("Required"),
  zipCode: Yup.string()
    .min(5, "Zip code must be 5 characters!")
    .max(5, "Zip code cannot be greather than 5 characters!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters!")
    .max(50, "Password must be at less than 50 characters!!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match!")
    .required("Required"),
});

const SignupScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const createUserRecord = async (uid, values) => {
    try {
      const userRef = await setDoc(doc(db, "users", uid), {
        full_name: values.fullName,
        email: values.email,
        phone_number: values.phoneNumber,
        zip_code: values.zipCode,
        user_id: uid,
      });
      return userRef;
    } catch (error) {
      return error;
    }
  };

  const createUserRegistrationStatus = async (uid) => {
    try {
      const userRef = await setDoc(doc(db, "user_registration_status", uid), {
        profile_photo_added: false,
        user_id: uid,
      });
      return userRef;
    } catch (error) {
      return error;
    }
  };

  const handleSignUp = async (values, setSubmitting, resetForm) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const userRef = await createUserRecord(userCredential.user.uid, values);
      await createUserRegistrationStatus(userCredential.user.uid);
      setTimeout(() => {
        Alert.alert(
          "Account Created Successfully!",
          `account email: ${userCredential.user.email}!`
        );
        persistLogin(userCredential.user);
        setSubmitting(false);
        resetForm({ values: {} });
      }, 1000);
    } catch (error) {
      setSubmitting(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const persistLogin = (credentials) => {
    AsyncStorage.setItem("spotsyCredentials", JSON.stringify(credentials))
      .then(() => {
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
        console.log(error);
      });
  };

  return (
    <MainContainer>
      <BackArrow onPress={() => navigation.navigate("Home")} />
      <ImageBackground
        source={require("../assets/images/car-house-driveway.png")}
        resizeMode="cover"
        style={{
          width: ScreenWidth,
          height: ScreenHeight * 0.2,
          justifyContent: "center",
        }}>
        <Image
          source={require("../assets/images/spotsy-logo.png")}
          style={{
            height: 45,
            width: 45,
            borderRadius: 80 / 2,
            position: "absolute",
            top: ScreenHeight * 0.17,
            left: ScreenWidth * 0.44,
            borderColor: primary,
            borderWidth: 2,
            zIndex: 1,
          }}
        />
      </ImageBackground>
      <KeyboardAvoidingContainer>
        <InnerContainer style={{ marginBottom: 30 }}>
          <TitleText
            style={{ marginTop: 30, marginBottom: 10 }}
            fs={20}
            color={primary}>
            Signup
          </TitleText>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              phoneNumber: "",
              zipCode: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={UserSignupSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log(values);
              setSubmitting(true);
              handleSignUp(values, setSubmitting, resetForm);
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
                {errors.fullName && touched.fullName && (
                  <MsgBox>{errors.fullName}</MsgBox>
                )}
                <MyTextInput
                  label="Full Name"
                  icon="person"
                  placeholder="Cool Kat"
                  placeholderTextColor={lightGrey}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                />
                {errors.email && touched.email && (
                  <MsgBox>{errors.email}</MsgBox>
                )}
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="coolkat@shiftze.com"
                  placeholderTextColor={lightGrey}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <MsgBox>{errors.phoneNumber}</MsgBox>
                )}
                <MyTextInput
                  label="Phone Number"
                  icon="device-mobile"
                  placeholder="310-555-5555"
                  placeholderTextColor={lightGrey}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  keyboardType="phone-pad"
                />
                {errors.zipCode && touched.zipCode && (
                  <MsgBox>{errors.zipCode}</MsgBox>
                )}
                <MyTextInput
                  label="Zip Code"
                  icon="home"
                  placeholder="90210"
                  placeholderTextColor={lightGrey}
                  onChangeText={handleChange("zipCode")}
                  onBlur={handleBlur("zipCode")}
                  value={values.zipCode}
                  keyboardType="phone-pad"
                />
                {errors.password && touched.password && (
                  <MsgBox>{errors.password}</MsgBox>
                )}
                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={lightGrey}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <MsgBox>{errors.confirmPassword}</MsgBox>
                )}
                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={lightGrey}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                {!isSubmitting && (
                  <FormButton backgroundColor={primary} onPress={handleSubmit}>
                    <ButtonText>Register</ButtonText>
                  </FormButton>
                )}
                {isSubmitting && (
                  <FormButton backgroundColor={primary} disabled={true}>
                    <ActivityIndicator size="large" color={white} />
                  </FormButton>
                )}

                <ExtraView>
                  <ExtraText color={primary}>
                    Already have an account?{" "}
                  </ExtraText>
                  <TextLink>
                    <TextLinkContent
                      color={primary}
                      onPress={() => navigation.navigate("Login")}>
                      Login
                    </TextLinkContent>
                  </TextLink>
                </ExtraView>
              </FormArea>
            )}
          </Formik>
        </InnerContainer>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  setHidePassword,
  hidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={secondary} />
      </LeftIcon>
      <InputLabel>{label}</InputLabel>
      <TextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkGrey}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default SignupScreen;
