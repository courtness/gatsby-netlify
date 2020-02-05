import React, { Component, createContext } from "react";
import _ from "underscore";
import PropTypes from "prop-types";
import { getWindowDimensions } from "~utils/dom";

export const AppContext = createContext({});

class AppProvider extends Component {
  state = {
    cursorCenterDeltaX: 0, // 0 at center, -0.5/0.5 at edges
    cursorCenterDeltaY: 0, // 0 at center, -0.5/0.5 at edges
    cursorPositionX: 0,
    cursorPositionY: 0,
    device: ``,
    documentHeight: 0,
    scrollTop: 0,
    windowWidth: 0,
    windowHeight: 0,

    //

    cart: [],
    cartActive: false,
    dark: false,
    menuActive: false
  };

  mobileWidth = 768;

  tabletWidth = 1024;

  throttledHandleMousemove;

  throttledHandleResize;

  throttledHandleScroll;

  //

  componentDidMount() {
    this.throttledHandleMousemove = _.throttle(this.handleMousemove);
    this.throttledHandleResize = _.throttle(this.handleResize);
    this.throttledHandleScroll = _.throttle(this.handleScroll);

    if (document) {
      document.addEventListener(
        `mousemove`,
        this.throttledHandleMousemove,
        false
      );
      document.addEventListener(`scroll`, this.throttledHandleScroll, false);
    }

    if (window) {
      window.addEventListener(`resize`, this.throttledHandleResize, false);

      setTimeout(() => {
        this.handleResize();
      });
    }
  }

  componentWillUnmount() {
    if (document) {
      document.removeEventListener(
        `mousemove`,
        this.throttledHandleMousemove,
        false
      );
      document.removeEventListener(`scroll`, this.throttledHandleScroll, false);
    }

    if (window) {
      window.removeEventListener(`resize`, this.throttledHandleScroll, false);
    }
  }

  //

  handleMousemove = e => {
    this.setState(prevState => ({
      cursorCenterDeltaX: -(0.5 - e.pageX / prevState.windowWidth),
      cursorPositionX: e.pageX,
      cursorCenterDeltaY: -(
        0.5 -
        (e.pageY - window.pageYOffset) / prevState.windowHeight
      ),
      cursorPositionY: e.pageY - window.pageYOffset
    }));
  };

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

  setCart = cart => {
    this.setState({
      cart
    });
  };

  setDark = dark => {
    this.setState({
      dark
    });
  };

  setCartActive = cartActive => {
    this.setState({
      cartActive
    });
  };

  setMenuActive = menuActive => {
    this.setState({
      menuActive
    });
  };

  //
  // render/wrapper

  render() {
    return (
      <AppContext.Provider
        value={{
          cursorCenterDeltaX: this.state.cursorCenterDeltaX,
          cursorCenterDeltaY: this.state.cursorCenterDeltaY,
          cursorPositionX: this.state.cursorPositionX,
          cursorPositionY: this.state.cursorPositionY,
          device: this.state.device,
          documentHeight: this.state.documentHeight,
          scrollTop: this.state.scrollTop,
          windowWidth: this.state.windowWidth,
          windowHeight: this.state.windowHeight,
          //
          cart: this.state.cart,
          cartActive: this.state.cartActive,
          dark: this.state.dark,
          menuActive: this.state.menuActive,
          //
          setCartActive: this.setCartActive,
          setDark: this.setDark,
          setMenuActive: this.setMenuActive
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppProvider;
