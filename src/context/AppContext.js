import React, { Component, createContext } from "react";
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

  //
  // React lifecycle

  componentDidMount() {
    setTimeout(() => {
      this.updateWindowDimensions();
    });

    document.removeEventListener(`mousemove`, this.updateCursorPosition, false);
    document.removeEventListener(`resize`, this.updateWindowDimensions, false);
    document.removeEventListener(`scroll`, this.updateScrollTop, false);

    document.addEventListener(`mousemove`, this.updateCursorPosition, false);
    document.addEventListener(`scroll`, this.updateScrollTop, false);

    window.addEventListener(`resize`, this.updateWindowDimensions, false);
  }

  componentWillUnmount() {
    document.removeEventListener(`mousemove`, this.updateCursorPosition, false);
    document.removeEventListener(`resize`, this.updateWindowDimensions, false);
    document.removeEventListener(`scroll`, this.updateScrollTop, false);
  }

  //
  // listeners

  updateCursorPosition = event => {
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

  updateScrollTop = e => {
    this.setState({
      scrollTop: e.target.scrollingElement.scrollTop
    });
  };

  updateWindowDimensions = () => {
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
  // API

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
