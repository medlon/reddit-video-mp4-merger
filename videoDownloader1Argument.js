//Accepts 1 argument in the terminal eg: node vol2.js <reddit post https link>
//downloads the audio and video files, checks for final name availability, merges into the final file, deletes the separate audio and video files 
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');
const { spawn } = require('child_process');
const path = require('path');

//async function to check the final file name's availability
async function createMergedVideoFilename() {
  const directoryPath = './videos';
  let mergedVideoFilename = path.join(directoryPath, 'merged_video.mp4');
  let counter = 1;
  while (true) {
    try {
      await fs.promises.access(mergedVideoFilename, fs.constants.F_OK);
      mergedVideoFilename = path.join(directoryPath, `merged_video${counter}.mp4`);
      counter++;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return mergedVideoFilename;
      }
      throw error;
    }
  }
}
//

async function downloadRedditVideo(link) {
  const fetch = await import('node-fetch').then(mod => mod.default);
  const json = await fetch(link + '.json').then(response => response.json());
  const fallbackUrl = json[0].data.children[0].data.media.reddit_video.fallback_url;
  const audioUrl = fallbackUrl.replace(/DASH_\d+/, 'DASH_audio');

  const videoArrayBuffer = await fetch(fallbackUrl).then(response => response.arrayBuffer());
  const audioArrayBuffer = await fetch(audioUrl).then(response => response.arrayBuffer());

  await Promise.all([
    fs.promises.writeFile('downloaded_video.mp4', Buffer.from(videoArrayBuffer)),
    fs.promises.writeFile('downloaded_audio.mp4', Buffer.from(audioArrayBuffer))
  ]);

  console.log('Video and audio downloaded successfully!');

  const mergedVideoFilename = await createMergedVideoFilename();

  const ffmpegProcess = spawn(ffmpeg, [
    '-i', 'downloaded_video.mp4',
    '-i', 'downloaded_audio.mp4',
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-map', '0:v:0',
    '-map', '1:a:0',
    mergedVideoFilename
  ]);

  ffmpegProcess.on('close', () => {
    console.log('Files merged successfully!');
    fs.unlink('downloaded_video.mp4', (err) => {
      if (err) throw err;
      console.log('downloaded_video.mp4 was deleted');
    });
    fs.unlink('downloaded_audio.mp4', (err) => {
      if (err) throw err;
      console.log('downloaded_audio.mp4 was deleted');
    });
  });
}

const link = process.argv[2];
downloadRedditVideo(link);
