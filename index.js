var argv = require('optimist').argv
var spawn = require('child_process').spawn,
    alarm    = function(){ return spawn('zenity', ['--info', '--text',argv._[1] || '"BAM!"'])};
setTimeout(alarm,argv._[0]*60000)
