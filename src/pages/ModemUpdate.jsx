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
import FormInputSelect from "../components/FormInputSelect";
import { useLocation } from "react-router-dom";

const ModemUpdate = () => {
  const [modemSN, setModemSN] = useState("");
  const [modemBrand, setModemBrand] = useState("");
  const [modemType, setModemType] = useState("");
  const [modemOwner, setModemOwner] = useState("");
  const [modemRemarks, setModemRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const [retrievedModemData, setRetrievedModemData] = useState(
    location.state || {}
  );

  useEffect(() => {
    const populate = () => {
      setModemSN(retrievedModemData.data.modem.modem_sn);
      setModemBrand(retrievedModemData.data.modem.modem_brand);
      setModemType(retrievedModemData.data.modem.modem_type);
      setModemOwner(retrievedModemData.data.modem.modem_owner);
      setModemRemarks(retrievedModemData.data.modem.modem_remarks);
    };
    populate();
  }, [retrievedModemData]);

  const postData = {
    modem_sn: modemSN.toUpperCase(),
    modem_brand: modemBrand.toUpperCase(),
    modem_type: modemType.toUpperCase(),
    modem_owner: modemOwner.toUpperCase(),
    modem_remarks: modemRemarks.toUpperCase(),
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
     
      const response = await axios.patch(
        `http://localhost:8000/api/modems/${retrievedModemData.data.modem.id}/`,
        postData
      );
      if (response.status === 200) {
        alert("Modem added successfuly.");
        setLoading(false);
        setRetrievedModemData({ data: { modem: response.data } });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const error_response =
          error.response.data.detail || JSON.stringify(error.response.data); //get the error response data/details
        const errorData = JSON.parse(error_response); //parse to json

        const errorField = Object.keys(errorData)[0]; // retrieve the field with error
        const errorMessage = errorData[errorField][0]; // retrieve the error of the filed

        alert(errorField.toUpperCase() + " : " + errorMessage); // Set the error message
        setLoading(false);
      } else {
        alert({ detail: "An unexpected error occurred" });
        setLoading(false);
      }
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
            Modem Details
          </Heading>
          <FormControl>
            <form>
              <Stack spacing={4}>
                <Stack spacing={4} direction="column">
                  <FormInputFieldSide
                    label="SERIAL NO."
                    name="modem-sn"
                    value={modemSN}
                    placeholder=""
                    onChange={(e) => setModemSN(e.target.value)}
                  ></FormInputFieldSide>
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
                {loading ? (
                  <Button
                    isLoading
                    marginTop={8}
                    marginBottom={2}
                    backgroundColor={COLORS.ACCENT}
                    onClick={handleSubmit}
                  >
                    UPDATE
                  </Button>
                ) : (
                  <Button
                    marginTop={8}
                    marginBottom={2}
                    backgroundColor={COLORS.ACCENT}
                    onClick={handleSubmit}
                  >
                    UPDATE
                  </Button>
                )}
              </Stack>
            </form>
          </FormControl>
        </Container>
      </Flex>
    </>
  );
};

export default ModemUpdate;
