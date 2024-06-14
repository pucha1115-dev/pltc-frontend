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
  Box,
  FormControl
} from "@chakra-ui/react";
import TableRowDisplaySim from "../components/TableRowDisplaySim";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

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
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue === "") {
      setFilteredSimList(simList);
      return;
    }

    
    const filterBySearch = simList.filter(
      (item) =>
        item.min_hp_number === searchValue ||
        item.iccid === searchValue ||
        item.carrier.toLowerCase() === searchValue.toLowerCase()  ||
        item.apn.toLowerCase() === searchValue.toLowerCase() ||
        item.status.toLowerCase() === searchValue.toLowerCase() ||
        item.username.toLowerCase() === searchValue.toLowerCase() ||
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
      padding="50px"
      width="calc(100vw - 200px)"
      flexDir="column"
      marginLeft="200px"
    > <FormControl>
      <Stack direction="row" mb={5} justifyContent='space-between'>
      <Box display='flex' justifyContent='center'>
        <Input
          size='sm'
          border={0}
          mr={2}
          backgroundColor='white'
          color='black'
          borderRadius={4}
          placeholder="Search..."
          w="280px"
          onChange={e => setSearchValue(e.target.value)}
        ></Input>
        <Button type="submit" size='sm' width='100px' backgroundColor={COLORS.TEXT} onClick={handleSearch}>Search</Button>
        </Box>
        <Button size='sm' bg='green' color='white' mr={5}><Link to='/sim'>Add SIM</Link></Button>
      </Stack>

     
      </FormControl>

      <TableContainer borderBottom="1px solid" width="100%" overflowY="scroll">
        <Table size="sm" variant="unstyled">
          <Thead
            position="sticky"
            top={0}
            backgroundColor="black"
            style={{ boxShadow: "inset 1px -1px  #c2c0f0, 1px -1px  #c2c0f0" }}
          >
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