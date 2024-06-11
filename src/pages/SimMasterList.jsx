import {COLORS} from '../constants'
import {Table, TableContainer, Thead, Tr,Td, Th, Tbody, Flex} from '@chakra-ui/react'
import TableRowDisplay from '../components/TableRowDisplay'
import { useEffect, useState } from 'react'
import axios from 'axios'

const SimMasterList =  () => {
  const [simList, setSimList] = useState([])

  useEffect(()=>{
    getSimList();
  }, [])

  const getSimList = async () => {
    try{
      const response = await axios.get("http://localhost:8000/api/sims/");
      if (response.status === 200){
        setSimList(response.data)
        console.log(response.data)
      }
    } catch(error){}
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
        <Thead border='1px solid' >
          <Tr >
            <Th fontWeight='900' border='1px solid' >ICCID</Th>
            <Th fontWeight='900' border='1px solid' >MIN/HP</Th>
            <Th fontWeight='900' border='1px solid' >IP ADDRESS</Th>
            <Th fontWeight='900' border='1px solid' >APN</Th>
            <Th fontWeight='900' border='1px solid' >USERNAME</Th>
            <Th fontWeight='900' border='1px solid' >PASSWORD</Th>
            <Th fontWeight='900' border='1px solid' >CARRIER</Th>
          </Tr>
        </Thead>
        <Tbody >
          {simList.map((sim, index) => (
            <TableRowDisplay key={index}
            iccid={sim.iccid} 
            min_hp={sim.min_hp_number} 
            ip={sim.ip} 
            apn={sim.apn} 
            username={sim.username} 
            password={sim.password} 
            carrier={sim.carrier}/>
          ))}

        </Tbody>
      </Table>
    </TableContainer>
    </Flex>
  )
}

export default SimMasterList