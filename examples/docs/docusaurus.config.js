// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  url: 'https://tseijp.github.io',
  title: 'use-book',
  baseUrl: '/use-book/',
  tagline: '📚a hook that lets you get product info from url or book cover in React',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'tseijp',
  projectName: 'use-book',
  presets: [
    [ 'classic', { theme: {}, docs: {
      id: 'documents',
      path: 'documents',
      routeBasePath: 'documents',
      remarkPlugins: [math],
      rehypePlugins: [katex]
    }}]
  ],
  plugins: [
    [ '@docusaurus/plugin-content-docs', {
      id: 'examples',
      path: 'examples',
      routeBasePath: 'examples',
      remarkPlugins: [math],
      rehypePlugins: [katex],
    }],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: { title: 'use-book', logo: { alt: ' ', src: 'img/favicon.png'}, items: [
        { type: 'doc', docId: 'index', position: 'left', label: 'Documents', docsPluginId: 'documents'},
        { type: 'doc', docId: 'index', position: 'left', label: 'Examples', docsPluginId: 'examples'},
        { href: 'https://github.com/tseijp/use-book', label: 'GitHub', position: 'right' },
      ]},
      footer: { style: 'dark', links: [
        { title: 'Docs', items: [{ label: 'Introduction', to: '/documents' }] },
        { title: 'Community', items: [
          { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/tseijp' },
          { label: 'Twitter', href: 'https://twitter.com/tseijp' },
        ]},
        { title: 'More', items: [
          { label: 'Examples', to: '/examples' },
          { label: 'GitHub', href: 'https://github.com/tseijp/use-book' },
        ]},
      ], copyright: `Copyright © ${new Date().getFullYear()} tseijp, Inc. Built with Docusaurus.`},
      prism: { theme: lightCodeTheme, darkTheme: darkCodeTheme },
    }),
    stylesheets: [{
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      integrity: "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    }],
};

module.exports = config;
