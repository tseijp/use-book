import styled from 'styled-components';
import useThemeContext from '@theme/hooks/useThemeContext';

export function withDarkAttrs <Props> (props: Props): Props

export function withDarkAttrs (props: any) {
    const { isDarkTheme } = useThemeContext()
    return {isDarkTheme, ...props}
}

export type FlexProps = {
  $row?: boolean
  $wrap?: boolean
  isDarkTheme: boolean
}

export const Flex = styled.div.attrs(withDarkAttrs)<FlexProps>`
  display: flex;
  width: 100%;
  margin: auto;
  align-items: center;
  justify-content: center;
  ${({$row}) => `flex-direction: ${$row? "row": "column"};`}
  ${({$wrap}) => $wrap && `flex-wrap: wrap;`}
`
