module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    sass: {
      build: {
        options: {
          sourcemap: 'none'
        },
        files: {
          'docs/styles/demogorgon.css': 'test/demogorgon.scss'
        }
      }
    },
    sassdoc: {
      default: {
        src: 'src',
        options: {
          dest: 'docs/sassdoc'
        }
      }
    },
    sasslint: {
      target: ['src/\*.scss']
    },
    copy: {
      dist: {
        expand: true,
        cwd: 'src',
        src: '**',
        dest: 'dist/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-sassdoc');
  grunt.loadNpmTasks('grunt-sass-lint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('lint', ['sasslint']);
  grunt.registerTask('doc', ['sassdoc']);
  grunt.registerTask('build', ['lint', 'sass']);

  grunt.registerTask('dist', ['build', 'doc', 'copy']);

};
