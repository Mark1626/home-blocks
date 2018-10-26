const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig
      // dev: Object.assign({watch: true}, webpackConfig)
    },
    copy: {
      main: {
        files: [
          { expand: true, src: ['./index.html', './manifest.json'], dest: './build/' },
          { expand: true, src: ['./public/**'], dest: './build/' }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['webpack', 'copy']);
};
