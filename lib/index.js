#!/usr/bin/env node

"use strict";

var Cli = new require("n-cli");
var fs = new require("fs");
var cli = new Cli({
    silent: false,
    handleUncaughtException: true, // beautifies error output to console
    handledRejectionPromiseError: true, // beautifyies error output to console
    // runcom: ".myapprc"
});

var Chart = require("./plot.js");
var chart = new Chart(cli.argv.template);

// cli.argv.notNull("rainbow");

var onStdIn = function (done) {
    if (process.stdin.isTTY === true) {
        done();
    }

    var body = "";
    process.stdin.on("data", function (chunk) {
        if (chunk) {
            body += chunk.toString();
        }
    });

    process.stdin.on("end", function () {
        done(body);
    });
};

var headlessMode = cli.argv.headless
if (headlessMode !== undefined) {
    if (cli.argv.headless.toString().toLowerCase() !== "true" && cli.argv.headless.toString().toLowerCase() !== "false") {
        throw new Error('Invalid parameter value for `headless`. Value should be `true`or `false`.')
    }
    headlessMode = cli.argv.headless.toString().toLowerCase() === "true"
} else {
    headlessMode = true
}


var pageParms = {
    headlessSettings: {
        headless: headlessMode,
        slowMo: headlessMode ? 0 : parseInt(cli.argv.slomo, 10) || 800 // slow down by 800ms
    },
    title: cli.argv.title || new Date().toISOString(),
    viewport: {
        width: parseInt(cli.argv.width, 10) || 1024,
        height: parseInt(cli.argv.height, 10) || 600,
        deviceScaleFactor: parseInt(cli.argv.deviceScaleFactor, 10) || 1
    },
    outputFilename: cli.resolvePath(cli.argv.outputfile || 'chart.png'),
    delimiter: cli.argv.delimiter,
    // rawData: 'SASerial Data;Signal;AVG Filter;STD Filter\n1;0;0;0\n1;0;0;0\n1.1;0;0;0\n1;0;0;0\n0.9;0;1.41756756756757;0.902901944349606\n1;0;0;0\n1;1;0.2;0.4\n1.1;0;0.4;0.489897948556636\n1;0;0.62;0.507543101617981\n0.9;0;0.82;0.41182520563948\n1;0;1;0.0632455532033676\n1.1;0;1;0.0632455532033676\n1;0;1.02;0.0748331477354789\n1;0;1;0.0632455532033676\n0.9;0;1;0.0632455532033676\n1;0;1;0.0632455532033676\n1;0;1;0.0632455532033676\n1.1;0;0.98;0.04\n1;0;1;0.0632455532033676\n1;0;1;0.0632455532033676\n1;0;1.02;0.04\n1;0;1.02;0.04\n1.1;0;1.02;0.04\n0.9;0;1.02;0.04\n1;0;1;0.0632455532033676\n1.1;0;1;0.0632455532033676\n1;0;1.02;0.0748331477354789\n1;0;1.02;0.0748331477354789\n0.9;0;1;0.0632455532033676\n1;0;1;0.0632455532033676\n1.1;0;1;0.0632455532033676\n1;0;1;0.0632455532033676\n1;0;1;0.0632455532033676\n1.1;0;1;0.0632455532033676\n1;0;1.04;0.0489897948556636\n0.8;-1;1.04;0.0489897948556636\n0.9;0;1.008;0.0515363949069005\n1;0;0.988;0.0676461381011511\n1.2;0;0.988;0.0676461381011511\n0.9;0;1.008;0.103227903204512\n1;0;0.988;0.112142766151009\n1;0;1;0.109544511501033\n1.1;0;1.02;0.0979795897113271\n1.2;0;1.04;0.101980390271856\n1;0;1.04;0.101980390271856\n1.5;1;1.06;0.08\n1;0;1.09;0.08\n3;1;1.09;0.08\n2;1;1.19;0.22\n5;1;1.294;0.306176419732154\n3;1;1.6348;0.598274318352376\n2;0;1.96336;0.686416111699019\n1;0;2.16336;0.49580548443921\n1;0;2.04336;0.662291082832919\n1;0;1.89936;0.78402879947104\n0.9;0;1.55856;0.72858568089141\n1;0;1.18;0.41182520563948\n1;0;0.98;0.04\n3;1;0.98;0.04\n2.6;1;1.1;0.25298221281347\n4;1;1.28;0.396988664825584\n3;1;1.606;0.5787434664858\n3.2;0;1.9402;0.613719936127221\n2;0;2.3802;0.56892544327003\n1;0;2.4602;0.473755379916682\n1;0;2.2802;0.745463721451286\n0.8;0;1.9742;0.881693007798066\n4;0;1.6;0.903327183250897\n4;0;1.76;1.19599331101808\n2;0;2.16;1.50412765415705\n2.5;0;2.36;1.39942845476287\n1;0;2.66;1.22572427568356\n1;0;2.7;1.16619037896906\n'
}

if (cli.argv.inputfile) {
    console.log('start rendering based on file...')
    var fn = cli.resolvePath(cli.argv.inputfile);
    console.log("processing " + fn + "...")
    pageParms.rawData = fs.readFileSync(fn).toString()
    chart.plot(pageParms, function () {
        console.log('done')
    })
} else {
    onStdIn(function (stdin) {
        if (stdin && stdin.trim() !== '') {
            console.log('start rendering based on stdin')
            pageParms.rawData = stdin
            chart.plot(pageParms, function () {
                console.log('done')
            })
        } else {
            process.exit(0)
        }
    });

}