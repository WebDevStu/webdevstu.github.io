var gulp        = require('gulp'),
    path        = require('path'),
    debug       = require('gulp-debug'),
    source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),
    reactify    = require('reactify'),
    uglify      = require('gulp-uglify'),
    replace     = require('gulp-replace-task');

/**
 * watches fiels for change
 */
gulp.task('watch', function () {

    var bundler = browserify({
            entries: ['./js/app.js'],
            transform: [reactify],
            cache: {},
            packageCache: {},
            fullPaths: false
        }),
        watcher = watchify(bundler);

    return watcher.on('update', function () {

        var start = Date.now();

        watcher.bundle()
                .pipe(source('bundle.js'))
                .pipe(debug({title: 'bundle:'}))
                .pipe(gulp.dest('./js/'))
                .pipe(debug({title: 'dest:'}));

        console.log('Updated!', (Date.now() - start) + 'ms');

        // check for development src
        gulp.src('index.html', {
                base: './'
            })
            .pipe(replace({
                patterns: [{
                    match: /src="dist\/bundle\.js"/g,
                    replacement: 'src="js/bundle.js"'
                }]
            }))
            .pipe(gulp.dest('./'));
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./js/'));
});


/**
 * uglify the js
 */
gulp.task('ugly', function () {

    return gulp.src('./js/bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('replace', function () {

    return gulp.src('index.html', {
            base: './'
        })
        .pipe(replace({
            patterns: [{
                match: /src="js\/bundle\.js"/g,
                replacement: 'src="dist/bundle.js"'
            }]
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('default',     ['watch']);
gulp.task('production',  ['ugly', 'replace']);
