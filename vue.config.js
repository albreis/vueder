module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vueder/' : '/',
  devServer: {
    host: 'everaldoreis.com.br',
    https: false,
    disableHostCheck: true
  },
  configureWebpack: {
    resolve: {
      // Add `.ts` as a resolvable extension.
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        // ... other rules omitted
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        }
      ]
    },
  }
}