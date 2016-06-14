module. exports = function(grunt){ 
  grunt.initConfig({ 
    watch : { 
      files : ['public/scss/*','public/javascript/*'], 
      tasks : ['less','cssmin','uglify' ] 
    } ,
    uglify : {
          dist: {
              files: {
                  'F:/blog/public/jscript/phy.min.js': ['F:/blog/public/javascript/phy.js']
              }
          }
    },
    compass : {
          build: {
             src: 'public/sass/*.sass',
            dest: 'public/stylesheets/sass.css'
        }
    },
    /*cssmin: {
      combine: {
        files: {
          'public/stylesheets/output.css': ['public/sass/style.css']
        }
      }
    },*/
    cssmin: {
      minify: {
             expand : true,
                cwd : 'public/css/',
                src : ['*.css', '!*.min.css'],
               dest : 'public/stylesheets/',
                ext : '.css'//.min.css
      }
    },
    less: {
      compile: {
                options: {
                  yuicompress: true
                },
                files: {
                    'public/css/style.css': 'public/scss/style.less'
                }
      }
    }
  }); 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  //grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('default' , ['watch']);
};