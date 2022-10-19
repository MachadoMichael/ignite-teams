import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

export const Container = styled(TextInput)`
  flex: 1;
  padding: 16px;
  min-width: 56px;
  max-height: 56px;
  border-radius: 6px;
  
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    background-color: ${theme.COLORS.GRAY_700};
  `}
`;
