import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DocumentContext } from "~context/DocumentContext";

const Video = ({
  autoPause,
  autoPlay,
  className,
  loop,
  muted,
  playing,
  playsInline,
  poster,
  src,
  style
}) => {
  const { scrollTop, windowHeight } = useContext(DocumentContext);
  const videoRef = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (videoRef?.current && !loaded) {
      setLoaded(true);

      videoRef.current.onpause = () => {
        if (videoRef?.current) {
          videoRef.current.playing = false;
        }
      };

      videoRef.current.onplaying = () => {
        if (videoRef?.current) {
          videoRef.current.playing = true;
        }
      };
    }
  }, [videoRef.current]);

  useEffect(() => {
    if (!autoPause || !loaded) {
      return;
    }

    const { height, top } = videoRef.current.getBoundingClientRect();
    const video = videoRef.current;

    if (top > -height && top < windowHeight) {
      if (!video.playing) {
        video.play();
      }
    } else if (video.playing) {
      video.pause();
    }
  }, [scrollTop]);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    const video = videoRef.current;

    if (playing) {
      if (!video.playing) {
        video.play();
      }
    } else if (video.playing) {
      video.pause();
    }
  }, [loaded, playing, videoRef.current]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      poster={poster}
      style={style}
    >
      <source src={src}></source>
    </video>
  );
};

Video.defaultProps = {
  autoPause: true,
  autoPlay: false,
  className: ``,
  loop: true,
  muted: true,
  playing: true,
  playsInline: true,
  poster: null,
  src: ``,
  style: {}
};

Video.propTypes = {
  autoPause: PropTypes.bool,
  autoPlay: PropTypes.bool,
  className: PropTypes.string,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  playing: PropTypes.bool,
  playsInline: PropTypes.bool,
  poster: PropTypes.string,
  src: PropTypes.string,
  style: PropTypes.shape({})
};

export default Video;
