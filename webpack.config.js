// module.exports
module.exports = function (env) {
  if(env) {
    return require(`./webpack.${env}.js`);
  }else{
    return require(`./webpack.d.js`);
  }
};