import React, { Component, createContext } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext({});

class AppProvider extends Component {
  state = {
    menuActive: false
  };

  //

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log(`%c <3 + $ `, `background: #000000; color: #00ff00`);
  }

  //

  setMenuActive = menuActive => {
    this.setState({
      menuActive
    });
  };

  //

  render() {
    return (
      <AppContext.Provider
        value={{
          menuActive: this.state.menuActive,
          //
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
