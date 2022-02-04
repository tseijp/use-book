import styled, { css } from "styled-components";
import { Flex, FlexProps } from "./Flex"

export type ContainerProps = FlexProps & {
  $gray?: boolean
}

export const Container = styled(Flex)<ContainerProps>`
  width: 100%
  margin: 0px;
  text-align: center;
  padding: auto 1rem;
  ${({ isDarkTheme, $gray }) => $gray && css`
    background: ${isDarkTheme? "#212121": "#efefef"};
  `}
`
