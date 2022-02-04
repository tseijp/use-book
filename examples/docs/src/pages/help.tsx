import React from 'react';
import Translate from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import { Flex } from '@site/components/Book';
import { Container } from '@site/components/Container';
import { Content } from '@site/components/Content';
import { Markdown } from '@site/components/Markdown';

export default function App () {
  return (
    <Layout>
      <Container>
        <Content>
          <h3>
            <Translate>Need help?</Translate>
          </h3>
        </Content>
        <Container $row>
          <Content>
            <h3>
              <Translate>Browse the docs</Translate>
            </h3>
            <Markdown>
              <Translate>
                {`Find what you're looking for in our detailed documentation and guides.
- Learn how to [Introduction to React UseBook](documents) with Jest.
- [Troubleshoot](documents/troubleshooting) problems with Jest.
- Look at the full [API Reference](documents/api/apis).`}
              </Translate>
            </Markdown>
          </Content>
          <Content>
            <h3>
              <Translate>Join us</Translate>
            </h3>
            <Markdown>
              <Translate>
                {`Ask questions and find answers from other Jest users like you.
- Join on [tseijp](https://bit.ly/3gBx5jL), a Discord community.
- Follow [tseijp](https://twitter.com/tseijp) on Twitter.
- Read through the [existing questions](https://stackoverflow.com/questions/tagged/use-book) tagged`}
              </Translate>
            </Markdown>
          </Content>
        </Container>
      </Container>
    </Layout>
  )
}
