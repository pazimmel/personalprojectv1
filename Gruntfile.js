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
                cwd: 'node_modules',
                src: [
                    "angular-ui-grid/ui-grid.min.css",
                    "angular-ui-grid/ui-grid.min.js"
                ],
                dest: "server/public/vendors/"
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
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};