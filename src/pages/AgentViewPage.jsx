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
import {COLORS} from '../constants'
import { useLocation } from "react-router-dom";
import axios from "axios";
import TextDisplayRof from "../components/TextDisplayRof";

const AgentViewPage = () => {
  const [agentRecord, setAgentRecord] = useState([]);
  const [disableInput, setDisableInput] = useState(false);

  const location = useLocation()
  const [retrievedAgentNumber, setRetrievedAgentNumber] = useState(location.state || {});


  useEffect(() => {
    const getAgentInfo = async () => {
      try{
        console.log('run axios get')
       // const response = await axios.get('http://localhost:8000/api/agent-infos/40001018/');
        const response = await axios.get(`http://localhost:8000/api/agent-infos/${retrievedAgentNumber.data.agentNumber}/`);
        setAgentRecord(response.data)
        console.log(response.data);
      }catch(error){
        alert(error.message);
      }
    }

    getAgentInfo();
  },[retrievedAgentNumber])


  
    

  


  return (
    <>{console.log("render" + agentRecord.length)}</>
 // <>{agentRecord === "render" ?(console.log('no data')) : (console.log(agentRecord[0].agent_details.name))}</>
    // <Flex
    //   p={0}
    //   m={0}
    //   backgroundColor={COLORS.BACKGROUND}
    //   justifyContent="center"
    //   alignItems="center"
    //   height="100vh"
    //   width="calc(100vw - 200px)"
    //   ml='200px'
    //   mt={10}
    //   mb={10}
      
    // >
    //   <Container
    //     padding="40px 20px 20px 20px"
    //     bg={COLORS.FOREGROUND}
    //     maxW={900}
    //     height="100%"
    //     borderRadius={10}
    //   >
    //     <Stack direction="row" justifyContent="center">
    //       <Heading size="lg" color={COLORS.TEXT} marginBottom="20px">
    //         ROF
    //       </Heading>
    //     </Stack>
    //     <Heading size="md" color={COLORS.TEXT} marginBottom="40px">
    //       AGENT DETAILS:
    //     </Heading>
    //     <Stack direction="column" spacing={2}>
    //       <Stack direction="row" alignItems="center" spacing={2}>
    //         <TextDisplayRof
    //           label="AGENT NO.:"
    //           value={agentInfo[0].agent_details.number}
    //           customWidth="89px"
    //           customInputWidth="200"
    //           disabled={false}
    //           onChange={(e) => setAgentNumber(e.target.value)}
    //         />
    //         <Button
    //           w={20}
    //           borderRadius={4}
    //           height="28px"
    //           backgroundColor={COLORS.TEXT}
    //           fontSize="14px"
    //           //onClick={handleSearch}
    //         >
    //           Search
    //         </Button>
    //       </Stack>

    //       <TextDisplayRof
    //         label="AGENT NAME:"
    //         value={agentInfo[0].agent_details.name}
    //         disabled={disableInput}
    //       />
    //       <TextDisplayRof
    //         label="ADDRESS:"
    //         value={agentInfo[0].agent_details.adress}
    //         disabled={disableInput}
    //       />
    //       <TextDisplayRof label="CITY:" value={agentInfo[0].agent_details.city} disabled={disableInput} />
    //       <TextDisplayRof
    //         label="PROVINCE:"
    //         value={agentInfo[0].agent_details.province}
    //         disabled={disableInput}
    //       />
    //       <TextDisplayRof
    //         label="REGION:"
    //         value={agentInfo[0].agent_details.region}
    //         disabled={disableInput}
    //       />
    //       <TextDisplayRof label="ZIP:" value={zip} disabled={disableInput} />
    //     </Stack>
    //     <Heading
    //       size="md"
    //       color={COLORS.TEXT}
    //       marginBottom="20px"
    //       marginTop="40px"
    //     >
    //       COMMUNICATION DETAILS:
    //     </Heading>
    //     <Stack direction="column" spacing={2}>
    //       <HStack spacing={4}>
    //         <TextDisplayRof
    //           customWidth="130px"
    //           label="SIM1 IP:"
    //           value={agentInfo[0].sim_details[0].ip}
    //           disabled={disableInput}
    //         />
    //         <TextDisplayRof
    //           customWidth="50px"
    //           label="ICCID"
    //           value={agentInfo[0].sim_details[0].iccid}
    //           disabled={disableInput}
    //         />
    //         <TextDisplayRof
    //           customWidth="50px"
    //           label="CARRIER:"
    //           value={agentInfo[0].sim_details[0].carrier}
    //           disabled={disableInput}
    //         />
    //       </HStack>
    //       <HStack spacing={4}>
    //         <TextDisplayRof
    //           customWidth="130px"
    //           label="SIM2 IP:"
    //           value={agentInfo[0].sim_details[1].ip}
    //           disabled={disableInput}
    //         />
    //         <TextDisplayRof
    //           customWidth="50px"
    //           label="ICCID:"
    //           value={agentInfo[0].sim_details[1].iccid}
    //           disabled={disableInput}
    //         />
    //         <TextDisplayRof
    //           customWidth="50px"
    //           label="CARRIER:"
    //           value={agentInfo[0].sim_details[1].carrier}
    //           disabled={disableInput}
    //         />
    //       </HStack>
    //     </Stack>
    //     <Heading
    //       size="md"
    //       color={COLORS.TEXT}
    //       marginBottom="20px"
    //       marginTop="40px"
    //     >
    //       MODEM DETAILS:
    //     </Heading>
    //     <Stack direction="column" spacing={2}>
    //       <TextDisplayRof
    //         label="BRAND:"
    //         value={agentInfo[0].modem_details.modem_brand}
    //         disabled={disableInput}
    //       />
    //       <TextDisplayRof
    //         label="TYPE:"
    //         value={agentInfo[0].modem_details.modem_type}
    //         disabled={disableInput}
    //       />
    //       <TextDisplayRof
    //         label="SERIAL NO.:"
    //         value={agentInfo[0].modem_details.modem_sn}
    //         disabled={disableInput}
    //       />
    //     </Stack>
    //   </Container>
    // </Flex>
  
  
  )
}

export default AgentViewPage