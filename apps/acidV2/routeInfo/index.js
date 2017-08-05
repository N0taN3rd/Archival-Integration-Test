export const navInfo = {
  '/': 'Home',
  '/acidv1': 'Acid Test v1',
  '/redirection': 'Redirection',
  '/highlyDynamic': 'Highly Dynamic'
}

export default {
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
      href: '/highlyDynamic'
    }
  ],
  '/acidv1': [
    {
      title: 'Original On This Domain',
      desc: 'The Original Test Created By Mat Kelly',
      href: 'mats',
      actTest: true
    },
    {
      title: 'Original Iframe',
      desc: "Mat Kelly's Original Test But Loaded Via An Iframe From The Original Domain",
      href: 'viaIframe',
      actTest: true
    },
    {
      title: 'Original Custom Element',
      desc: 'Can You Handle Custom Elements?',
      href: 'customElements',
      actTest: true
    }
  ],
  '/redirection': [
    {
      title: 'Random Chain',
      desc: 'The Server Will Randomly Choose How Many Times To Bounce You Around',
      href: 'chain',
      actTest: true
    },
    {
      title: 'Cookies And Redirection',
      desc: 'Does A Cookie Make It After Bouncing Around',
      href: 'cookie',
      actTest: true
    }
  ],
  '/highlyDynamic': [
    {
      title: 'Iframe Madness',
      desc: 'Dynamic Content And Ads Come From Everywhere including Iframes',
      href: 'iframeMadness',
      actTest: true
    },
    {
      title: 'React',
      desc: 'JavaScript UX Please!',
      href: 'react',
      actTest: true
    }
  ]
}
