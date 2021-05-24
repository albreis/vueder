module.exports = {
    title: 'Vueder',
    description: 'Criador de Formulário',
    base: '/vueder/',
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Exemplos', link: '/exemplos/' },
        { text: 'Contato', link: 'https://wa.me/5551981108038' }
      ],
      sidebar: {
        '/exemplos/': [
            '',
        ]
      },
      activeHeaderLinks: true,
      displayAllHeaders: true,
      // sidebarDepth: 2,
      repo: 'albreis/vueder',
      repoLabel: 'Github',
      // docsRepo: 'vuejs/vuepress',
      docsDir: 'docs',
      docsBranch: 'master',
      editLinks: true,
      editLinkText: 'Algo errado? Ajude-nos a corrigir!'
    }
  }