import { useEffect, useState } from "react";
import { Flex, Container, Heading, HStack, Stack, Box } from "@chakra-ui/react";
import { COLORS } from "../constants";
import TextDisplay from "../components/TextDisplay";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AgentMaster = () => {
  const [screenSize, setScreenSize] = useState('')
  const [agentInfoDetails, setAgentInfoDetails] = useState(null);
  const location = useLocation();
  const { data } = location.state || {};

  useEffect(() => {
    const getAgentInfoDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/agent-infos/${data.id}/`
        );
        if (response.status === 200) {
          setAgentInfoDetails(response.data);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    getAgentInfoDetail();
  }, [data.id]);

  if (!agentInfoDetails) {
    return (
      <Box mt={20} w="100%" h="calc(100vh)" bg={COLORS.BACKGROUND}>
        loading....
      </Box>
    );
  }

  const getWindowDimension = () => {
    const {innerWidth: width, innerHeight: height} = window
  }

  const {
    agent_details: { number, name, address, city, province, region },
    sim_details,
    modem_details: { brand, type, sn },
  } = agentInfoDetails[0];

  const zip = "7000";
  const [sim1, sim2] = sim_details;

  return (
    <Flex
      backgroundColor={COLORS.BACKGROUND}
      justifyContent="center"
      alignItems="center"
      height="80vh"
      width='100vw'
      mt={10}
      mb={10}
     
    >
      <Container
        padding="40px 20px 20px 20px"
        bg={COLORS.FOREGROUND}
        maxW={900}
        height={750}
        borderRadius={10}
      >
        <Heading size="md" color={COLORS.TEXT} marginBottom="40px">
          AGENT DETAILS:
        </Heading>
        <Stack direction="column" spacing={2}>
          <TextDisplay label="AGENT NO.:" data={number.toUpperCase()} />
          <TextDisplay label="AGENT NAME:" data={name.toUpperCase()} />
          <TextDisplay label="ADDRESS:" data={address.toUpperCase()} />
          <TextDisplay label="CITY:" data={city.toUpperCase()} />
          <TextDisplay label="PROVINCE:" data={province.toUpperCase()} />
          <TextDisplay label="REGION:" data={region.toUpperCase()} />
          <TextDisplay label="ZIP:" data={zip.toUpperCase()} />
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
            <TextDisplay
              customWidth="165px"
              label="SIM1 IP:"
              data={sim1.ip.toUpperCase()}
            />
            <TextDisplay
              customWidth="50px"
              label="ICCID"
              data={sim1.iccid.toUpperCase()}
            />
            <TextDisplay
              customWidth="50px"
              label="CARRIER:"
              data={sim1.carrier.toUpperCase()}
            />
          </HStack>
          <HStack spacing={4}>
            <TextDisplay
              customWidth="165px"
              label="SIM2 IP:"
              data={sim2.ip.toUpperCase()}
            />
            <TextDisplay
              customWidth="50px"
              label="ICCID:"
              data={sim2.iccid.toUpperCase()}
            />
            <TextDisplay
              customWidth="50px"
              label="CARRIER:"
              data={sim2.carrier.toUpperCase()}
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
          <TextDisplay label="BRAND:" data={brand.toUpperCase()} />
          <TextDisplay label="TYPE:" data={type.toUpperCase()} />
          <TextDisplay label="SERIAL NO.:" data={sn.toUpperCase()} />
        </Stack>
      </Container>
    </Flex>
  );
};

export default AgentMaster;
