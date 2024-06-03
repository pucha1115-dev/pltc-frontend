/* eslint-disable react/prop-types */

import { Input, Box, FormLabel, HStack } from "@chakra-ui/react";
import { COLORS } from "../constants";

const FormInputFieldSide = ({
  label,
  name,
  value,
  type = "text",
  placeholder,
  width = "auto",
  onChange,
}) => {
  return (
    <Box width={width}>
      <HStack align="center" spacing={4}>
        <FormLabel
          style={{ color: COLORS.TEXT, fontSize: "14px" }}
          width="120px"
          padding={0}
          margin={0}
        >
          {label}
        </FormLabel>
        <Input
          borderRadius={5}
          size="sm"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          backgroundColor={COLORS.BACKGROUND}
          color={COLORS.TEXT}
          borderColor={COLORS.FOREGROUND}
        ></Input>
      </HStack>
    </Box>
  );
};

export default FormInputFieldSide;
