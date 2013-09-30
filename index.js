#!/usr/bin/node

function shuffle(array) {
  var currentIndex = array.length
  , temporaryValue
  , randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//could also accept an array in the commandline args?
var argv = require('optimist')
      .usage('Usage: $0 -t [minutes|num] -m [message|text] -c [clock|bool] -r [repeat|bool] -e [externalMessages|file] -s [shuffleExternal|bool]')
      .demand(['t'])
      .default('m', 'BAM!')
      .string('m')
      .default('c', true)
      .boolean('c')
      .default('r', true)
      .boolean('r')
      .default('e', false)
      .string('e')
      .default('s', true)
      .boolean('s')
      .argv,
    spawn = require('child_process').spawn,
    ext = argv.e ? (argv.s ? shuffle(require(argv.e)) : require(argv.e)) : false,
    ecount = 0,
    emnext = function(){ return ext ? ext[ecount++ % ext.length] : argv.m },
    itext = function(){ return (argv.c? new Date().toString().split(" ")[4] + '\n':'') + emnext()},
    alarm = function(){ return spawn('zenity', ['--info', '--text',itext()])},
    itime = argv.t*60000
if(argv.r)
  setInterval(alarm,itime)
else
  setTimeout(alarm,itime)
