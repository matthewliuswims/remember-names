import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { useForm, Controller } from "react-hook-form";

// Components
import ButtonPrimary from "../components/ButtonPrimary";
import ViewContainerScrollable from "../components/ViewContainerScrollable";

// Elements
import Header from "../elements/Header";
import Paragraph from "../elements/Paragraph";
import TextInput from "../elements/TextInput";
import Logo from "../elements/svgs/Logo";

function Login({ route, navigation }) {
  const { control, handleSubmit, errors } = useForm();
  const [submitting] = useState(false);

  const onPress = async (data) => {
    console.log("data is when logging", data);
    navigation.navigate("Onboard1");
  };

  return (
    <ViewContainerScrollable style={{ justifyContent: "center" }}>
      <View style={styles.top}>
        <Logo />
        <Header style={styles.header}>Welcome Back</Header>
      </View>
      <View style={styles.bottom}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              placeholder="Email"
              style={{ width: "100%", marginBottom: 10 }} // need this for whatever reason.
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.email && <Paragraph color="error">This is required.</Paragraph>}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              placeholder="Password"
              style={{ width: "100%" }} // need this for whatever reason.
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.password && (
          <Paragraph color="error">This is required.</Paragraph>
        )}
        <Paragraph
          onPress={() => console.log("forgot your password clicked")}
          color="primary"
          style={{
            fontWeight: "bold",
            alignSelf: "flex-end",
            marginBottom: 30,
            marginTop: 5,
          }}
        >
          Forgot your password?
        </Paragraph>

        <ButtonPrimary onPress={handleSubmit(onPress)} disabled={submitting}>
          Login
        </ButtonPrimary>
      </View>
    </ViewContainerScrollable>
  );
}

export default Login;

const styles = StyleSheet.create({
  top: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginBottom: 20,
  },
});
