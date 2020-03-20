#!/usr/bin/env nodejs

const cl = require("/home/uttie/spicy-chicken/dev-nodes/web-server/contractLib.js");

var args = process.argv;
if (process.argv.length != 8){
    console.log('Usage: ' + args + '');
    process.exit(1);
}

async function doit() {
	await cl.call_contract(args[2], args[3], args[4], args[5], args[6], args[7], 1);
}

doit();
