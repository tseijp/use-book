import styled from "styled-components";
import { Flex, FlexProps } from "./Flex"

export type ContentProps = FlexProps

export const Content = styled(Flex)`
  max-width: 1100px;
  font-size: 1.7rem;
  text-align: left;
  min-height: 20rem;
  padding: 2rem; 1rem;
  > h3 {
    font-size: 2.5rem;
    border-left: solid 0.5rem;
    padding-left: 0.5rem;
  }
`
