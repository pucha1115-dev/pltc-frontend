import { COLORS } from "../constants";
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Flex,
  Box,
  Text,
  FormControl,
  Stack,
  Input,
  Button,
  Select,
  Spinner,
} from "@chakra-ui/react";
import TableRowDisplayAgent from "../components/TableRowDisplayAgent";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdCallToAction } from "react-icons/md";

const AgentMasterList = () => {
  const [agentList, setAgentList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [count, setCount] = useState(0);
  const [pageCount, SetPageCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [previousPage, setPreviousPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [apiEndPoint, setApiEndPoint] = useState(
    "http://localhost:8000/api/agent-infos/"
  );

  useEffect(() => {
    getAgentList();
  }, [apiEndPoint]);

  const getAgentList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiEndPoint);
      if (response.status === 200) {
        setAgentList(response.data.results);
        setPreviousPage(response.data.previousPage);
        setNextPage(response.data.nextPage);
        SetPageCount(Math.ceil(response.data.count / 20)); // Corrected to Math.ceil to get the correct page count
        console.log(response.data.next);
        console.log(apiEndPoint);
        console.log(response.data.previous);

        console.log(nextPage);
        console.log(previousPage);

        if (searchValue !== "") {
          filterAgentList(response.data);
        } else {
          setCount(response.count);
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterAgentList = (list) => {
    const filteredList = list.filter(
      (item) =>
        item.agent_details.number
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()) ||
        item.agent_details.name
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()) ||
        item.agent_details.address
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()) ||
        item.agent_details.city
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()) ||
        item.agent_details.province
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()) ||
        item.agent_details.region
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()) ||
        item.agent_details.contact
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()) ||
        item.status.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
    setCount(filteredList.length);
  };

  const handleClick = (agent) => {
    const data = { agent: agent };
    navigate("/agent_view", { state: { data } });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue === "") {
      setCount(agentList.length);
    } else {
      filterAgentList(agentList);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Update currentPage when page is changed
    setApiEndPoint(`http://localhost:8000/api/agent-infos/?page=${pageNumber}`);
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
    >
      <FormControl>
        <form onSubmit={handleSearch}>
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
              >
                Search
              </Button>
              <Text ml={10} alignSelf="flex-end">
                Records Found: {count}
              </Text>
            </Box>
          </Stack>
        </form>
      </FormControl>
      <TableContainer
        borderBottom="1px solid"
        borderLeft="1px solid"
        borderTop="1px solid"
        width="100%"
        overflowY="scroll"
      >
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
                AGENT NO.
              </Th>
              <Th fontWeight="900" border="1px solid">
                NAME
              </Th>
              <Th fontWeight="900" w="200px" border="1px solid">
                ADDRESS
              </Th>
              <Th fontWeight="900" border="1px solid">
                CITY
              </Th>
              <Th fontWeight="900" border="1px solid">
                PROVINCE
              </Th>
              <Th fontWeight="900" border="1px solid">
                REGION
              </Th>
              <Th fontWeight="900" border="1px solid">
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {agentList.map((agent, index) => (
              <TableRowDisplayAgent
                key={index}
                agentNumber={agent.agent_details.number}
                agentName={agent.agent_details.name}
                address={agent.agent_details.address}
                city={agent.agent_details.city}
                province={agent.agent_details.province}
                region={agent.agent_details.region}
                status={agent.status}
                onClick={() => handleClick(agent)}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {loading ? (
        <Box
          display="flex"
          w="100%"
          justifyContent="center"
          mt="10px"
          mb="10px"
        >
          <Spinner alignSelf="center" color="red" />
        </Box>
      ) : (
        <Box
          display="flex"
          w="100%"
          justifyContent="center"
          mt="10px"
          mb="10px"
        >
          <Spinner alignSelf="center" color="transparent" />
        </Box>
      )}
      <Stack direction="row" alignItems="end" justifyContent="center">
        <Button
          bg={COLORS.ACCENT}
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1 || currentPage === 0}
        >
          Previous
        </Button>
        <Select
          value={currentPage}
          onChange={(e) =>
            handlePageChange(
              parseInt(e.target.value),
              `http://localhost:8000/api/agent-infos/?page=${e.target.value}`
            )
          }
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
          isDisabled={currentPage === parseInt(pageCount) || currentPage === 0}
        >
          Next
        </Button>
      </Stack>
    </Flex>
  );
};

export default AgentMasterList;
