const path = require('path')

module.exports = {
  componentsRoot: 'src',
  components: '**/*.{vue,js,jsx,ts,tsx}',
  outDir: 'documentation/components',
  docsRepo: 'albreis/vueder',
  docsBranch: 'master',
  docsFolder: 'documentation',
  editLinkLabel: 'Algo errado? Avise-nos!',
  getDocFileName: (componentPath) => componentPath.replace(/\.vue$/, '.md'),
  getDestFile: (file, config) => path.join(config.outDir, file).replace(/\.vue$/, '.md'),
}