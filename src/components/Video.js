import React, { Component, createRef, useContext } from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import { DocumentContext } from "~context/DocumentContext";

class VideoComponent extends Component {
  listening = false;

  throttledHandleScroll;

  videoRef = createRef();

  componentDidMount() {
    if (window) {
      this.throttledHandleScroll = _.throttle(this.handleScroll);

      window.addEventListener(`scroll`, this.throttledHandleScroll, false);
    }
  }

  componentDidUpdate() {
    if (this.videoRef && this.videoRef.current && !this.listening) {
      this.addVideoPlaybackListener();
    }
  }

  componentWillUnmount() {
    if (this.videoRef.current) {
      this.videoRef.current.onpause = null;
      this.videoRef.current.onplaying = null;
    }

    if (window) {
      window.removeEventListener(`scroll`, this.throttledHandleScroll, false);
    }
  }

  //

  addVideoPlaybackListener = () => {
    this.listening = true;

    this.videoRef.current.onpause = () => {
      this.videoRef.current.playing = false;
    };

    this.videoRef.current.onplaying = () => {
      this.videoRef.current.playing = true;
    };
  };

  handleScroll = () => {
    if (!this.videoRef || !this.videoRef.current) {
      return;
    }

    const video = this.videoRef.current;
    const { documentContext } = this.props;
    const { windowHeight } = documentContext;
    const { height, top } = video.getBoundingClientRect();

    if (top > -height && top < windowHeight) {
      if (!video.playing) {
        video.play();
      }
    } else if (video.playing) {
      video.pause();
    }
  };

  //

  render() {
    const {
      autoPlay,
      className,
      muted,
      loop,
      playsInline,
      poster,
      src
    } = this.props;

    return (
      <video
        ref={this.videoRef}
        className={className}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        poster={poster}
      >
        <source src={src}></source>
      </video>
    );
  }
}

VideoComponent.propTypes = {
  autoPlay: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  documentContext: PropTypes.shape({
    windowHeight: PropTypes.number.isRequired
  }).isRequired,
  muted: PropTypes.bool.isRequired,
  loop: PropTypes.bool.isRequired,
  playsInline: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

const Video = ({
  autoPlay,
  className,
  muted,
  loop,
  playsInline,
  poster,
  src
}) => {
  const documentContext = useContext(DocumentContext);

  return (
    <VideoComponent
      autoPlay={autoPlay}
      className={className}
      documentContext={documentContext}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      poster={poster}
      src={src}
    />
  );
};

Video.defaultProps = {
  autoPlay: false,
  className: ``,
  muted: true,
  loop: true,
  playsInline: true,
  poster: null,
  src: ``
};

Video.propTypes = {
  autoPlay: PropTypes.bool,
  className: PropTypes.string,
  muted: PropTypes.bool,
  loop: PropTypes.bool,
  playsInline: PropTypes.bool,
  poster: PropTypes.string,
  src: PropTypes.string
};

export default Video;
