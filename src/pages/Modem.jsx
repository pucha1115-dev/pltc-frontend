import { useState } from "react";
import FormInputField from "../components/FormInputField";
import {
  Flex,
  Heading,
  Container,
  FormControl,
  Stack,
  Button,
} from "@chakra-ui/react";
import { COLORS } from "../constants";
import axios from "axios";

const Modem = () => {
  const [modemSN, setModemSN] = useState("");
  const [modemBrand, setModemBrand] = useState("");
  const [modemType, setModemType] = useState("");

  const postData = {
    sn: modemSN.toUpperCase(),
    brand: modemBrand.toUpperCase(),
    type: modemType.toUpperCase(),
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/modems/",
        postData
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
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
          p={20}
          borderRadius={10}
          margin={5}
        >
          <Heading as="h1" marginBottom={20} marginTop={2} color={COLORS.TEXT}>
            Modem Details
          </Heading>
          <FormControl>
            <Stack spacing={4}>
              <Stack spacing={4} direction="column">
                <FormInputField
                  label="Modem Brand"
                  name="modem-brand"
                  value={modemBrand}
                  placeholder="FOUR-FAITH / HUAWEI"
                  onChange={(e) => setModemBrand(e.target.value)}
                ></FormInputField>
                <FormInputField
                  label="Modem Type"
                  name="modem-type"
                  value={modemType}
                  placeholder="DUAL SIM"
                  onChange={(e) => setModemType(e.target.value)}
                ></FormInputField>
                <FormInputField
                  label="Modem SN"
                  name="modem-sn"
                  value={modemSN}
                  placeholder="FH123123123"
                  onChange={(e) => setModemSN(e.target.value)}
                ></FormInputField>
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
    </>
  );
};

export default Modem;
