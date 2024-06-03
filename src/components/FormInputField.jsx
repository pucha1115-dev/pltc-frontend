/* eslint-disable react/prop-types */

import { Input, Box, FormLabel } from "@chakra-ui/react";
import { COLORS } from "../constants";

const FormInputField = ({
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
      <FormLabel style={{ color: COLORS.TEXT, fontSize: "14px" }}>
        {label}
      </FormLabel>
      <Input
        borderRadius={5}
        size="sm"
        type={type}
        name={name}
        value={value.toUpperCase()}
        onChange={onChange}
        placeholder={placeholder}
        backgroundColor={COLORS.BACKGROUND}
        color={COLORS.TEXT}
        borderColor={COLORS.FOREGROUND}
      ></Input>
    </Box>
  );
};

export default FormInputField;
