var gulp        = require('gulp'),
    debug       = require('gulp-debug'),
    source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),
    reactify    = require('reactify'),
    uglify      = require('gulp-uglify');

gulp.task('browserify', function () {

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
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('ugly', function() {
    return gulp.src('./js/bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['browserify']);
gulp.task('production', ['ugly']);