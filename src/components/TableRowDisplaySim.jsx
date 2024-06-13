/* eslint-disable react/prop-types */
import { Tr, Td } from "@chakra-ui/react";


const TableRowDisplaySim = ({
  iccid,
  min_hp,
  ip,
  apn,
  username,
  password,
  carrier,
  status,
  onClick,
}) => {
  return (
    <Tr border="1px solid" onClick={onClick}>
      <Td border="1px solid">{iccid}</Td>
      <Td border="1px solid">{min_hp}</Td>
      <Td border="1px solid">{ip}</Td>
      <Td border="1px solid">{apn}</Td>
      <Td border="1px solid">{username}</Td>
      <Td border="1px solid">{password}</Td>
      <Td border="1px solid">{carrier}</Td>
      <Td border="1px solid">{status}</Td>
    </Tr>
  );
};

export default TableRowDisplaySim;
