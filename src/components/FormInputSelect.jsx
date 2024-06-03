/* eslint-disable react/prop-types */

import { Select, Box, FormLabel, HStack } from "@chakra-ui/react";
import { COLORS } from "../constants";
import { css } from "@emotion/react";

const FormInputSelect = ({
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
      <HStack>
        <FormLabel
          style={{ color: COLORS.TEXT, fontSize: "14px" }}
          width="130px"
          padding={0}
          margin={0}
        >
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
      </HStack>
    </Box>
  );
};

export default FormInputSelect;
