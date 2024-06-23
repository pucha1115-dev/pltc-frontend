/* eslint-disable react/prop-types */
import { Tr, Td } from "@chakra-ui/react";
import { RiListView } from "react-icons/ri";

const TableRowDisplayAgent = ({
  agentNumber,
  agentName,
  address,
  city,
  province,
  region,
  status,
  onClick,
}) => {
  return (
    <Tr border="1px solid">
      <Td border="1px solid" onClick={onClick} cursor="pointer">
        <RiListView color="green" />
      </Td>
      <Td border="1px solid">{agentNumber}</Td>
      <Td border="1px solid">{agentName}</Td>
      <Td border="1px solid">{address}</Td>
      <Td border="1px solid">{city}</Td>
      <Td border="1px solid">{province}</Td>
      <Td border="1px solid">{region}</Td>
      <Td border="1px solid">{status}</Td>
    </Tr>
  );
};

export default TableRowDisplayAgent;
