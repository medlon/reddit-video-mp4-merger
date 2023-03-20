# Reddit MP4 Video Merger

## Description
This project intended easily to download **one reddit video at a time** and/or merge them together.

## Usage
* Create and name the directory `combinedVideosFolder`. This is important for the program.
* Go to a Reddit video post.
* Copy its URL. Optionally, you can make sure the URL is correct by using a tool like `Postman` and running a `GET` request or copy the URL and append `.json` at the end, which returns a JSON object upon request.
* Run ``node videoDownloader1Argument [url]``  

* Additionally you can use the `mergevideosTerminalArguments.js`  program, which is located in the `videos` directory to merge tow or more videos and run `node mergevideosTerminalArguments.js [mp4s]`
