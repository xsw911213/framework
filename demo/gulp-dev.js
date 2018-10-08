var gulp        = require('gulp');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();
var htmlmin     = require('gulp-htmlmin');
//var sass        = require('gulp-ruby-sass');
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass','fileinclude'], function() {
  browserSync.init({
    server: "./",
    directory: true,
    open: "external",
    ghostMode: false,
    port: 1213
    // tunnel: true
  });

  gulp.watch("./src/scss/*.scss", ['sass']);
  gulp.watch("./src/_html/**.html",['fileinclude']);
  gulp.watch("./src/_html/components/**.html",['fileinclude']);
  gulp.watch("./src/_html/components/**/**.html",['fileinclude']);

  gulp.watch("./src/*.html").on('change', reload);
  gulp.watch("./src/css/*.css").on('change', reload);
  gulp.watch("./src/js/*.js").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
  return gulp.src("./src/scss/*.scss")
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest("./src/css"))
        .pipe(reload({stream: true}));
});

gulp.task('fileinclude', function() {

  var options = {
    removeComments: true,//清除HTML注释
    // collapseWhitespace: true,//压缩HTML
    // collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    // removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    // removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    // removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    // minifyJS: true,//压缩页面JS
    // minifyCSS: true//压缩页面CSS
  };

  gulp.src(['./src/_html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',   
      indent: true//保留文件的缩进
    }))
    .pipe(htmlmin(options))
    .pipe(gulp.dest('./src'))
    .pipe(reload({stream: true}));
});

// gulp.task('sass', function () {
//     return sass('scss/*.scss', { style: 'expanded' }) // 指明源文件路径、并进行文件匹配（style: 'compressed' 表示输出格式）
//         .on('error', function (err) {
//             console.error('Error!', err.message); // 显示错误信息
//         })
//         .pipe(gulp.dest('css')); // 输出路径
// })

gulp.task('dev', ['serve']);