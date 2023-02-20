// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Learn',
  tagline: 'Learning Management System Inspired in Autodidacticism',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  
  url: 'https://camilo-camargo.github.io',
  
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Learn/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'camilo-camargo', // Usually your GitHub org/user name.
  projectName: 'Learn', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      //image: 'img/docusaurus-social-card.jpg', !! For twitter references, see: https://github.com/facebook/docusaurus/issues/2968
      navbar: {

        //hides the navbar, remove or set to false!!
        hideOnScroll:true,

        title: 'Learn',
        logo: {
          alt: 'Learn Icon',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Getting Started',
          },
          {
            type:'docSidebar',
            sidebarId: 'intro',
            position: 'left',
            label: 'Design System',
          },
          {
            type: 'dropdown',
            label: 'Creators',
            position: 'right',
            items:[
              {
                label: 'Camilo Camargo',
                href: 'https://github.com/camilo-camargo'
              },
              {
                label: 'Santiago Cujaban',
                href: 'https://github.com/JustSomeon3'
              }
            ],
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Learn, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
