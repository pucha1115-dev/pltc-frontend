/* eslint-disable react/prop-types */
import { Tr, Td } from "@chakra-ui/react";

const TableRowDisplayAgent = ({
  agentNumber,
  agentName,
  address,
  city,
  province,
  region,
  zip,
  onClick,
}) => {
  return (
    <Tr border="1px solid" onClick={onClick}>
      <Td border="1px solid">{agentNumber}</Td>
      <Td border="1px solid">{agentName}</Td>
      <Td border="1px solid">{address}</Td>
      <Td border="1px solid">{city}</Td>
      <Td border="1px solid">{province}</Td>
      <Td border="1px solid">{region}</Td>
      <Td border="1px solid">{zip}</Td>
    </Tr>
  );
};

export default TableRowDisplayAgent;
