module.exports = {
    title: 'GoEcology',
    description: '',
    head: [
      ['script', { type: "text/javascript" }, `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?7c04d443d1967ff13bea347d4744c1c7";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `]
    ],
    markdown: {
      lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
      nav: [{
          text: '生态',
          link: '/summary/'
        },
        {
          text: '了解更多',
          items: [
            { text: 'Github', link: 'https://github.com/goecology' },
          ]
        }
      ],
      sidebar: [
          {
              title: '概览',   // 必要的
              path: '/summary/',      // 可选的, 应该是一个绝对路径
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 1,    // 可选的, 默认值是 1
              children: [
                  // '/summary/intro',
              ]
          },
        {
          title: '商城',   // 必要的
          path: '/ecology/',      // 可选的, 应该是一个绝对路径
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
          ]
        },
          {
              title: '安装',   // 必要的
              path: '/install/',      // 可选的, 应该是一个绝对路径
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 1,    // 可选的, 默认值是 1
              children: [
                  '/install/standard',
                  '/install/golang',
                  '/install/antdesign',
                  '/install/supervisor',
                  '/install/mysql',
                  '/install/redis',
                  '/install/nginx',

              ]
          },
        // {
        //   title: 'Group 2',   // 必要的
        //   path: '/foo/',      // 可选的, 应该是一个绝对路径
        //   collapsable: false, // 可选的, 默认值是 true,
        //   sidebarDepth: 1,    // 可选的, 默认值是 1
        //   children: [
        //     '/'
        //   ]
        // },
      ]
    },
  }
