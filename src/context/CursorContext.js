import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import { getWindowDimensions } from "~utils/dom";

export const CursorContext = createContext({});

class CursorProvider extends Component {
  state = {
    cursorCenterDeltaX: 0, // 0 at center, -0.5/0.5 at edges
    cursorCenterDeltaY: 0, // 0 at center, -0.5/0.5 at edges
    cursorPositionX: 0,
    cursorPositionY: 0,
    windowHeight: 0, // TODO : remove
    windowWidth: 0 // TODO : remove
  };

  //

  componentDidMount() {
    if (document) {
      document.addEventListener(
        `mousemove`,
        _.throttle(this.handleMousemove),
        false
      );
    }

    if (window) {
      window.addEventListener(`resize`, _.throttle(this.handleResize), false);

      setTimeout(() => {
        this.handleResize();
      });
    }
  }

  //

  handleMousemove = event => {
    this.setState(prevState => ({
      cursorCenterDeltaX: -(0.5 - event.pageX / prevState.windowWidth),
      cursorPositionX: event.pageX,
      cursorCenterDeltaY: -(
        0.5 -
        (event.pageY - window.pageYOffset) / prevState.windowHeight
      ),
      cursorPositionY: event.pageY - window.pageYOffset
    }));
  };

  handleResize = () => {
    this.setState({
      windowWidth: getWindowDimensions().width,
      windowHeight: getWindowDimensions().height
    });
  };

  //

  render() {
    return (
      <CursorContext.Provider
        value={{
          cursorCenterDeltaX: this.state.cursorCenterDeltaX,
          cursorCenterDeltaY: this.state.cursorCenterDeltaY,
          cursorPositionX: this.state.cursorPositionX,
          cursorPositionY: this.state.cursorPositionY,
          windowWidth: this.state.windowWidth,
          windowHeight: this.state.windowHeight
        }}
      >
        {this.props.children}
      </CursorContext.Provider>
    );
  }
}

CursorProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CursorProvider;
