import { useState, useEffect } from "react";
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
  Text
} from "@chakra-ui/react";
import { COLORS } from "../constants";
import axios from "axios";
import FormInputSelect from "../components/FormInputSelect";
import UploadModemCsv from './UploadModemCsv'

const Modem = () => {
  const [modemSN, setModemSN] = useState("");
  const [modemBrand, setModemBrand] = useState("");
  const [modemType, setModemType] = useState("");
  const [modemOwner, setModemOwner] = useState("");
  const [modemRemarks, setModemRemarks] = useState("")

  const postData = {
    modem_sn: modemSN.toUpperCase(),
    modem_brand: modemBrand.toUpperCase(),
    modem_type: modemType.toUpperCase(),
    modem_owner: modemOwner.toUpperCase(),
    modem_remarks: modemRemarks.toUpperCase(),
  };

  return (
    <>
      <Flex
        justifyContent="center"
        height="100vh"
        alignItems="center"
        width='calc(100vw - 200px)'
        ml='200px'
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
                <FormInputSelect
                  label="BRAND"
                  name="modem-brand"
                  value={modemBrand}
                  placeholder="------"
                  onChange={(e) => setModemBrand(e.target.value)}
                  choices={["FOUR-FAITH", "HUAWEI", "VECTRAS"]}
                ></FormInputSelect>
                <FormInputSelect
                  label="TYPE"
                  name="modem-type"
                  value={modemType}
                  placeholder="------"
                  onChange={(e) => setModemType(e.target.value)}
                  choices={["SINGLE SIM", "DUAL SIM"]}
                ></FormInputSelect>
                <FormInputFieldSide
                  label="SERIAL NO."
                  name="modem-sn"
                  value={modemSN}
                  placeholder=""
                  onChange={(e) => setModemSN(e.target.value)}
                ></FormInputFieldSide>
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
              <Button
                marginTop={8}
                marginBottom={2}
                backgroundColor={COLORS.ACCENT}
              
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
              <UploadModemCsv></UploadModemCsv>
              </Stack>
            </Stack>
          </FormControl>
        </Container>
      </Flex>
    </>
  );
};

export default Modem;
