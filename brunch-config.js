exports.config = {
  hot: true,

  files: {
    javascripts: { joinTo: 'app.js' },
    stylesheets: { joinTo: 'app.css' }
  },

  plugins: {
    babel: {
      presets: ['es2015', 'react'],
      plugins: ['transform-es2015-modules-commonjs', 'transform-async-to-generator'],
      ignore: [
        /^(bower_components|vendor)/,
        'app/emscripten/**/*'
      ]
    }
  }
}
