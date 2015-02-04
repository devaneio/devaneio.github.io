/**
 * Created by alyssonbruno on 18/06/14.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            compile: {
                files: {
                    './www/js/web-app-model.js': ['./frontend/coffee/Model/*.coffee'],
                    './www/js/web-app-controller.js': ['./frontend/coffee/Controller/*.coffee'],
                    './www/js/web-app-view.js': ['./frontend/coffee/View/*.coffee'],
                    './www/test/js/app.js' : ['./frontend/coffee/Model/*.coffee'], //'./frontend/coffee/View/*.coffee',  './frontend/coffee/Controller/*.coffee' ],
                    './www/test/js/expec.js' : ['./frontend/coffee/Test/*.coffee']
                }
            }
        },
        jade: {
            compile: {
                files: {
                    './www/index.html': ['./frontend/jade/App/page_index.jade'],
                    './www/contato.html': ['./frontend/jade/App/page_contato.jade'],
                    './www/test/index.html' : ['./frontend/jade/Test/jasmine_runner.jade']
                }
            }
        },
        stylus: {
            compile: {
                files: {
                    './www/css/web-app.css': ['./frontend/stylus/*.styl']
                }
            }
        },
        copy: {
            frontend: {
                expand: true, //ele sai propagando (recursivo)
                cwd: './frontend',
                src: ['*', '*/**', '!coffee/**', '!jade/**', '!stylus/**', '!Test/**'],
                dest: './www/' //se não tiver criado, ele cria
            },
            angular: {
                expand: true,
                cwd: './bower_components/angular',
                src: ['angular.min.js', 'angular.min.js.map'],
                dest: './www/js/'
            },
            jquery: {
                expand: true,
                cwd: './bower_components/jquery',
                src: ['jquery.min.js','jquery.min.map'] ,
                dest: './www/js/'
            }

        },
        clean: {
            backend: ['./www/*']
        },
        usemin: {
            html: ['./www/*.html']
        },
        useminPrepare: {
            html: ['./www/*.html']
        },

        watch: {
            options: {   //quase todos os plugins aceitam esse parâmetro, configurá-los
                livereload: true
            },
            todos: {
                files: ['./frontend/**/*'], //é para monitorar os arquivos do desenvolvimento, não os da produção
                tasks: ['compile']
            }
        },

        connect: {
            webapp: {
                options: {
                    livereload: true,
                    port: 8000,
                    base: 'www'
                }
            },
            test: {
                options: {
                    livereload: true,
                    port: 8000,
                    base: 'www/test'
                }
            }
        },

        imagemin: {
            todas: {
                expand: true,
                cwd: './www/images', //minifica só na distirbuição
                src: '*.{jpg,png,gif}',
                dest: './www/images'
            }
        }
    });
    
    //minhas tasks
    grunt.registerTask("minify", ["useminPrepare", "usemin", "concat", "uglify", "cssmin", "imagemin"]); //o use min só cria as configurações, tem q chamar as tasks
    grunt.registerTask("compile", [ 'coffee', 'jade']);
    grunt.registerTask("distrib", ['clean','compile', 'copy:angular','copy:jquery','copy:frontend', "minify"]);
    grunt.registerTask("test", ['compile', 'connect:test', 'watch']);
    grunt.registerTask("run", ['compile', 'connect:webapp', 'watch']);
    grunt.registerTask("default", ['run']);

    //plugins
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-usemin');
}
