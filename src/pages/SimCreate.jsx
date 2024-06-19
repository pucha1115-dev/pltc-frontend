import { useState } from "react";
import FormInputFieldSide from "../components/FormInputFieldSide";
import FormInputSelect from "../components/FormInputSelect";
import {
  Flex,
  Heading,
  Container,
  FormControl,
  Stack,
  Button,
  Divider,
  Text,
  Box,
} from "@chakra-ui/react";
import UploadSimCsv from "./UploadSimCsv";
import { COLORS } from "../constants";
import axios from "axios";

const SimCreate = () => {
  const [iccid, setIccid] = useState("");
  const [min_hp, setMinHp] = useState("");
  const [carrier, setCarrier] = useState("");
  const [apn, setApn] = useState("");
  const [ip, setIp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPasswrod] = useState("");

  const [iccidValidatorMessage, setIccidValidatorMessage] = useState("");
  const [min_hpValidatorMessage, setMin_hpValidatorMessage] = useState("");
  const [carrierValidatorMessage, setCarrierValidatorMessage] = useState("");

  const postData = {
    min_hp_number: min_hp,
    iccid: iccid,
    carrier: carrier.toUpperCase(),
    apn: apn.toUpperCase(),
    ip: ip,
    username: username.toLowerCase(),
    password: password,
  };

  const validateIccid = (data) => {
    return data.length === 16 && /^\d*$/.test(data);
  };

  const validateMinHp = (data) => {
    return data.length === 10 && /^\d*$/.test(data);
  };

  const validateForm = () => {
    let isValid = true;

    if (!validateIccid(iccid)) {
      setIccidValidatorMessage("ICCID must consist of exactly 16 digits.");
      isValid = false;
    } else {
      setIccidValidatorMessage("");
    }

    if (!validateMinHp(min_hp)) {
      setMin_hpValidatorMessage("MIN/HP must consist of exactly 10 digits.");
      isValid = false;
    } else {
      setMin_hpValidatorMessage("");
    }

    if (!carrier) {
      setCarrierValidatorMessage("Please select a carrier.");
      isValid = false;
    } else {
      setCarrierValidatorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/sims/",
        postData
      );
      if (response.status === 201) {
        alert("Added Successfully");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const error_response =
          error.response.data.detail || JSON.stringify(error.response.data); //get the error response data/details
        const errorData = JSON.parse(error_response); //parse to json

        const errorField = Object.keys(errorData)[0]; // retrieve the field with error
        const errorMessage = errorData[errorField][0]; // retrieve the error of the filed

        alert(errorField.toUpperCase() + " : " + errorMessage); // Set the error message
      } else {
        alert({ detail: "An unexpected error occurred" });
      }
    }
  };

  return (
    <>
      <Flex
        justifyContent="center"
        height="100vh"
        alignItems="center"
        width="calc(100vw - 200px)"
        ml="200px"
        backgroundColor={COLORS.BACKGROUND}
      >
        <Container
          maxW={600}
          bg={COLORS.FOREGROUND}
          color="white"
          p={8}
          borderRadius={10}
          margin={5}
        >
          <Heading as="h1" marginBottom={20} marginTop={2}>
            SIM Details
          </Heading>
          <FormControl>
            <Stack spacing={4}>
              <Stack spacing={4} direction="column">
                <FormInputFieldSide
                  label="ICCID"
                  name="iccid"
                  value={iccid}
                  placeholder=""
                  onChange={(e) => setIccid(e.target.value)}
                ></FormInputFieldSide>
                {iccidValidatorMessage && (
                  <Text size={5} color="red">
                    {iccidValidatorMessage}
                  </Text>
                )}
                <FormInputFieldSide
                  label="MIN/HP"
                  name="min_hp"
                  value={min_hp}
                  placeholder=""
                  onChange={(e) => setMinHp(e.target.value)}
                ></FormInputFieldSide>
                {min_hpValidatorMessage && (
                  <Text size={5} color="red">
                    {min_hpValidatorMessage}
                  </Text>
                )}
                <FormInputFieldSide
                  label="IP ADDRESS"
                  name="ip-address"
                  type="text"
                  value={ip}
                  placeholder=""
                  onChange={(e) => setIp(e.target.value)}
                ></FormInputFieldSide>
                <FormInputSelect
                  label="CARRIER"
                  name="CARRIER"
                  value={carrier}
                  placeholder="SELECT CARRIER"
                  choices={["SMART", "GLOBE"]}
                  onChange={(e) => setCarrier(e.target.value)}
                ></FormInputSelect>
                {carrierValidatorMessage && (
                  <Text size={5} color="red">
                    {carrierValidatorMessage}
                  </Text>
                )}
                <FormInputFieldSide
                  label="APN"
                  name="apn"
                  value={apn}
                  placeholder=""
                  onChange={(e) => setApn(e.target.value)}
                ></FormInputFieldSide>
                <FormInputFieldSide
                  label="USERNAME"
                  name="username"
                  value={username}
                  placeholder=""
                  onChange={(e) => setUsername(e.target.value)}
                ></FormInputFieldSide>
                <FormInputFieldSide
                  label="PASSWORD"
                  name="password"
                  type="text"
                  value={password}
                  placeholder=""
                  onChange={(e) => setPasswrod(e.target.value)}
                ></FormInputFieldSide>
              </Stack>
              <Button
                marginTop={8}
                marginBottom={5}
                backgroundColor={COLORS.ACCENT}
                onClick={handleSubmit}
              >
                ADD
              </Button>
              <Stack
                alignItems="center"
                justifyContent="center"
                direction="row"
              >
                <Divider></Divider>
                <Text>OR</Text>
                <Divider></Divider>
              </Stack>
              <Box mt={5} display="flex" justifyContent="center">
                <Text>Upload a CSV file.</Text>
              </Box>
              <Stack justifyContent="center" direction="row">
                <UploadSimCsv></UploadSimCsv>
              </Stack>
            </Stack>
          </FormControl>
        </Container>
      </Flex>
    </>
  );
};

export default SimCreate;
