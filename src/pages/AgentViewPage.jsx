/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Flex,
  Container,
  Heading,
  HStack,
  Stack,
  Box,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import { COLORS } from "../constants";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TextDisplayRof from "../components/TextDisplayRof";

const AgentViewPage = () => {
  const [agentRecord, setAgentRecord] = useState([]);
  const [disableInput, setDisableInput] = useState(false);
  const location = useLocation();
  const retrievedAgentData = location.state.data.agent || {};
  const [sim1, setSim1] = useState("");
  const [sim2, setSim2] = useState("");

  const sims = retrievedAgentData.sim_details;

  useEffect(() => {});

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/agent_infos/data/upload-csv/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 201) {
        alert("File upload successful.");
        setLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Flex
      p={0}
      m={0}
      backgroundColor={COLORS.BACKGROUND}
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="calc(100vw - 200px)"
      ml="200px"
      mt={10}
      mb={10}
    >
      <Container
        padding="40px 20px 20px 20px"
        bg={COLORS.FOREGROUND}
        maxW={900}
        height="100%"
        borderRadius={10}
      >
        <Stack direction="row" justifyContent="center">
          <Heading size="lg" color={COLORS.TEXT} marginBottom="20px">
            AGENT INFORMATION
          </Heading>
        </Stack>
        <Heading size="md" color={COLORS.TEXT} marginBottom="40px">
          AGENT DETAILS:
        </Heading>
        <Stack direction="column" spacing={2}>
          <TextDisplayRof
            label="STATUS:"
            value={retrievedAgentData.status}
            customWidth="89px"
            customInputWidth="200"
            disabled={false}
          />
          <Stack direction="row" alignItems="center" spacing={2}>
            <TextDisplayRof
              label="AGENT NO.:"
              value={retrievedAgentData.agent_details.number}
              customWidth="89px"
              customInputWidth="200"
              disabled={false}
            />
            <Button
              w={20}
              borderRadius={4}
              height="28px"
              backgroundColor={COLORS.TEXT}
              fontSize="14px"
              //onClick={handleSearch}
            >
              Search
            </Button>
          </Stack>

          <TextDisplayRof
            label="AGENT NAME:"
            value={retrievedAgentData.agent_details.name}
            disabled={disableInput}
          />
          <TextDisplayRof
            label="ADDRESS:"
            value={retrievedAgentData.agent_details.address}
            disabled={disableInput}
          />
          <TextDisplayRof
            label="CITY:"
            value={retrievedAgentData.agent_details.city}
            disabled={disableInput}
          />
          <TextDisplayRof
            label="PROVINCE:"
            value={retrievedAgentData.agent_details.province}
            disabled={disableInput}
          />
          <TextDisplayRof
            label="REGION:"
            value={retrievedAgentData.agent_details.region}
            disabled={disableInput}
          />
        </Stack>
        <Heading
          size="md"
          color={COLORS.TEXT}
          marginBottom="20px"
          marginTop="40px"
        >
          COMMUNICATION DETAILS:
        </Heading>
        <Stack direction="column" spacing={2}>
          <HStack spacing={4}>
            <TextDisplayRof
              customWidth="130px"
              label="SIM1 IP:"
              value={retrievedAgentData.sim_details[0].ip}
              disabled={disableInput}
            />
            <TextDisplayRof
              customWidth="50px"
              label="ICCID"
              value={retrievedAgentData.sim_details[0].iccid}
              disabled={disableInput}
            />
            <TextDisplayRof
              customWidth="50px"
              label="CARRIER:"
              value={retrievedAgentData.sim_details[0].carrier}
              disabled={disableInput}
            />
          </HStack>
          <HStack spacing={4}>
            <TextDisplayRof
              customWidth="130px"
              label="SIM2 IP:"
              value={retrievedAgentData.sim_details[1].ip}
              disabled={disableInput}
            />
            <TextDisplayRof
              customWidth="50px"
              label="ICCID:"
              value={retrievedAgentData.sim_details[1].iccid}
              disabled={disableInput}
            />
            <TextDisplayRof
              customWidth="50px"
              label="CARRIER:"
              value={retrievedAgentData.sim_details[1].carrier}
              disabled={disableInput}
            />
          </HStack>
        </Stack>
        <Heading
          size="md"
          color={COLORS.TEXT}
          marginBottom="20px"
          marginTop="40px"
        >
          MODEM DETAILS:
        </Heading>
        <Stack direction="column" spacing={2}>
          <TextDisplayRof
            label="BRAND:"
            value={retrievedAgentData.modem_details.modem_brand}
            disabled={disableInput}
          />
          <TextDisplayRof
            label="TYPE:"
            value={retrievedAgentData.modem_details.modem_type}
            disabled={disableInput}
          />
          <TextDisplayRof
            label="SERIAL NO.:"
            value={retrievedAgentData.modem_details.modem_sn}
            disabled={disableInput}
          />
        </Stack>
      </Container>
    </Flex>
  );
};

export default AgentViewPage;
