import React from 'react'
import { Text, HStack } from "@chakra-ui/react";
import {COLORS} from '../constants'

const TextDisplay = ({label, data, customWidth="100px"}) => {
  return (
    <HStack><Text fontSize="12px" width={customWidth} color={COLORS.TEXT}>{label}</Text><Text padding="5px" fontSize="12px" width="100%" borderRadius="4px" backgroundColor={COLORS.BACKGROUND} color={COLORS.TEXT}>{data}</Text></HStack>
  )
}

export default TextDisplay;