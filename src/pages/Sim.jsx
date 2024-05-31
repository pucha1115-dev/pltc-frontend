import { useState } from "react";
import FormInputFieldSide from "../components/FormInputFieldSide";
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

const Sim = () => {
  const [iccid, setIccid] = useState("");
  const [min_hp, setMinHp] = useState("");
  const [carrier, setCarrier] = useState("");
  const [apn, setApn] = useState("");
  const [ip, setIp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPasswrod] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/sims/", {});
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
          p={8}
          borderRadius={10}
          margin={5}
        >
          <Heading as="h1" marginBottom={20} marginTop={2} color={COLORS.TEXT}>
            Modem Details
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
                <FormInputFieldSide
                  label="MIN/HP"
                  name="min_hp"
                  value={min_hp}
                  placeholder=""
                  onChange={(e) => setMinHp(e.target.value)}
                ></FormInputFieldSide>
                <FormInputFieldSide
                  label="IP Address"
                  name="apn"
                  type="text"
                  value={ip}
                  placeholder=""
                  onChange={(e) => setIp(e.target.value)}
                ></FormInputFieldSide>
                <FormInputFieldSide
                  label="Carrier"
                  name="carrier"
                  value={carrier}
                  placeholder=""
                  onChange={(e) => setCarrier(e.target.value)}
                ></FormInputFieldSide>
                <FormInputFieldSide
                  label="APN"
                  name="apn"
                  value={apn}
                  placeholder=""
                  onChange={(e) => setApn(e.target.value)}
                ></FormInputFieldSide>
                <FormInputFieldSide
                  label="Username"
                  name="username"
                  value={username}
                  placeholder=""
                  onChange={(e) => setUsername(e.target.value)}
                ></FormInputFieldSide>
                <FormInputFieldSide
                  label="Password"
                  name="apn"
                  type="text"
                  value={password}
                  placeholder=""
                  onChange={(e) => setPasswrod(e.target.value)}
                ></FormInputFieldSide>
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

export default Sim;
