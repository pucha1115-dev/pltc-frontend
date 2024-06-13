import { COLORS } from "../constants";
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Flex,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import TableRowDisplaySim from "../components/TableRowDisplaySim";
import { useEffect, useState } from "react";
import axios from "axios";
import UploadSimCsv from "./UploadSimCsv";

const SimMasterList = () => {
  const [simList, setSimList] = useState([]);
  const [filteredSimList, setFilteredSimList] = useState(simList);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getSimList();
  }, []);

  const getSimList = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sims/");
      if (response.status === 200) {
        setSimList(response.data);
        setFilteredSimList(response.data);
        console.log(response.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSearch = () => {
    if (searchValue === "") {
      setFilteredSimList(simList);
      return;
    }
    const filterBySearch = simList.filter(
      (item) =>
        item.min_hp_number === searchValue ||
        item.iccid === searchValue ||
        item.carrier.toLowerCase() === searchValue ||
        item.apn.toLowerCase() === searchValue ||
        item.status.toLowerCase() === searchValue ||
        item.username.toLowerCase() === searchValue ||
        item.ip === searchValue
    );
    setFilteredSimList(filterBySearch);
  };

  return (
    <Flex
      justifyContent="flex-start"
      height="100vh"
      alignItems="flex-start"
      backgroundColor={COLORS.BACKGROUND}
      padding="20px"
      width="calc(100vw - 200px)"
      flexDir="column"
      marginLeft="200px"
    >
      <Stack direction="row" mb={5}>
        <Input
          w="200px"
          onChange={(e) => setSearchValue(e.target.value)}
        ></Input>
        <Button onClick={handleSearch}>Search</Button>
        <UploadSimCsv></UploadSimCsv>
      </Stack>

      <TableContainer border="1px solid" width="100%" overflowY="scroll">
        <Table size="sm" variant="unstyled">
          <Thead position="sticky" top={-0.1} backgroundColor="black">
            <Tr>
              <Th fontWeight="900" border="1px solid">
                ICCID
              </Th>
              <Th fontWeight="900" border="1px solid">
                MIN/HP
              </Th>
              <Th fontWeight="900" border="1px solid">
                IP ADDRESS
              </Th>
              <Th fontWeight="900" border="1px solid">
                APN
              </Th>
              <Th fontWeight="900" border="1px solid">
                USERNAME
              </Th>
              <Th fontWeight="900" border="1px solid">
                PASSWORD
              </Th>
              <Th fontWeight="900" border="1px solid">
                CARRIER
              </Th>
              <Th fontWeight="900" border="1px solid">
                STATUS
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredSimList.map((sim, index) => (
              <TableRowDisplaySim
                key={index}
                iccid={sim.iccid}
                min_hp={sim.min_hp_number}
                ip={sim.ip}
                apn={sim.apn}
                username={sim.username}
                password={sim.password}
                carrier={sim.carrier}
                status={sim.status}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default SimMasterList;
