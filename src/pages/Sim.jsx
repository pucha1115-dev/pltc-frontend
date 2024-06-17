import { useEffect, useState } from "react";
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
  Box
} from "@chakra-ui/react";
import UploadSimCsv from "./UploadSimCsv";
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


  useEffect(() => {
    GetSimList();
  }, []);

  const GetSimList = async () => {
    const response = await axios.get("http://localhost:8000/api/sims/");
    if (response.status === 200) {
      console.log(response.data);
    }
  };

  const postData = {
    min_hp_number: min_hp,
    iccid: iccid,
    carrier: carrier.toUpperCase(),
    apn: apn.toUpperCase(),
    ip: ip,
    username: username.toLowerCase(),
    password: password,
  };

  const handleSubmit = () => {
    console.log(postData);
  };

  return (
    <>
      <Flex
        justifyContent="center"
        height="100vh"
        alignItems="center"
        backgroundColor={COLORS.BACKGROUND}
        marginLeft={200}
        w={800}
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
            <Stack  spacing={4}>
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
              <Stack alignItems='center' justifyContent='center' direction='row'>
              <Divider></Divider><Text>OR</Text><Divider></Divider>
            
              </Stack>
              <Box mt={5} display='flex' justifyContent='center'>
              <Text>Upload a CSV file.</Text>
              </Box>
              <Stack justifyContent='center' direction='row'>
              <UploadSimCsv></UploadSimCsv>
              </Stack>
            </Stack>
          </FormControl>
        </Container>
      </Flex>
    </>
  );
};

export default Sim;
