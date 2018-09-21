var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglyfly = require('gulp-uglyfly'),
    less = require('gulp-less'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    inject = require('gulp-inject'),
    es = require('event-stream'),
    gulpSequence = require('gulp-sequence'),
    del = require('del'),
    watch = require('gulp-watch');

var ScriptResource = [
    './bower_components/jquery/dist/jquery.js',
    './bower_components/interact/dist/interact.js',
    './bower_components/moment/moment.js',
    './bower_components/tinymce/tinymce.js',

    //AngularJS Oficial
    './bower_components/angular/angular.js',
    './bower_components/angular-i18n/angular-locale_pt-br.js',
    './bower_components/angular-route/angular-route.js',
    './bower_components/angular-animate/angular-animate.js',
    './bower_components/angular-touch/angular-touch.js',

    //Componentes
    './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    './bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js',
    './bower_components/angular-loading-bar/src/loading-bar.js',
    './bower_components/checklist-model/checklist-model.js',
    './bower_components/angular-ui-switch/angular-ui-switch.js',
    './bower_components/angular-toastr/dist/angular-toastr.tpls.js',
    './bower_components/angular-ivh-treeview/dist/ivh-treeview.js',
    './bower_components/angular-input-masks/angular-input-masks-standalone.js',
    './bower_components/angular-ui-mask/dist/mask.js',
    './bower_components/angular-br-filters/release/angular-br-filters.js',
    './bower_components/plupload-angular-directive/dist/plupload-angular-directive.js',
    './bower_components/ng-sortable/dist/ng-sortable.js',
    './bower_components/angular-viacep/dist/angular-viacep.min.js',
    './bower_components/angular-ui-tinymce/src/tinymce.js',
    './bower_components/ng-img-crop/compile/unminified/ng-img-crop.js',
    './bower_components/jquery.nicescroll/jquery.nicescroll.min.js',
    './bower_components/angular-nicescroll/angular-nicescroll.js',

    //Gestcom
    './App/src/app.js',
    './App/src/Services/**/*.js',
    './App/src/Modules/**/*Route.js',
    './App/src/Modules/**/*Controller.js'
];

var LESSResource = [
    './App/src/App.less',
    './App/src/**/*.less',
];

var FinalFileName = 'gestcom-' + new Date().getTime();

gulp.task('Scripts', function () {
    return gulp.src(ScriptResource)
      .pipe(concat(FinalFileName + '.js'))
      .pipe(uglyfly())
      .pipe(gulp.dest('./App/dist/js/'));
});

gulp.task('JSHintOriginalFiles', function () {
    return gulp.src(['./App/src/**/*.js'])
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('JSHintBuildFiles', function () {
    return gulp.src(['./App/dist/**/*.js'])
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('LessCSS', function () {
    return gulp.src(LESSResource)
      .pipe(less())
      .pipe(concatCss(FinalFileName + '.css'))
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(gulp.dest('./App/dist/css/'));
});

gulp.task('InjectOriginalFiles', function () {
    var cssFiles = gulp.src(LESSResource)
        .pipe(less())
        .pipe(gulp.dest('./App/dist/css/'));

    return gulp.src('./Views/Home/Index.cshtml')
          .pipe(inject(
                    es.merge(
                        cssFiles,
                        gulp.src(ScriptResource, { read: false })
                    )
                , { name: 'app' })
          )
          .pipe(gulp.dest('./Views/Home/'));
});

gulp.task('InjectBuildFiles', function () {

    var BuildFiles = [
        './App/dist/js/gestcom*.js',
        './App/dist/js/**/*.js',
        './App/dist/css/**/*.css'
    ];

    return gulp.src('./Views/Home/Index.cshtml')
          .pipe(inject(gulp.src(BuildFiles, { read: false }), { name: 'app' }))
          .pipe(gulp.dest('./Views/Home/'));
});

gulp.task('Clean', function (cb) {
    del(['./App/dist']).then(function() {
        cb(null);
    });
});

//
// Tasks
//
gulp.task('build', gulpSequence('Clean', 'Scripts', 'LessCSS', 'InjectBuildFiles'));
gulp.task('developer', gulpSequence('Clean', 'JSHintOriginalFiles', 'InjectOriginalFiles'));
gulp.task('default', ['developer']);

//watch(['./App/src/**/*.js',], {events: ['add', 'unlink']}, function () {
//    gulp.start('Clean');
//	gulp.start('JSHintOriginalFiles');
//	gulp.start('InjectOriginalFiles');
//});