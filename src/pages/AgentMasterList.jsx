import { COLORS } from "../constants";
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Flex,
} from "@chakra-ui/react";
import TableRowDisplayAgent from "../components/TableRowDisplayAgent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AgentMasterList = () => {
  const [agentList, setAgentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAgentList();
  }, []);

  const getAgentList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/agent-infos/"
      );
      if (response.status === 200) {
        setAgentList(response.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleClick = (agent_info_agent_number) => {
    const data = { agentNumber: agent_info_agent_number };
    navigate("/agent_info", { state: { data } });
  };
  return (
    <Flex
      justifyContent="center"
      height="100vh"
      width="100vw"
      alignItems="start"
      backgroundColor={COLORS.BACKGROUND}
      padding="20px"
    >
      <TableContainer border="1px solid" width="70%">
        <Table size="sm" variant="unstyled">
          <Thead border="1px solid" color={COLORS.TEXT}>
            <Tr>
              <Th fontWeight="900" border="1px solid">
                AGENT NO.
              </Th>
              <Th fontWeight="900" border="1px solid">
                NAME
              </Th>
              <Th fontWeight="900" border="1px solid">
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
                ZIP
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
                zip="7000"
                onClick={() => handleClick(agent.agent_details.number)}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default AgentMasterList;
