var glyphs = require('../index');
var path = require('path');
var fs = require('fs');

if (process.argv.length !== 5) {
    console.log('Expected input and output directories, got: ' + process.argv.join(' '));
    process.exit(1);
}

var fontsDirs = process.argv[2].split(',');
var inputDir = path.resolve(process.argv[3]);
var outputDir = path.resolve(process.argv[4]);

for (var i = 0; i < 65536; (i = i + 256)) {
    var range = i + '-' + Math.min(i + 255, 65535);
    var pbfsToCombine = readPbfsFilesToCombine(inputDir, fontsDirs, range);
    var combinedGlyphs = glyphs.combine(pbfsToCombine, fontsDirs.toString());
    fs.writeFileSync(outputDir + '/' + range + '.pbf', combinedGlyphs);
}

function readPbfsFilesToCombine(inputDir, fontsDirs, range) {
    var pbfsFiles = [];
    for(var i = 0; i < fontsDirs.length; ++i) {
        var pbfFilePath = inputDir + '/' + fontsDirs[i] + '/' + range + '.pbf';
        pbfsFiles.push(fs.readFileSync(pbfFilePath));
    }
    return pbfsFiles;
}
