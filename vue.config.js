module.exports = {
  devServer: {
    port: 8081,
    disableHostCheck: true
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Peer-Review-Platform-Frontend/'
    : '/'
};