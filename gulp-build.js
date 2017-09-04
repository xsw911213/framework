var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var buildPath = "dist";
var basePath = "src";


// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function () {
  return gulp.src(basePath + "/scss/*.scss")
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(buildPath + '/css'))
});
gulp.task('css', function () {
  return gulp.src(basePath + "/**/*.css")
    .pipe(gulp.dest(buildPath))
})
gulp.task('html', function () {
  return gulp.src(basePath + "/**/*.html")
    .pipe(gulp.dest(buildPath))
});
gulp.task('js', function () {
  return gulp.src(basePath + '/js/*.js')
    .pipe(gulp.dest(buildPath + '/js'))
});
gulp.task('img', function () {
  return gulp.src(basePath + '/**/images/**')
    .pipe(gulp.dest(buildPath))
});
gulp.task('lib', function () {
  return gulp.src('src/lib/**')
    .pipe(gulp.dest(buildPath + '/lib'))
});

gulp.task('autoprefixer',['sass', 'css', 'js', 'img', 'html', 'lib'], function () {
  return gulp.src('dist/css/pc.css')
  .pipe(autoprefixer({
      browsers: ['last 3 versions',"ie >= 10","> 5%"],
      // 所有浏览器的最新的 3 个版本
      // ie >= 10
      // 使用率>5%的浏览器
      cascade: false, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove:false //是否去掉不必要的前缀 默认：true 
  }))
  .pipe(gulp.dest('dist/css'));
});

// 清除文件
gulp.task("clean", function () {
  return gulp.src(['dist-dev/','dist/'])
    .pipe(clean());
})

gulp.task('build', ['clean'], function () {
  gulp.start(['autoprefixer']);
});


