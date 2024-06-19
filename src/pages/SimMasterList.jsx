import { useState, useEffect } from "react";
import axios from "axios";
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
  FormControl,
  Text,
  Select,
} from "@chakra-ui/react";
import TableRowDisplaySim from "../components/TableRowDisplaySim";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdCallToAction } from "react-icons/md";

const SimMasterList = () => {
  const [simList, setSimList] = useState([]);
  const [filteredSimList, setFilteredSimList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Adjust items per page as needed
  const [totalRecords, setTotalRecords] = useState(0); // Total number of records
  const navigate = useNavigate();

  useEffect(() => {
    getSimList();
  }, [currentPage]); // Fetch data when currentPage changes

  const getSimList = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/sims/`);
      if (response.status === 200) {
        const data = response.data;
        setSimList(data); // Set simList with fetched data
        if (searchValue !== "") {
          // If there's a search value, filter simList
          filterSimList(data);
        } else {
          // Otherwise, set filteredSimList to the entire simList
          setFilteredSimList(data);
          setTotalRecords(data.length);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const filterSimList = (list) => {
    const filterBySearch = list.filter(
      (item) =>
        item.min_hp_number === searchValue ||
        item.iccid === searchValue ||
        item.carrier.toLowerCase() === searchValue.toLowerCase() ||
        item.apn.toLowerCase() === searchValue.toLowerCase() ||
        item.status.toLowerCase() === searchValue.toLowerCase() ||
        item.username.toLowerCase() === searchValue.toLowerCase() ||
        item.ip === searchValue
    );
    setFilteredSimList(filterBySearch); // Update filteredSimList based on search criteria
    setTotalRecords(filterBySearch.length);
  };

  const handleSimClick = (sim) => {
    const data = { sim: sim };
    navigate("/sim_update", { state: { data } });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    if (searchValue === "") {
      // If searchValue is empty, reset to show all simList
      setFilteredSimList(simList);
      setTotalRecords(simList.length);
    } else {
      // Filter simList based on search criteria
      filterSimList(simList);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Update currentPage when page is changed
  };

  // Calculate current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSimList.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages
  const pageCount = Math.ceil(filteredSimList.length / itemsPerPage);

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
      <FormControl>
        <form onSubmit={handleSearch}>
          <Stack direction="row" mb={5} justifyContent="space-between">
            <Box display="flex" justifyContent="">
              <Input
                size="sm"
                border={0}
                mr={2}
                backgroundColor="white"
                color="black"
                borderRadius={4}
                placeholder="Search..."
                w="280px"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button
                type="submit"
                size="sm"
                width="100px"
                backgroundColor={COLORS.TEXT}
              >
                Search
              </Button>
              <Text ml={10} alignSelf="flex-end">
                Records Found: {totalRecords}
              </Text>
            </Box>
            <Button size="sm" bg="green" color="white" mr={5}>
              <Link to="/sim_create">Add SIM</Link>
            </Button>
          </Stack>
        </form>
      </FormControl>
      <TableContainer borderBottom="1px solid" width="100%">
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
            {currentItems.map((sim, index) => (
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
                onClick={() => handleSimClick(sim)}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Stack direction="row" alignItems="end" justifyContent="center" mt={4}>
        <Button
          bg={COLORS.ACCENT}
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
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
          disabled={currentPage === pageCount || pageCount === 0}
        >
          Next
        </Button>
      </Stack>
    </Flex>
  );
};

export default SimMasterList;
