module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all:['src/static/js/*.js']
        },
        less: {
            development: {
                options: {
                    paths: ["src/static/css"]
                },
                files: {
                    "src/static/css/main.css": "src/static/less/main.less"
                }
            },
            production: {
                options: {
                    paths: ["src/static/css"],
                    yuicompress: true
                },
                files: {
                    "src/static/css/main.css": "src/static/less/main.less"
                }
            }
        },
        watch: {
            files: ["src/static/less/*.less",
                    "src/static/less/*/*.less"],
            tasks: ['less:development'],
            jade: {
                files: ["src/views/*.jade"],
                options: {
                    livereload: true,
                }
            },
            css: {
                files: ["src/static/css/*.css"],
                options: {
                    livereload: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['jshint', 'less']);
};
