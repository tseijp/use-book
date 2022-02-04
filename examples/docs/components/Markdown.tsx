import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';

const components = {
  link: ({node: _node, ...props}) => <Link {...props} />,
};

export type MarkdownProps = { children: React.ReactNode }

export function Markdown (props: MarkdownProps) {
  const { children } = props;
  const markdown = React.useMemo(() => {
    if (children.type !== Translate) return children
    return translate({
      id: children.props.id,
      message: children.props?.children,
    });
  }, [children])

  return React.createElement(ReactMarkdown, {components}, markdown)
}
