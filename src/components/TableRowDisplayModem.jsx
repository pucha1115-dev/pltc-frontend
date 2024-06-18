/* eslint-disable react/prop-types */
import { Tr, Td } from "@chakra-ui/react";


const TableRowDisplayModem = ({
  sn,
  brand,
  type,
  onClick,
}) => {
  return (
    <Tr border="1px solid" onClick={onClick} cursor='pointer'>
      <Td border="1px solid">{sn}</Td>
      <Td border="1px solid">{type}</Td>
      <Td border="1px solid">{brand}</Td>
     
    </Tr>
  );
};

export default TableRowDisplayModem;
