import React from 'react'
import { Text, HStack, Input } from "@chakra-ui/react";
import {COLORS} from '../constants'

const TextDisplayAgentInfo = ({label, value, customWidth="100px", customInputWidth="100%",}) => {
  return (
    <HStack>
      <Text fontSize="12px" width={customWidth} color={COLORS.TEXT}>{label}</Text>
        <Text 
          textTransform='uppercase'
          padding="5px" 
          size='sm' 
          width={customInputWidth} 
          border={0}
          borderRadius="4px" 
          backgroundColor={COLORS.BACKGROUND} 
          color={COLORS.TEXT}
          >
        {value}
          </Text>
    
    </HStack>
  )
}

export default TextDisplayAgentInfo
