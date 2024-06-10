/* eslint-disable react/prop-types */
import { Tr, Td } from "@chakra-ui/react";
import { COLORS } from "../constants";

const TableRowDisplay = ({
  iccid,
  min_hp,
  ip,
  apn,
  username,
  password,
  carrier,
  onClick,
}) => {
  return (
    <Tr border="1px solid" color={COLORS.TEXT} onClick={onClick}>
      <Td border="1px solid">{iccid}</Td>
      <Td border="1px solid">{min_hp}</Td>
      <Td border="1px solid">{ip}</Td>
      <Td border="1px solid">{apn}</Td>
      <Td border="1px solid">{username}</Td>
      <Td border="1px solid">{password}</Td>
      <Td border="1px solid">{carrier}</Td>
    </Tr>
  );
};

export default TableRowDisplay;
