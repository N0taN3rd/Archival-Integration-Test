module.exports = {
  navInfo: {
    '/': 'Home',
    '/acidv1': 'Acid Test v1',
    '/redirection': 'Redirection',
    '/dynamic': 'Dynamic',
    '/funkyTown': 'Funky Town'
  },
  sections: {
    '/': [
      {
        title: 'Original',
        desc: 'The Original Test Created By Mat Kelly',
        href: '/acidv1'
      },
      {
        title: 'Redirection',
        desc: 'How Well Can You Handle Bouncing Around Our Server',
        href: '/redirection'
      },
      {
        title: 'CORS',
        desc: 'Request To Another Domain',
        href: 'cors',
        actTest: true
      },
      {
        title: 'Dynamic Content',
        desc: 'How Well Can You Handle The Dynamic Web',
        href: '/dynamic'
      },
      {
        title: 'Funky Town',
        desc: 'Oh The Things You Can Do On The Web',
        href: '/funkyTown'
      }
    ],
    '/acidv1': [
      {
        title: 'Original On This Domain',
        desc: 'The Original Test Created By Mat Kelly',
        href: '/tests/acidv1Mats',
        actTest: true
      },
      {
        title: 'Original Iframe',
        desc: "Mat Kelly's Original Test But Loaded Via An Iframe From The Original Domain",
        href: '/tests/acidv1Iframe',
        actTest: true
      },
      {
        title: 'Original Custom Element',
        desc: 'Can You Handle Custom Elements?',
        href: '/tests/acidv1CustomElements',
        actTest: true
      }
    ],
    '/redirection': [
      {
        title: 'Random Chain',
        desc: 'The Server Will Randomly Choose How Many Times To Bounce You Around',
        href: '/redirection/chain',
        actTest: true
      },
      {
        title: 'Cookies And Redirection',
        desc: 'Does A Cookie Make It After Bouncing Around',
        href: '/redirection/cookie',
        actTest: true
      },
      {
        title: 'Meta Refresh',
        desc: 'Redirection Will Be Indicated Using Only A Meta Refresh Tag',
        href: '/redirection/metaRefresh',
        actTest: true
      }
    ],
    '/dynamic': [
      {
        title: 'Iframe Madness',
        desc: 'Dynamic Content And Ads Come From Everywhere including Iframes',
        href: '/tests/iframeMadness',
        actTest: true
      },
      {
        title: 'React',
        desc: 'JavaScript UX Please!',
        href: '/tests/simpleReact',
        actTest: true
      },
      {
        title: 'Polymer',
        desc: 'A Progressive Web App',
        href: '/tests/polymer',
        actTest: true
      },
      {
        title: 'SPA',
        desc: 'A Single Page Application',
        href: '/tests/reactSPA',
        actTest: true
      }
    ],
    '/funkyTown': [
      {
        title: 'Only CSS',
        desc: 'A Page That Only Exists Through CSS',
        href: '/tests/onlyCSS',
        actTest: true
      },
      {
        title: 'ES Modules',
        desc: 'Script Tags The Use "import x from where"',
        href: 'tests/esModules',
        actTest: true
      },
      {
        title: 'Resource Integrity',
        desc: 'Protected Script And Link Tag',
        href: 'tests/resourceIntegrity',
        actTest: true
      },
      {
        title: 'An Unfriendly Page',
        desc: 'This Page Is Archiving Unfriendly',
        href: 'tests/archivingUnfriendly',
        actTest: true
      }
    ]
  },
  routeConf: [
    { path: '/', exact: true },
    { path: '/acidv1', exact: false },
    { path: '/redirection', exact: false },
    { path: '/dynamic', exact: false },
    { path: '/funkyTown', exact: false }
  ],
  trailer: [ 'sections', 'navInfo' ]
}
