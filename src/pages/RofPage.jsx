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
  Icon,
  Button,
} from "@chakra-ui/react";
import { COLORS } from "../constants";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import "../css/custom-datepicker.css";
import TextDisplayRof from "../components/TextDisplayRof";

const RofPage = () => {
  const [screenSize, setScreenSize] = useState("");
  const [rofDate, setRofDate] = useState(new Date());
  const [agentInfoDetails, setAgentInfoDetails] = useState(null);
  const [disableInput, setDisableInput] = useState(true);

  const [agentNumber, setAgentNumber] = useState("");
  const [agentName, setAgentName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [zip, setZip] = useState("");

  const [sim1IP, setSim1IP] = useState("");
  const [sim1ICCID, setSim1ICCID] = useState("");
  const [sim1Carrier, setSim1Carrier] = useState("");
  const [sim2IP, setSim2IP] = useState("");
  const [sim2ICCID, setSim2ICCID] = useState("");
  const [sim2Carrier, setSim2Carrier] = useState("");

  const [modemBrand, setModemBrand] = useState("");
  const [modemType, setModemType] = useState("");
  const [modemSN, setModemSN] = useState("");

  const getAgentInfoDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/agent-infos/${agentNumber}/`
      );
      if (response.status === 200) {
        setAgentInfoDetails(response.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSearch = async () => {
    await getAgentInfoDetail();
  };

  useEffect(() => {
    if (agentInfoDetails) {
      console.log(agentInfoDetails);
      setDisableInput(false);

      const {
        agent_details: { number, name, address, city, province, region },
        sim_details,
        modem_details: { brand, type, sn },
      } = agentInfoDetails[0];

      const zip = "7000";
      const [sim1, sim2] = sim_details;

      setAgentName(name);
      setAddress(address);
      setCity(city);
      setProvince(province);
      setRegion(region);
      setZip(zip);

      setSim1IP(sim1.ip);
      setSim1ICCID(sim1.iccid);
      setSim1Carrier(sim1.carrier);
      setSim2IP(sim2.ip);
      setSim2ICCID(sim2.iccid);
      setSim2Carrier(sim2.carrier);

      setModemBrand(brand);
      setModemType(type);
      setModemSN(sn);
    }
  }, [agentInfoDetails]);

  return (
    <Flex
      p={0}
      m={0}
      backgroundColor={COLORS.BACKGROUND}
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
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
            ROF
          </Heading>
        </Stack>
        <Stack direction="column">
          <Stack direction="row" justifyContent="left" alignItems="center">
            <Text
              fontSize="14px"
              fontWeight="bold"
              width="85px"
              color={COLORS.TEXT}
            >
              ACTION:{" "}
            </Text>
            <Input
              textTransform="uppercase"
              size="sm"
              border={0}
              padding="5px"
              fontSize="14px"
              width="200px"
              borderRadius="4px"
              backgroundColor={COLORS.BACKGROUND}
              color={COLORS.TEXT}
            ></Input>
          </Stack>
          <Stack
            direction="row"
            mb={10}
            justifyContent="left"
            alignItems="center"
          >
            <Text
              fontSize="14px"
              fontWeight="bold"
              width="85px"
              color={COLORS.TEXT}
            >
              DATE:{" "}
            </Text>
            <Box
              size="sm"
              border={0}
              padding="5px"
              fontSize="14px"
              width="200px"
              borderRadius="4px"
              backgroundColor={COLORS.BACKGROUND}
              color={COLORS.TEXT}
            >
              <div className="datepicker-container">
                <FaCalendarAlt className="datepicker-icon" />
                <DatePicker
                  className="datepicker-input"
                  toggleCalendarOnIconClick
                  selected={rofDate}
                  onChange={(date) => setRofDate(date)}
                />
              </div>
            </Box>
          </Stack>
        </Stack>

        <Heading size="md" color={COLORS.TEXT} marginBottom="40px">
          AGENT DETAILS:
        </Heading>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <TextDisplayRof
              label="AGENT NO.:"
              value={agentNumber}
              customWidth="89px"
              customInputWidth="200"
              disabled={false}
              onChange={(e) => setAgentNumber(e.target.value)}
            />
            <Button
              w={20}
              borderRadius={4}
              height="28px"
              backgroundColor={COLORS.TEXT}
              fontSize="14px"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Stack>

          <TextDisplayRof
            label="AGENT NAME:"
            value={agentName}
            disabled={disableInput}
          />
          <TextDisplayRof
            label="ADDRESS:"
            value={address}
            disabled={disableInput}
          />
          <TextDisplayRof label="CITY:" value={city} disabled={disableInput} />
          <TextDisplayRof
            label="PROVINCE:"
            value={province}
            disabled={disableInput}
          />
          <TextDisplayRof
            label="REGION:"
            value={region}
            disabled={disableInput}
          />
          <TextDisplayRof label="ZIP:" value={zip} disabled={disableInput} />
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
              value={sim1IP}
              disabled={disableInput}
            />
            <TextDisplayRof
              customWidth="50px"
              label="ICCID"
              value={sim1ICCID}
              disabled={disableInput}
            />
            <TextDisplayRof
              customWidth="50px"
              label="CARRIER:"
              value={sim1Carrier}
              disabled={disableInput}
            />
          </HStack>
          <HStack spacing={4}>
            <TextDisplayRof
              customWidth="130px"
              label="SIM2 IP:"
              value={sim2IP}
              disabled={disableInput}
            />
            <TextDisplayRof
              customWidth="50px"
              label="ICCID:"
              value={sim2ICCID}
              disabled={disableInput}
            />
            <TextDisplayRof
              customWidth="50px"
              label="CARRIER:"
              value={sim2Carrier}
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
            value={modemBrand}
            disabled={disableInput}
          />
          <TextDisplayRof
            label="TYPE:"
            value={modemType}
            disabled={disableInput}
          />
          <TextDisplayRof
            label="SERIAL NO.:"
            value={modemSN}
            disabled={disableInput}
          />
        </Stack>
      </Container>
    </Flex>
  );
};

export default RofPage;
