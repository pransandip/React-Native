import React, { useState, useContext } from "react";
import {
  Image,
  ImageBackground,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

import { CredentialsContext } from "../contexts/CredentialsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../auth/firebase";
import Constants from "expo-constants";

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

const { primary, lightGrey, white, darkGrey, secondary, teritary, accent } =
  colors;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Please enter a valid password!")
    .max(50, "Please enter a valid password!")
    .required("Required"),
});

const LoginScreen = ({ navigation }) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const [hidePassword, setHidePassword] = useState(true);
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const handleLogin = (email, password, setSubmitting) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        setTimeout(() => {
          Alert.alert("Login Successful", `Welcome back ${user.email}!`);
          persistLogin(user);
          setSubmitting(false);
        }, 2000);
      })
      .catch((error) => {
        if (error.message.indexOf("wrong-password") > -1) {
          setTimeout(() => {
            Alert.alert("Failed Login", "Incorrect password", [
              { text: "Try Again" },
            ]);
            setSubmitting(false);
          }, 1000);
        } else if (error.message.indexOf("user-not-found") > -1) {
          setTimeout(() => {
            Alert.alert("Failed Login", "No user found with that email", [
              { text: "Try Again" },
            ]);
            setSubmitting(false);
          }, 1000);
        } else {
          setTimeout(() => {
            Alert.alert("Failed Login", error.message, [{ text: "Try Again" }]);
            setSubmitting(false);
          }, 1000);
        }
      });
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
        source={require("../assets/images/suburb-driveway.png")}
        resizeMode="cover"
        style={{
          width: ScreenWidth,
          height: ScreenHeight * 0.4,
          justifyContent: "center",
        }}>
        <Image
          source={require("../assets/images/spotsy-logo.png")}
          style={{
            height: 60,
            width: 60,
            borderRadius: 80 / 2,
            position: "absolute",
            top: ScreenHeight * 0.36,
            left: ScreenWidth * 0.42,
            borderColor: primary,
            borderWidth: 2,
            zIndex: 1,
          }}
        />
      </ImageBackground>
      <KeyboardAvoidingContainer>
        <InnerContainer>
          <TitleText
            style={{ marginTop: 40, marginBottom: 20 }}
            fs={20}
            color={primary}>
            Login
          </TitleText>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              if (values.email === "" || values.password === "") {
                Alert.alert("Error", "Please fill in all fields.");
                setSubmitting(false);
              } else {
                handleLogin(values.email, values.password, setSubmitting);
              }
            }}
            validationSchema={LoginSchema}>
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
                {errors.email && touched.email && (
                  <MsgBox>{errors.email}</MsgBox>
                )}
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="user@spotsy.com"
                  placeholderTextColor={lightGrey}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
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
                {isSubmitting && (
                  <FormButton backgroundColor={primary} disabled={true}>
                    <ActivityIndicator size="large" color={white} />
                  </FormButton>
                )}
                {!isSubmitting && (
                  <FormButton backgroundColor={primary} onPress={handleSubmit}>
                    <ButtonText>Sign in</ButtonText>
                  </FormButton>
                )}

                <ExtraView>
                  <ExtraText color={primary}>Don't have an account? </ExtraText>
                  <TextLink>
                    <TextLinkContent
                      color={primary}
                      onPress={() => navigation.navigate("Signup")}>
                      Sign up
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

export default LoginScreen;
