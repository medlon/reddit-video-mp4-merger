//execute like "node mergevideosTerminalArguments.js video1.mp4 video2.mp4 video3.mp4"

const fs = require('fs');
const { exec } = require('child_process');

// Get the arguments passed to the program
const args = process.argv.slice(2);

// Create a list.txt file and write the arguments to it
const listFileName = 'list.txt';
const fileContents = args.map(arg => `file ${arg}`).join('\n');
fs.writeFileSync(listFileName, fileContents);

// Concatenate the input files using FFmpeg
const command = `ffmpeg -safe 0 -f concat -i ${listFileName} -c copy finalMergedVideo.mp4`;
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
