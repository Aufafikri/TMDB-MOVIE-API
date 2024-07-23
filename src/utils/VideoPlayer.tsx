import React, { useState } from "react";
import YouTube from "react-youtube";
import { useVideoPlayer } from "../../hooks/useVideoPlayer";
import toast, { Toaster } from 'react-hot-toast'

const VideoPlayer = ({ youtubeId }: any) => {
    const { isOpen, togglePlayer } = useVideoPlayer()

  const option = {
    width: "300",
    height: "250",
  };

  if(!isOpen) {
    return null
  }
  return (
    <div className="fixed bottom-2 right-0">
      <button
        onClick={togglePlayer}
        className="text-color-primary float-right bg-color-secondary px-3 mb-1"
      >
        X
      </button>
      <YouTube
        videoId={youtubeId}
        onReady={(event) => event.target.pauseVideo()}
        opts={option}
        onError={() => toast.error("video is broken, please try another")}
      />
      <Toaster />
    </div>
  );
};

export default VideoPlayer;
