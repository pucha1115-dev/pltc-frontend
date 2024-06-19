import { useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";

const SimUpdate = () => {
  const [iccid, setIccid] = useState("");
  const [min_hp_number, setMinHp] = useState("");
  const [carrier, setCarrier] = useState("");
  const [apn, setApn] = useState("");
  const [ip, setIp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPasswrod] = useState("");
  const [status, setStatus] = useState("");
  const location = useLocation();
  const [retrievedSimData, setRetrievedSimData] = useState(
    location.state.data || {}
  );

  useEffect(() => {
    const populate = () => {
      setIccid(retrievedSimData.sim.iccid);
      setMinHp(retrievedSimData.sim.min_hp_number);
      setCarrier(retrievedSimData.sim.carrier);
      setApn(retrievedSimData.sim.apn);
      setIp(retrievedSimData.sim.ip);
      setUsername(retrievedSimData.sim.username);
      setPasswrod(retrievedSimData.sim.password);
      setStatus(retrievedSimData.sim.status);
    };
    populate();
  }, [retrievedSimData]);

  const postData = {
    min_hp_number: min_hp_number,
    iccid: iccid,
    carrier: carrier.toUpperCase(),
    apn: apn.toUpperCase(),
    ip: ip,
    username: username.toLowerCase(),
    password: password,
    status: status.toUpperCase(),
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/sims/${retrievedSimData.sim.id}/`,
        postData
      );
      if (response.status === 200) {
        alert("Updated successfully!");
        setRetrievedSimData({ sim: response.data });
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
                <FormInputFieldSide
                  label="MIN/HP"
                  name="min_hp"
                  value={min_hp_number}
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
                <FormInputFieldSide
                  label="CARRIER"
                  name="CARRIER"
                  type="text"
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
                <FormInputFieldSide
                  label="STATUS"
                  name="status"
                  type="text"
                  value={status}
                  placeholder=""
                  onChange={(e) => setStatus(e.target.value)}
                ></FormInputFieldSide>
              </Stack>
              <Button
                marginTop={8}
                marginBottom={5}
                backgroundColor={COLORS.ACCENT}
                onClick={handleSubmit}
              >
                UPDATE
              </Button>
            </Stack>
          </FormControl>
        </Container>
      </Flex>
    </>
  );
};

export default SimUpdate;
