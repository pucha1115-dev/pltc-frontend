import { useState } from "react";
import FormInputFieldSide from "../components/FormInputFieldSide";
import {
  Flex,
  Heading,
  Container,
  FormControl,
  Stack,
  Button,
  Divider,
  Box,
  Text,
} from "@chakra-ui/react";
import { COLORS } from "../constants";
import axios from "axios";
import FormInputSelect from "../components/FormInputSelect";
import UploadModemCsv from "./UploadModemCsv";

const ModemCreate = () => {
  const [modemSN, setModemSN] = useState("");
  const [modemBrand, setModemBrand] = useState("");
  const [modemType, setModemType] = useState("");
  const [modemOwner, setModemOwner] = useState("");
  const [modemRemarks, setModemRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  const [modemSnValidatorMessage, setModemSnValidatorMessage] = useState("");
  const [modemBrandValidatorMessage, setModemBrandValidatorMessage] =
    useState("");
  const [modemTypeValidatorMessage, setModemTypeValidatorMessage] =
    useState("");

  const postData = {
    modem_sn: modemSN.toUpperCase(),
    modem_brand: modemBrand.toUpperCase(),
    modem_type: modemType.toUpperCase(),
    modem_owner: modemOwner.toUpperCase(),
    modem_remarks: modemRemarks.toUpperCase(),
  };

  const validateModemSn = (data) => {
    return data !== "";
  };

  const validateModemBrand = (data) => {
    return data !== "";
  };

  const validateModemType = (data) => {
    return data !== "";
  };

  const formValidator = () => {
    let isValid = true;

    if (!validateModemSn(modemSN)) {
      isValid = false;
      setModemSnValidatorMessage("Modem serial number required.");
    } else {
      setModemSnValidatorMessage("");
    }

    if (!validateModemBrand(modemBrand)) {
      isValid = false;
      setModemBrandValidatorMessage("Please select brand.");
    } else {
      setModemBrandValidatorMessage("");
    }

    if (!validateModemType(modemType)) {
      isValid = false;
      setModemTypeValidatorMessage("Please select type.");
    } else {
      setModemTypeValidatorMessage("");
    }

    return isValid;
  };

  const clearInput = () => {
    setModemSN("");
    setModemBrand("");
    setModemType("");
    setModemOwner("");
    setModemRemarks("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!formValidator()) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/modems/",
        postData
      );
      if (response.status === 201) {
        alert("Modem added successfuly.");
        clearInput();
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const error_response =
          error.response.data.detail || JSON.stringify(error.response.data); //get the error response data/details
        const errorData = JSON.parse(error_response); //parse to json

        const errorField = Object.keys(errorData)[0]; // retrieve the field with error
        const errorMessage = errorData[errorField][0]; // retrieve the error of the filed

        alert(errorField.toUpperCase() + " : " + errorMessage); // Set the error message
        setLoading(false);
      } else {
        alert({ detail: "An unexpected error occurred" });
        setLoading(false);
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
            Modem Details
          </Heading>
          <FormControl>
            <Stack spacing={4}>
              <Stack spacing={4} direction="column">
                <FormInputFieldSide
                  label="SERIAL NO."
                  name="modem-sn"
                  value={modemSN}
                  placeholder=""
                  onChange={(e) => setModemSN(e.target.value)}
                ></FormInputFieldSide>
                {modemSnValidatorMessage && (
                  <Text size={5} color="red">
                    {modemSnValidatorMessage}
                  </Text>
                )}
                <FormInputSelect
                  label="BRAND"
                  name="modem-brand"
                  value={modemBrand}
                  placeholder="------"
                  onChange={(e) => setModemBrand(e.target.value)}
                  choices={["FOUR-FAITH", "HUAWEI", "VECTRAS"]}
                ></FormInputSelect>
                {modemBrandValidatorMessage && (
                  <Text size={5} color="red">
                    {modemBrandValidatorMessage}
                  </Text>
                )}
                <FormInputSelect
                  label="TYPE"
                  name="modem-type"
                  value={modemType}
                  placeholder="------"
                  onChange={(e) => setModemType(e.target.value)}
                  choices={["SINGLE SIM", "DUAL SIM"]}
                ></FormInputSelect>
                {modemTypeValidatorMessage && (
                  <Text size={5} color="red">
                    {modemTypeValidatorMessage}
                  </Text>
                )}
                <FormInputFieldSide
                  label="OWNER"
                  name="modem-owner"
                  value={modemOwner}
                  placeholder=""
                  onChange={(e) => setModemOwner(e.target.value)}
                ></FormInputFieldSide>
                <FormInputFieldSide
                  label="REMARKS"
                  name="modem-remarks"
                  value={modemRemarks}
                  placeholder=""
                  onChange={(e) => setModemRemarks(e.target.value)}
                ></FormInputFieldSide>
              </Stack>
              {loading ? (
                <Button
                  isLoading
                  marginTop={8}
                  marginBottom={2}
                  backgroundColor={COLORS.ACCENT}
                  onClick={handleSubmit}
                >
                  ADD
                </Button>
              ) : (
                <Button
                  marginTop={8}
                  marginBottom={2}
                  backgroundColor={COLORS.ACCENT}
                  onClick={handleSubmit}
                >
                  ADD
                </Button>
              )}

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
                <UploadModemCsv></UploadModemCsv>
              </Stack>
            </Stack>
          </FormControl>
        </Container>
      </Flex>
    </>
  );
};

export default ModemCreate;
