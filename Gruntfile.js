module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            client: {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            },
            controllers: {
                src: 'client/scripts/controllers/*.js',
                dest: "server/public/assets/scripts/controllers/controller.min.js"
            }
            //user: {
            //    src: 'client/scripts/manager.js',
            //    dest: 'server/public/assets/scripts/user.min.js'
            //}
        },
        copy: {
            angular: {
                expand: true,
                cwd: 'node_modules/angular',
                src: [
                    "angular.min.js",
                    "angular.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angularRoute: {
                expand: true,
                cwd: 'node_modules/angular-route',
                src: [
                    "angular-route.min.js",
                    "angular-route.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angularUI: {
                expand: true,
                cwd: 'node_modules/angular-ui-grid',
                src: [
                    "ui-grid.min.css",
                    "ui-grid.min.js"
                ],
                dest: "server/public/vendors/"
            },
            angularMaterial: {
                expand: true,
                cwd: 'node_modules/angular-material',
                src: [
                    "angular-material.min.css",
                    "angular-material.min.js"
                ],
                dest: "server/public/vendors/"
            },
            angularAria: {
                expand: true,
                cwd: 'node_modules/angular-aria',
                src: [
                    "angular-aria.min.js",
                    "angular-aria.min.js.map"
                ],
                dest: "server/public/vendors/"
            },
            angularAnimate: {
                expand: true,
                cwd: 'node_modules/angular-animate',
                src: [
                    "angular-animate.min.js",
                    "angular-animate.min.js.map"
                ],
                dest: "server/public/vendors/"
            },
            moment: {
                expand: true,
                cwd:'node_modules/moment',
                src: "moment.js",
                dest: "server/public/vendors"
            },
            angularMoment: {
                expand: true,
                cwd: 'node_modules/angular-moment',
                src:"angular-moment.js",
                dest:"server/public/vendors"
            },
            html: {
                expand: true,
                cwd: 'client/views/',
                src: [
                    "*",
                    "*/*"
                ],
                "dest": "server/public/assets/views/"
            },
            htmlRoutes: {
                expand: true,
                cwd: 'client/views/routes',
                src: [
                    "*.html"

                ],
                "dest": "server/public/assets/views/routes/"
            },
            bootstrap: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "bootstrap/dist/css/bootstrap.min.css"
                ],
                dest: "server/public/vendors/"
            },
            css: {
                expand: true,
                cwd: 'client',
                src: [
                    "styles/style.css"
                ],
                "dest": "server/public/assets/"
            },
            images: {
                expand:true,
                cwd:"client/styles/images",
                src: "*.png",
                dest:"server/public/assets/styles/images"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};