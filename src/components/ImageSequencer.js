/* eslint-disable react/prop-types */

import React, { Component, createRef } from "react";

class ImageSequencerComponent extends Component {
  state = {
    frameIndex: 0
  };

  canvas;

  canvasRef = createRef();

  frameInterval;

  img;

  componentDidMount() {
    this.init();
  }

  componentDidUpdate({ frameIndexOverride }) {
    if (frameIndexOverride && frameIndexOverride !== this.state.frameIndex) {
      requestAnimationFrame(() => {
        this.drawImage(frameIndexOverride);
      });
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  //

  init = () => {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext(`2d`);

    this.img = new Image();

    this.img.onload = () => {
      this.canvas.width = this.img.naturalWidth;
      this.canvas.height = this.img.naturalHeight;

      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.drawImage(this.img, 0, 0);
    };
  };

  drawImage = frameIndex => {
    const { frames } = this.props;

    if (!frames) {
      return;
    }

    requestAnimationFrame(() => {
      this.setState(
        {
          frameIndex
        },
        () => {
          const imageSrc = frames[frameIndex].childImageSharp.fluid.src;

          if (imageSrc) {
            this.img.src = imageSrc;
          }
        }
      );
    });
  };

  start = () => {
    const { frames } = this.props;

    if (!frames || !this.canvasRef || !this.canvasRef.current) {
      return;
    }

    this.frameInterval = setInterval(() => {
      requestAnimationFrame(() => {
        this.setState(
          prevState => ({
            frameIndex:
              prevState.frameIndex + 1 < frames.length
                ? prevState.frameIndex + 1
                : 0
          }),
          () => {
            const imageSrc =
              frames[this.state.frameIndex].childImageSharp.fluid.src;

            if (imageSrc) {
              this.img.src = imageSrc;
            }
          }
        );
      });
    }, 100);
  };

  stop = () => {
    clearInterval(this.frameInterval);
  };

  //

  render() {
    return (
      <div className="image-sequencer w-full h-full relative flex items-center justify-center">
        <div className="image-sequencer__canvas w-full relative">
          <canvas
            ref={this.canvasRef}
            className="h-full absolute transform-center"
          ></canvas>
        </div>
      </div>
    );
  }
}

const ImageSequencer = ({ frames, frameIndexOverride }) => {
  return (
    <ImageSequencerComponent
      frames={frames}
      frameIndexOverride={frameIndexOverride}
    />
  );
};

export default ImageSequencer;
