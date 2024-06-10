import {COLORS} from '../constants'
import {Table, TableContainer, Thead, Tr,Td, Th, Tbody, Flex} from '@chakra-ui/react'
import TableRowDisplay from '../components/TableRowDisplay'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AgentMasterList = ({setData}) => {
  const [agentList, setAgentList] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    getAgentList();
  }, [])

  const getAgentList = async () => {
    try{
      const response = await axios.get("http://localhost:8000/api/agent-infos/");
      if (response.status === 200){
        setAgentList(response.data)
        console.log(response.data)
      }
    } catch(error){}
  }

  const handleClick = (agent_info_id) => {
    setData(agent_info_id);
    navigate('/agent-info');
  }
  return (
    <Flex
        justifyContent="center"
        height="100vh"
        alignItems="start"
        backgroundColor={COLORS.BACKGROUND}
        padding='20px'
      >
    <TableContainer border='1px solid' width='70%'>
      <Table size='sm' variant='unstyled'>
        <Thead border='1px solid' color={COLORS.TEXT}>
          <Tr >
            <Th fontWeight='900' border='1px solid' >AGENT NO.</Th>
            <Th fontWeight='900' border='1px solid' >NAME</Th>
            <Th fontWeight='900' border='1px solid' >ADDRESS</Th>
            <Th fontWeight='900' border='1px solid' >CITY</Th>
            <Th fontWeight='900' border='1px solid' >PROVINCE</Th>
            <Th fontWeight='900' border='1px solid' >REGION</Th>
            <Th fontWeight='900' border='1px solid' >ZIP</Th>
          </Tr>
        </Thead>
        <Tbody >
          {agentList.map((agent, index) => (
            
            <TableRowDisplay key={index}
            iccid={agent.agent_details.number} 
            min_hp={agent.agent_details.name} 
            ip={agent.agent_details.address} 
            apn={agent.agent_details.city} 
            username={agent.agent_details.province} 
            password={agent.agent_details.region} 
            carrier='7000'
            onClick={handleClick(agent.id)}
            />
            
          ))}

        </Tbody>
      </Table>
    </TableContainer>
    </Flex>
  )
}

export default AgentMasterList