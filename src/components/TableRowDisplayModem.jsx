/* eslint-disable react/prop-types */
import { Tr, Td } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";


const TableRowDisplayModem = ({
  sn,
  brand,
  type,
  owner,
  remarks,
  onClick,
}) => {
  return (
   
    <Tr border="1px solid" >
      <Td border="1px solid" onClick={onClick} cursor="pointer">
        <FiEdit color="green" />
      </Td>
      <Td border="1px solid">{sn}</Td>
      <Td border="1px solid">{type}</Td>
      <Td border="1px solid">{brand}</Td>
      <Td border="1px solid">{owner}</Td>
      <Td border="1px solid">{remarks}</Td>
    </Tr>
  );
};

export default TableRowDisplayModem;
