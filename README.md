**Javascript reddit video downloader and mp4 merger**
**IMPORTANT**
CREATE a new folder in the root directory called "**combinedVideosFolder**". If you don't, you wont be able to use the mp4s merger as it is set.

**Usage & Description**
This project intended easily to download ##**one reddit video at a time**## and/or merge them together.
1) Go to a reddit video post
2) Copy its link.
    *(Optional)* You can make sure the link its correct by using a tool like Postman and running a get request.
    *(Optional)* link.json  --> This should return an object
3) Use: **node videoDownloader1Argument link**
The video should be downloaded in the videos folder.

Additionally you can use the   mergevideosTerminalArguments.js  program, which is located in the *videos* folder to merge 2 or more videos.
The result video with be located in the *combinedVideosFolder* folder.
simply use:
    **node mergevideosTerminalArguments.js video1.mp4 video2.mp4 video3.mp4**
# Reddit-video-and-merger
