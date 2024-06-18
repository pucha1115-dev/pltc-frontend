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
import TableRowDisplayModem from "../components/TableRowDisplayModem";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";


const ModemMasterList = () => {
  const [modemList, setModemList] = useState([]);
  const [filteredModemList, setFilteredModemList] = useState(modemList);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getModemList();
  }, []);

  const getModemList = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/modems/");
      if (response.status === 200) {
        setModemList(response.data);
        setFilteredModemList(response.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleModemClick = (sim) => {
    const data = {sim: sim}
    navigate('/modem',{state:{data}})

  } 

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue === "") {
      setFilteredModemList(modemList);
      return;
    }

    
    const filterBySearch = modemList.filter(
      (item) =>
        item.sn.toLowerCase() === searchValue.toLowerCase() ||
        item.brand.toLowerCase() === searchValue.toLowerCase() ||
        item.type.toLowerCase() === searchValue.toLowerCase()

    );
    setFilteredModemList(filterBySearch);
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
        <Button size='sm' bg='green' color='white' mr={5}><Link to='/modem'>Add SIM</Link></Button>
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
                SERIAL NUMBER
              </Th>
              <Th fontWeight="900" border="1px solid">
                TYPE
              </Th>
              <Th fontWeight="900" border="1px solid">
                BRAND
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredModemList.map((modem, index) => (
              <TableRowDisplayModem
              key={index}
              sn={modem.sn}
              brand={modem.brand}
              type={modem.type}
              onClick={() => handleModemClick(modem)}
            />
              
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ModemMasterList;