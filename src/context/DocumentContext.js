import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import { getWindowDimensions } from "~utils/dom";

export const DocumentContext = createContext({});

class DocumentProvider extends Component {
  state = {
    device: ``,
    documentHeight: 0,
    scrollTop: 0,
    windowHeight: 0,
    windowWidth: 0
  };

  mobileWidth = 768;

  tabletWidth = 1024;

  //

  componentDidMount() {
    if (document) {
      document.addEventListener(`scroll`, _.throttle(this.handleScroll), false);
    }

    if (window) {
      window.addEventListener(`resize`, _.throttle(this.handleResize), false);

      setTimeout(() => {
        this.handleResize();
      });
    }
  }

  //

  handleScroll = e => {
    this.setState({
      scrollTop: e.target.scrollingElement.scrollTop
    });
  };

  handleResize = () => {
    let device = `desktop`;

    if (
      window.matchMedia(
        `(min-width: ${this.mobileWidth}px) and (max-width: ${this.tabletWidth}px)`
      ).matches
    ) {
      device = `tablet`;
    } else if (
      window.matchMedia(`(max-width: ${this.mobileWidth - 1}px)`).matches
    ) {
      device = `mobile`;
    }

    this.setState({
      device,
      documentHeight: document.documentElement.offsetHeight,
      windowWidth: getWindowDimensions().width,
      windowHeight: getWindowDimensions().height
    });
  };

  //

  render() {
    return (
      <DocumentContext.Provider
        value={{
          device: this.state.device,
          documentHeight: this.state.documentHeight,
          scrollTop: this.state.scrollTop,
          windowWidth: this.state.windowWidth,
          windowHeight: this.state.windowHeight
        }}
      >
        {this.props.children}
      </DocumentContext.Provider>
    );
  }
}

DocumentProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default DocumentProvider;
