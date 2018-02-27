# gulp项目模板文件。


## 更换git仓库地址：
1、移除原来远程仓库地址
```bashb
git remote rm origin
```


2、设置新的仓库地址
```bashb
git init
git remote add origin xxxxxxxxxxxx
git add .
git commit
git push -u origin master
```

## 项目构建使用（以下命令需要在当前项目根目录下执行）：
1、安装项目依赖（gulp等）。

```bashb
npm install
```


2、安装开发需要的库（jQuery等）。

```bashb
bower install
```


3、开发：执行命令

```bashb
gulp dev
```

4、开发说明

> html 的源码在src/html文件夹中，使用gulp-file-include进行编写

5、打包：执行命令

```bashb
gulp build
```

## 更新记录
> 2017.10.31：升级三个构建文件

> 2017.11.22：更新readme文件、更新m端模板文件及scss/m.scss文件

> 2018.02.27：加入gulp-file-include进行html模板化开发