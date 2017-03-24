var gulp = require('gulp'), 
	sass = require('gulp-sass'), 
	autoprefixer = require('gulp-autoprefixer'), 
	fileinclude = require('gulp-file-include'), 
	replace = require('gulp-replace'), 
	browserSync = require('browser-sync').create(); 
 
 // Compile Sass, compressed CSS, add the CSS prefix, CSS image path replacement 
gulp.task('styles', function() { 
	gulp.src('_scss/**/*.*') 
	.pipe(sass().on('error', sass.logError)) 
	.pipe(sass({outputStyle: 'compressed', indentType: 'tab', indentWidth: 1})) 
	.pipe(autoprefixer({ browsers: ['> 1%', 'last 2 versions'] })) 
	//image is relative 
	.pipe(replace('../_img', '../../_img')) 
	.pipe(replace('http://', '//')) 
	.pipe(replace('https://', '//')) 
	.pipe(gulp.dest('dest/css')); 
}); 
 
// HTML file segment introduction, IMG image path replacement 
gulp.task('fileinclude', function(){ 
	gulp.src('_source/**/*.*') 
	.pipe(fileinclude({ 
		prefix: '@@', 
		basepath: '@file' 
	})) 
	//image is relative 
	.pipe(gulp.dest('dest/')); 
}); 
 
// Browser update synchronization 
gulp.task('browser-sync', function(){ 
	browserSync.init({ 
		proxy: 'http://xuxn.github.io/dest/', 
		serveStatic: ['.', 'css/'] 
	}); 
}); 
 
gulp.task('getjs', function(){ 
	gulp.src('_js/**/*.*') 
	.pipe(gulp.dest('dest/js/')); 
}); 
 
// Task start 
gulp.start(['styles', 'fileinclude', 'browser-sync', 'getjs']); 
 
// Task monitoring 
gulp.task('default', function(){ 
	gulp.watch(['_scss/**/*.*', '_source/**/*.*', '_template/*.*', '_js/**/*.*'], ['styles', 'fileinclude', 'getjs']); 
 
	gulp.watch(['dest/**/*.*', '_scss/**/*.*', '_js/**/*.*']).on('change', browserSync.reload); 
}) ;
