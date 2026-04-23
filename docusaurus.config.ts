import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'HitPaw API Documents',
  tagline: 'The world\'s most powerful AI media enhancement models',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.hitpaw.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'HitPaw-Official', // Usually your GitHub org/user name.
  projectName: 'hitpaw-developer-docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  stylesheets: [
    // 引入 Montserrat 字体（包含常规、中等、粗体）
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap',
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // 把文档路径设置为根目录
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-318KBV2CEQ',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  //注册插件
  plugins: [
    'docusaurus-plugin-image-zoom',
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'HitPaw API',
      logo: {
        alt: 'HitPaw API',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
          to: '/',
        },
        //{ to: '/blog', label: 'API Reference', position: 'left' },
        {
          href: 'https://github.com/HitPaw-Official',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [

        {
          title: 'Community',
          items: [
            {
              label: 'X',
              href: 'https://x.com/HitPawofficial',
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/channel/UCQwRggaotgiMcPbiCOsJeBA/featured',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/hitpawofficial/',
            },
            {
              label: 'Tiktok',
              href: 'https://www.tiktok.com/@hitpaw',
            }
          ],
        },
        {
          title: 'More',
          items: [
            /**
             * {
              label: 'Blog',
              to: '/blog',
            },
            */
            {
              label: 'GitHub',
              href: 'https://github.com/HitPaw-Official',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} HitPaw. All Rights Reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    //配置放大效果
    zoom: {
      selector: '.markdown img',  // 指定哪些图片可以放大 (通常设为 markdown 内容里的图片)
      background: {
        light: 'rgb(255, 255, 255)', // 亮色模式下的背景色
        dark: 'rgb(50, 50, 50)'      // 深色模式下的背景色
      },
      config: {
        // 这里的选项参考 medium-zoom 的官方文档
        margin: 24,
        scrollOffset: 0,
      }
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
