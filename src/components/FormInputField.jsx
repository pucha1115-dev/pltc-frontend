import React from 'react'
import {Input, Box, FormLabel} from '@chakra-ui/react'
import {COLORS} from '../constants'

const FormInputField = ({label, name, value, type='text', placeholder, width = "auto", p=0, onChange}) => {
  return (
    <Box p={p} width={width}>
    <FormLabel color={COLORS.TEXT}>{label}</FormLabel>
    <Input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} backgroundColor={COLORS.BACKGROUND} color={COLORS.TEXT} borderColor={COLORS.FOREGROUND}></Input>
    </Box>
  )
}

export default FormInputField