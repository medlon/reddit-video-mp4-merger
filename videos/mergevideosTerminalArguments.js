//execute like "node mergevideosTerminalArguments.js video1.mp4 video2.mp4 video3.mp4"

const fs = require('fs');
const { exec } = require('child_process');

// Get the arguments passed to the program
const args = process.argv.slice(2);

console.log('1');

//check if 2 or more arguments where provided - if not terminate the program below
if (args.length < 2 ) {
  console.log("You should provide 2 or more file arguments");
  process.exit();
}

console.log('2');

//check if 2 or more arguments where provided - if not terminate the program above
// Create a list.txt file and write the arguments to it
const listFileName = 'list.txt';
const fileContents = args.map(arg => `file ${arg}`).join('\n');
fs.writeFileSync(listFileName, fileContents);

console.log('3');

//----------------------------------------------------------------------------------------------------------------------------------------
//Attempt to add finalMergedVideo.mp4 name check
let mergedVideoName = '../combinedVideosFolder/finalMergedVideo1.mp4';
let count = 1;
while (fs.existsSync(mergedVideoName)) {
  count++;
  mergedVideoName = `../combinedVideosFolder/finalMergedVideo${count}.mp4`;
}
//----------------------------------------------------------------------------------------------------------------------------------------

console.log('4');

// Concatenate the input files using FFmpeg
const command = `ffmpeg -safe 0 -f concat -i ${listFileName} -c copy ${mergedVideoName}`;
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);

  // Delete the list.txt file
  fs.unlinkSync(listFileName);
});

console.log('5');