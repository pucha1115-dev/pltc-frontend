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
  Text,
  FormControl,
  Select,
  Spinner,
} from "@chakra-ui/react";
import TableRowDisplayModem from "../components/TableRowDisplayModem";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdCallToAction } from "react-icons/md";

const ModemMasterList = () => {
  const [modemList, setModemList] = useState([]);
  const [filteredModemList, setFilteredModemList] = useState(modemList);
  const [searchValue, setSearchValue] = useState("");
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Adjust items per page as needed
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getModemList();
  }, [currentPage]);

  const getModemList = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/modems/");
      if (response.status === 200) {
        const data = response.data;
        setModemList(data);
        if (searchValue !== "") {
          filterModemList(data);
          setLoading(false);
        } else {
          setFilteredModemList(data);
          setCount(data.length);
          setLoading(false);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleModemClick = (modem) => {
    const data = { modem: modem };
    navigate("/modem_update", { state: { data } });
  };

  const filterModemList = (list) => {
    const filterBySearch = list.filter(
      (item) =>
        item.modem_sn.toLowerCase() === searchValue.toLowerCase().trim() ||
        item.modem_brand.toLowerCase() === searchValue.toLowerCase().trim() ||
        item.modem_type.toLowerCase() === searchValue.toLowerCase().trim() ||
        item.modem_owner.toLowerCase() === searchValue.toLowerCase().trim()
    );
    setFilteredModemList(filterBySearch);
    setCount(filterBySearch.length);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    if (searchValue === "") {
      setFilteredModemList(modemList);
      setCount(modemList.length);
    } else {
      filterModemList(modemList);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Update currentPage when page is changed
  };

  // Calculate current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredModemList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate total number of pages
  const pageCount = Math.ceil(filteredModemList.length / itemsPerPage);

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
    >
      {" "}
      <FormControl>
        <form>
          <Stack direction="row" mb={5} justifyContent="space-between">
            <Box display="flex" justifyContent="center">
              <Input
                size="sm"
                border={0}
                mr={2}
                backgroundColor="white"
                color="black"
                borderRadius={4}
                placeholder="Search..."
                w="280px"
                onChange={(e) => setSearchValue(e.target.value)}
              ></Input>
              <Button
                type="submit"
                size="sm"
                width="100px"
                backgroundColor={COLORS.TEXT}
                onClick={handleSearch}
              >
                Search
              </Button>
              <Text ml={10} alignSelf="flex-end">
                Records Found: {count}
              </Text>
            </Box>
            <Button size="sm" bg="green" color="white" mr={5}>
              <Link to="/modem">Add Modem</Link>
            </Button>
          </Stack>
        </form>
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
              <Th fontWeight="900" w="50px" border="1px solid">
                <MdCallToAction />
              </Th>
              <Th fontWeight="900" border="1px solid">
                SERIAL NUMBER
              </Th>
              <Th fontWeight="900" border="1px solid">
                TYPE
              </Th>
              <Th fontWeight="900" border="1px solid">
                BRAND
              </Th>
              <Th fontWeight="900" border="1px solid">
                OWNER
              </Th>
              <Th fontWeight="900" border="1px solid">
                REMARKS
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((modem, index) => (
              <TableRowDisplayModem
                key={index}
                sn={modem.modem_sn}
                brand={modem.modem_brand}
                type={modem.modem_type}
                owner={modem.modem_owner}
                remarks={modem.modem_remarks}
                onClick={() => handleModemClick(modem)}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {loading && (
        <Box
          display="flex"
          w="100%"
          justifyContent="center"
          mt="10px"
          mb="10px"
        >
          <Spinner alignSelf="center" color="red" />
        </Box>
      )}
      <Stack direction="row" alignItems="end" justifyContent="center" mt={4}>
        <Button
          bg={COLORS.ACCENT}
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Select
          value={currentPage}
          onChange={(e) => handlePageChange(parseInt(e.target.value))}
          size="sm"
          width="80px"
          bg="white"
          color="black"
          border={0}
        >
          {Array.from({ length: pageCount }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
        <Button
          bg={COLORS.ACCENT}
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === pageCount || currentPage === 0}
        >
          Next
        </Button>
      </Stack>
    </Flex>
  );
};

export default ModemMasterList;
