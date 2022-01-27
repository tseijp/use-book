import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import { Book } from '@site/components/Book'
import { Slider } from '@site/components/Slider'
import useThemeContext from '@theme/hooks/useThemeContext';
import GitHubButton from 'react-github-btn';
import styled, { css } from 'styled-components';

export function withDarkAttrs <Props> (props: Props): Props

export function withDarkAttrs (props: any) {
    const { isDarkTheme } = useThemeContext()
    return {isDarkTheme, ...props}
}

const items = [4041013380,4041002877,4041315220,4041067944,4041366054,4041245257];  //角川 true

type FlexProps = {
  $row?: boolean
  $wrap?: boolean
  isDarkTheme: boolean
}

const Flex = styled.div.attrs(withDarkAttrs)<FlexProps>`
  display: flex;
  width: 100%;
  margin: auto;
  align-items: center;
  justify-content: center;
  ${({$row}) => !$row && `flex-direction: column;`}
  ${({$wrap}) => $wrap && `flex-wrap: wrap;`}
`

/**
 * Interactive
 */
const TwiiterFollowButton = styled.a`
  display: inline-block;
  position: relative;
  height: 28px;
  box-sizing: border-box;
  padding: 1px 10px 1px 9px;
  background-color: #1b95e0;
  color: #fff;
  border-radius: 4px;
  font-weight: 400;
  cursor: pointer;
  font-size: 13px;
  line-height: 26px;
  text-decoration: none;
  :hover {
    color: #fff;
    background-color: #0c7abf;
    text-decoration: none;
  `

const TwitterFollowIcon = styled.div`
  position: relative;
  display: inline-block;
  top: 4px;
  height: 18px;
  width: 18px;
  margin-right: 4px;
  background: transparent 0 0 no-repeat;
  background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2072%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h72v72H0z%22%2F%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23fff%22%20d%3D%22M68.812%2015.14c-2.348%201.04-4.87%201.744-7.52%202.06%202.704-1.62%204.78-4.186%205.757-7.243-2.53%201.5-5.33%202.592-8.314%203.176C56.35%2010.59%2052.948%209%2049.182%209c-7.23%200-13.092%205.86-13.092%2013.093%200%201.026.118%202.02.338%202.98C25.543%2024.527%2015.9%2019.318%209.44%2011.396c-1.125%201.936-1.77%204.184-1.77%206.58%200%204.543%202.312%208.552%205.824%2010.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163%200%206.345%204.513%2011.638%2010.504%2012.84-1.1.298-2.256.457-3.45.457-.845%200-1.666-.078-2.464-.23%201.667%205.2%206.5%208.985%2012.23%209.09-4.482%203.51-10.13%205.605-16.26%205.605-1.055%200-2.096-.06-3.122-.184%205.794%203.717%2012.676%205.882%2020.067%205.882%2024.083%200%2037.25-19.95%2037.25-37.25%200-.565-.013-1.133-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E);
`

const TwitterButton = () => (
  <TwiiterFollowButton
    href="https://twitter.com/intent/follow?screen_name=tseijp&region=follow_link"
    target="_blank"
  >
    <TwitterFollowIcon/>
    Follow @tseijp
  </TwiiterFollowButton>
);

const GitHubStarButton = () => (
  <GitHubButton
    href="https://github.com/tseijp/use-book"
    data-icon="octicon-star"
    data-size="large"
    aria-label="Star tseijp/use-book on GitHub"
  >
    Star
  </GitHubButton>
);

function useButtonAttrs (props: any) {
  const { href, target, children, ...other } = props;
  return { to: href, target, children, ...other}
}

const Button = styled(Link).attrs(useButtonAttrs)`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 0.5rem;
  text-align: center;
  width: 7rem;
  background: #32a84e;
  color: white;
`

const SocialFlex = styled(Flex)`
  z-index: 1;
  position: absolute;
  padding: 10px 0;
  top: 0;
  justify-content: flex-end;
  max-width: 1200px;
  > * {
    margin-right: 1rem;
  }
  background-color: rgba(255, 255, 255, 0.5);
  ${({ isDarkTheme }) => isDarkTheme && css`
    background-color: rgba(24, 25, 26, 0.5);
  `}
`

const ButtonFlex = styled(Flex)`
  z-index: 1;
  bottom: 0;
  position: absolute;
  max-width: 1200px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.5);
  ${({ isDarkTheme }) => isDarkTheme && css`
    background-color: rgba(24, 25, 26, 0.5);
  `}
`

const InteractiveFlex = styled(Flex)`
  position: relative;
  min-height: 20rem;
  justify-content: flex-end;
`

const Interactive = () => (
  <InteractiveFlex>
    <Flex $row>
      {items.map(isbn =>
        <Book size="md" key={isbn} isbn={isbn} />
      )}
    </Flex>
    <SocialFlex $row $wrap>
      <TwitterButton />
      <GitHubStarButton />
    </SocialFlex>
    <ButtonFlex $row $wrap>
      <Button href="/documents/index">
        <Translate>Get Started</Translate>
      </Button>
      <Button href="/documents/index">
        <Translate>Docs</Translate>
      </Button>
      <Button href="/documents/api/props">
        <Translate>Props</Translate>
      </Button>
      <Button href="/documents/api/help">
        <Translate>Get help</Translate>
      </Button>
    </ButtonFlex>
  </InteractiveFlex>
);


/**
 * Main Contents
 */


const Main = styled(Flex)``

const Container = styled(Flex)<FlexProps & {$gray?: boolean}>`
  width: 100%
  margin: 0px;
  text-align: center;
  padding: auto 1rem;
  ${({ isDarkTheme, $gray }) => $gray && css`
    background: ${isDarkTheme? "#212121": "#efefef"};
  `}
`

const Content = styled(Flex)`
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

const Responsible = styled.div<any>`
  ${({width=700}) => css`
    width: ${width}px;
    @media screen and (max-width: ${width}px) {
      display: none;
    }
  `}
`


/**
 * App
 */
export default function App (props: any) {
  const {config: siteConfig} = props;
  return (
    <Layout>
      <Head>
        <title>
          {siteConfig.title} {siteConfig.titleDelimiter} {siteConfig.tagline}
        </title>
      </Head>
      <Main>
        <Interactive />
        <Container $row $gray>
          <Content style={{fontSize: "2.5rem"}}>
            use-book is a hook that lets you get product info from url or book cover on simplicity.
          </Content>
        </Container>
        <Container $row>
          <Responsible>
            <Book isbn={4041067944}/>
          </Responsible>
          <Content>
            <h3>
              FAST AND SAFE
            </h3>
            <Translate>
              use-book is a hook that lets you get product info from url or book cover on simplicity.
            </Translate>
          </Content>
        </Container>
        <Container $row $gray>
          <Content>
            <h3>
              FAST AND SAFE
            </h3>
            <Translate>
              use-book is a hook that lets you get product info from url or book cover on simplicity.
            </Translate>
          </Content>
          <Responsible>
            <Book isbn={4041315220}/>
          </Responsible>
        </Container>
        <Container $row>
          <Responsible>
            <Book isbn={4041002877}/>
          </Responsible>
          <Content>
            <h3>
              FAST AND SAFE
            </h3>
            <Translate>
              use-book is a hook that lets you get product info from url or book cover on simplicity.
            </Translate>
          </Content>
        </Container>
      </Main>
    </Layout>
  );
}
