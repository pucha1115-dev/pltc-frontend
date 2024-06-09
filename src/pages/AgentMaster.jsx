import React from 'react'
import {Flex, Container, Heading, Text, HStack, Stack, VStack } from "@chakra-ui/react";
import {COLORS} from '../constants'
import TextDisplay from '../components/TextDisplay';

const AgentMaster = () => {
  return (
  <Flex backgroundColor={COLORS.FOREGROUND} justifyContent="center" alignItems="center" height="100vh">
    <Container padding="20px" bg={COLORS.FOREGROUND} maxW={900} height="100vh">
      <Heading size="md" color={COLORS.TEXT} marginBottom="20px">AGENT DETAILS:</Heading>
      <Stack direction="column" spacing={2}>
      <TextDisplay label="AGENT NO.:" data="12345678" ></TextDisplay>
      <TextDisplay label="AGENT NAME:" data="GERALLA, JOHN PAUL A." ></TextDisplay>
      <TextDisplay label="ADDRESS:" data="NATALIO BACALSO NATIONAL HI-WAY, BRGY. ARBOR" ></TextDisplay>
      <TextDisplay label="CITY:" data="BOLJOON" ></TextDisplay>
      <TextDisplay label="PROVINCE:" data="CEBU" ></TextDisplay>
      <TextDisplay label="REGION:" data="07" ></TextDisplay>
      <TextDisplay label="ZIP:" data="6000" ></TextDisplay>
      </Stack>
      <Heading size="md" color={COLORS.TEXT} marginBottom="20px" marginTop="20px">COMMUNICATION DETAILS:</Heading>
      <Stack direction="column" spacing={2}>
        <HStack spacing={4}>
          <TextDisplay customWidth='165px' label="SIM1 IP:" data="10.0.0.1" ></TextDisplay>
          <TextDisplay customWidth='50px' label="ICCID:" data="1234567812345678" ></TextDisplay>
          <TextDisplay customWidth='50px' label="CARRIER:" data="SMART" ></TextDisplay>
        </HStack>
        <HStack spacing={4}>
          <TextDisplay customWidth='165px' label="SIM2 IP:" data="10.0.0.2" ></TextDisplay>
          <TextDisplay customWidth='50px' label="ICCID:" data="1234567812345678" ></TextDisplay>
          <TextDisplay customWidth='50px' label="CARRIER:" data="GLOBE" ></TextDisplay>
        </HStack>
      </Stack>
      <Heading size="md" color={COLORS.TEXT} marginBottom="20px" marginTop="20px">MODEM DETAILS:</Heading>
      <Stack direction="column" spacing={2}>
      <TextDisplay label="BRAND:" data="FOUR FAITH" ></TextDisplay>
      <TextDisplay label="TYPE:" data="DUAL SIM" ></TextDisplay>
      <TextDisplay label="SERIAL NO.:" data="FH12345678" ></TextDisplay>
      </Stack>
    </Container>
  </Flex>
  )
}

export default AgentMaster