'use strict';
var gulp = require('gulp');

var argList = process.argv;

var operation = argList.find((item)=>{
  if(item === 'dev'){
    return 'dev'
  } else if (item === 'build'){
    return 'build'
  }
})

if (operation === 'dev') {
  require("./gulp-dev");
} else {
  require("./gulp-build");
}








