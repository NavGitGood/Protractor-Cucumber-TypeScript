var gulp = require('gulp');
var protractor = require("gulp-protractor").protractor;
var reporter = require("gulp-protractor-cucumber-html-report");
var sequence = require('run-sequence');

// gulp.task("default", function(done){
//     sequence('execute', 'report', function (err) {
//         //if any error happened in the previous tasks, exit with a code > 0
//         if (err) {
//           var exitCode = 2;
//           console.log('[ERROR] gulp build task failed', err);
//           console.log('[FAIL] gulp build task failed - exiting with code ' + exitCode);
//           return process.exit(exitCode);
//         }
//         else {
//           return cb();
//         }
//       });
//     done();
// });//["execute", "report"]);

gulp.task("default", ["execute"]);

gulp.task("execute", function () {
        gulp.src([])
            .pipe(protractor({
                configFile: "protractor.conf.js"
            }))
            .on('error', function(e) { console.log(e);
                this.emit('end');
            })
            .on('end', function(){
                gulp.start("report");
            })
    }
);

gulp.task("report", function () {
    gulp.src("e2e/reports/"+ new Date().toLocaleDateString().split('/').join('-') +"/cucumber_report.json")
        .pipe(reporter({
            dest: "e2e/reports/"+ new Date().toLocaleDateString().split('/').join('-') +"/gulp_report/"
        }));
});