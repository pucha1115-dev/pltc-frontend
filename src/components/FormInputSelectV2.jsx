/* eslint-disable react/prop-types */

import { Box, FormLabel, Select } from "@chakra-ui/react";
import { COLORS } from "../constants";
import { css } from "@emotion/react";

const FormInputSelectV2 = ({
  label,
  name,
  value,
  type = "text",
  placeholder,
  width = "auto",
  onChange,
  choices = [],
}) => {
  return (
    <Box width={width}>
      <FormLabel style={{ color: COLORS.TEXT, fontSize: "14px" }}>
        {label}
      </FormLabel>
      <Select
        size="sm"
        borderRadius={5}
        bg={COLORS.BACKGROUND}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        backgroundColor={COLORS.BACKGROUND}
        color={COLORS.TEXT}
        borderColor={COLORS.FOREGROUND}
        css={css`
          option {
            background-color: ${COLORS.BACKGROUND};
            color: ${COLORS.TEXT};
          }
          option:hover {
            background-color: ${COLORS.HOVER};
          }
        `}
      >
        {" "}
        {choices.map((item, index) => {
          return <option key={index}>{item}</option>;
        })}
      </Select>
    </Box>
  );
};

export default FormInputSelectV2;
