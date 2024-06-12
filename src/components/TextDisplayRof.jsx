import React from 'react'
import { Text, HStack, Input } from "@chakra-ui/react";
import {COLORS} from '../constants'

const TextDisplayRof = ({label, value, customWidth="100px", customInputWidth="100%", disabled, onChange}) => {
  return (
    <HStack>
      <Text fontSize="12px" width={customWidth} color={COLORS.TEXT}>{label}</Text>
        <Input 
          textTransform='uppercase'
          disabled={disabled}
          padding="5px" 
          size='sm' 
          width={customInputWidth} 
          border={0}
          borderRadius="4px" 
          backgroundColor={COLORS.BACKGROUND} 
          color={COLORS.TEXT}
          placeholder={value}
          value={value}
          onChange={onChange}
          />
          
    
    </HStack>
  )
}

export default TextDisplayRof
