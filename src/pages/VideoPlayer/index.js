import React from "react";
import ReactPlayer from "react-player";

import { videos } from "../../Video";
import "./VideoPlayer.css";

function VideoPlayer() {
  return (
    <div className="wrapper-videos">
      {videos.map((video) =>
        video.weight === "500mbs" ? (
          <div className="container-video" key={video.videoUrl}>
            <div className="video">
              <iframe
                title={video.title}
                src={video.videoUrl}
                width="640"
                height="360"
                allow="autoplay"
                allowfullscreen="allowfullscreen"
                frameborder="0"
              ></iframe>
            </div>
            <div className="information-video">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          </div>
        ) : (
          <div className="container-video" key={video.videoUrl}>
            <div className="video">
              <ReactPlayer
                url={video.videoUrl}
                playing={false}
                controls={true}
                className="react-player"
              />
            </div>
            <div className="information-video">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default VideoPlayer;
