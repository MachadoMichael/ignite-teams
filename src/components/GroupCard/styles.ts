import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { UsersThree } from "phosphor-react-native";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 90px;
  padding: 24px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;

export const DisplayPlayersInGroup = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_200};
  `};
`;

export const BoxDisplay = styled.View`
  flex: 1;
  align-items: flex-end;
`;

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  size: 32,
  weight: "fill",
  color: theme.COLORS.GREEN_700,
}))`
  margin-right: 20px;
`;
