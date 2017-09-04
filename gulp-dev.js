var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var reload = browserSync.reload;
var buildPath = "dist-dev";
var basePath = "src";
  // 静态服务器 + 监听 文件修改
  gulp.task('serve', ['sass', 'css', 'js', 'img', 'html', 'lib'], function () {
    browserSync.init({
      server: "./dist-dev"
    });
    gulp.watch(basePath + "/**/*.css", ['css']);
    gulp.watch(basePath + "/**/*.scss", ['sass']);
    gulp.watch(basePath + "/**/*.html", ['html']);
    gulp.watch(basePath + "/**/js/**", ['js']);
    gulp.watch(basePath + "/**/img/**", ['img']);
    gulp.watch("src/lib/**", ['lib']);
  });
  // scss编译后的css将注入到浏览器里实现更新
  gulp.task('sass', function () {
    return gulp.src(basePath + "/scss/*.scss")
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(buildPath + '/css'))
      .pipe(reload({
        stream: true
      }));
  });
  gulp.task('css', function () {
    return gulp.src(basePath + "/**/*.css")
      .pipe(gulp.dest(buildPath))
      .pipe(reload({
        stream: true
      }));
  })
  gulp.task('html', function () {
    return gulp.src(basePath + "/**/*.html")
      .pipe(gulp.dest(buildPath))
      .pipe(reload({
        stream: true
      }));
  });
  gulp.task('js', function () {
    return gulp.src(basePath + '/js/*.js')
      .pipe(gulp.dest(buildPath + '/js'))
      .pipe(reload({
        stream: true
      }));
  });
  gulp.task('img', function () {
    return gulp.src(basePath + '/**/images/**')
      .pipe(gulp.dest(buildPath))
      .pipe(reload({
        stream: true
      }));
  });
  gulp.task('lib', function () {
    return gulp.src('src/lib/**')
      .pipe(gulp.dest('dist-dev/lib'))
      .pipe(reload({
        stream: true
      }));
  });
  gulp.task("clean", function () {
    return gulp.src(['dist-dev/', 'src/rev/'])
      .pipe(clean());
  })
  gulp.task('dev', ['clean'], function () {
    gulp.start(['serve']);
  });