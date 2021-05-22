module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vueder/' : '/',
  devServer: {
        host: 'everaldoreis.com.br',
        https: false,
        disableHostCheck: true
    }
}