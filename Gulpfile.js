gulp = require('gulp');
var svgicons2svgfont = require('gulp-svgicons2svgfont');

gulp.task('Iconfont', function() {
  gulp
    .src(['icons/*.svg'])
    .pipe(
      svgicons2svgfont({
        fontName: 'myfont',
        prependUnicode: true,
      }),
    )
    .on('glyphs', function(glyphs) {
      console.log(glyphs);
      // Here generate CSS/SCSS  for your glyphs ...
    })
    .pipe(gulp.dest('./'));
});
