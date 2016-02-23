var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify');

gulp.task('browserify', function () {

    var bundler = browserify({
            entries: ['./js/app.js'],
            transform: [reactify],
            cache: {},
            packageCache: {},
            fullPaths: true
        }),
        watcher = watchify(bundler);

    return watcher.on('update', function () {

        var start = Date.now();

        watcher.bundle()
                .pipe(source('bundle.js'))
                .pipe(gulp.dest('./js/'));

        console.log('Updated!', (Date.now() - start) + 'ms');
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./js/'));
});


gulp.task('default', ['browserify']);