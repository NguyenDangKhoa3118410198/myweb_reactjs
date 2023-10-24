import React from 'react';
import ReactPlayer from 'react-player';

import { videos } from '../../Video/dataVideos';
import './VideoPlayer.css';

function VideoPlayer() {
   return (
      <main className='wrapper-videos'>
         <div className='grid-container'>
            {videos.map((video) =>
               video.weight === '500mbs' ? (
                  <div className='grid-item'>
                     <div className='container-video' key={video.id}>
                        <div className='video'>
                           <iframe
                              title={video.title}
                              src={video.videoUrl}
                              width='450px'
                              height='260px'
                              allow='autoplay'
                              frameBorder='0'
                              allowFullScreen='allowFullScreen'
                           ></iframe>
                        </div>
                        <div className='information-video'>
                           <h3>{video.title}</h3>
                           <p>{video.description}</p>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className='grid-item'>
                     <div className='container-video' key={video.id}>
                        <div className='video'>
                           <ReactPlayer
                              url={video.videoUrl}
                              playing={false}
                              controls={true}
                              width='450px'
                              height='265px'
                           />
                        </div>
                        <div className='information-video'>
                           <h3>{video.title}</h3>
                           <p>{video.description}</p>
                        </div>
                     </div>
                  </div>
               )
            )}
         </div>
      </main>
   );
}

export default VideoPlayer;
