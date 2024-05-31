import {
  Flex,
  Button,
  Container,
  Heading,
  FormControl,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import FormInputField from "../components/FormInputField";
import { useState, useEffect } from "react";
import { COLORS } from "../constants";

const Register = () => {
  const [agentNumber, setAgentNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mi, setMi] = useState("");
  const [suffix, setSuffix] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [zip, setZip] = useState("");

  const [isLargerThanp425x] = useMediaQuery("(min-width: 425px)");
  const [direction, setDirection] = useState("");

  useEffect(() => {
    setDirection(isLargerThanp425x ? "row" : "column");
  }, [isLargerThanp425x]);

  const getFullName = (miInput, firstNameInput, lastNameInput, suffixInput) => {
    let fullName = "";
    let newMi = "";
    let newSuffix = "";

    if (miInput) {
      if (miInput.slice(-1) === ".") {
        newMi = miInput;
      } else {
        newMi = miInput + ".";
      }
    }

    if (suffixInput) {
      if (suffixInput.slice(-1) === ".") {
        newSuffix = suffixInput;
      } else {
        newSuffix = suffixInput + ".";
      }
    }

    if (!lastNameInput) {
      fullName = firstNameInput.trim().replace(/\s+/g, " ");
    } else {
      fullName =
        lastNameInput + ", " + firstNameInput + " " + newMi + " " + newSuffix;
    }
    return fullName;
  };

  const postData = {
    number: agentNumber,
    Name: getFullName(mi, firstName, lastName, suffix)
      .trim()
      .replace(/\s+/g, " "),
    address: address,
    city: city,
    province: province,
    region: region,
    zip_code: zip,
  };

  const handleSubmit = () => {
    console.log(postData);
  };

  return (
    <Flex
      justifyContent="center"
      height="100vh"
      alignItems="center"
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
        <Heading as="h1" marginBottom={20} marginTop={2} color={COLORS.TEXT}>
          Agent Details
        </Heading>
        <FormControl>
          <Stack spacing={4}>
            <FormInputField
              label="Agent No."
              placeholder="12345678"
              name="agentNumber"
              width="100px"
              value={agentNumber}
              onChange={(e) => setAgentNumber(e.target.value)}
            />
            <Stack
              direction={direction}
              justify="space-between"
              alignItems="start"
              spacing={4}
            >
              <FormInputField
                label="First Name"
                placeholder="John"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormInputField
                label="Last Name"
                placeholder="Doe"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <FormInputField
                label="M.I.  "
                placeholder="A."
                width="80px"
                name="mi"
                value={mi}
                onChange={(e) => setMi(e.target.value)}
              />
              <FormInputField
                label="Suffix"
                placeholder="JR."
                width="20"
                name="suffix"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
              />
            </Stack>
            <FormInputField
              label="Address"
              placeholder="123 Street, Brgy. Arbor"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Stack
              direction={direction}
              justify="space-between"
              alignItems="start"
              spacing={4}
            >
              <FormInputField
                label="City"
                placeholder="Boljoon"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <FormInputField
                label="Province"
                placeholder="Cebu"
                name="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
              <FormInputField
                label="Region"
                placeholder="07"
                width="20"
                name="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
              <FormInputField
                label="ZIP"
                placeholder="6000"
                width="20"
                name="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </Stack>
            <Button
              marginTop={8}
              marginBottom={2}
              backgroundColor={COLORS.ACCENT}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        </FormControl>
      </Container>
    </Flex>
  );
};

export default Register;
