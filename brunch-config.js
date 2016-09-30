exports.config = {
  hot: true,

  files: {
    javascripts: { joinTo: 'app.js' },
    stylesheets: { joinTo: 'app.css' }
  },

  plugins: {
    babel: {
      presets: ['latest', 'react'],
      ignore: [
        /^(bower_components|vendor)/,
        'app/emscripten/**/*'
      ]
    }
  }
}
