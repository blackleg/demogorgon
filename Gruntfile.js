module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    sass: {
      test: {
        options: {
          sourcemap: 'none'
        },
        files: {
          'public/demogorgon.css': 'test/demogorgon.scss'
        }
      }
    },
    sassdoc: {
      default: {
        src: 'src',
        options: {
          dest: 'docs'
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
  grunt.registerTask('test', ['lint', 'sass']);
  grunt.registerTask('doc', ['sassdoc']);

  grunt.registerTask('dist', ['lint', 'doc', 'copy']);

};
