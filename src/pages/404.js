/* eslint-disable react/prop-types */
// TODO : figure out propType validation for these

import React, { Component } from "react";
import { Link } from "gatsby";
import Draggable from "react-draggable";
import Layout from "~components/Layout";

class NotFoundComponent extends Component {
  state = {
    mounted: true
  };

  componentDidMount() {
    this.setState({
      mounted: true
    });
  }

  //

  render() {
    return (
      <>
        <Layout
          className={`not-found w-full relative grid ${
            this.state.mounted ? `mounted` : ``
          }`}
        >
          <section className="h-100 grid__colend--29 grid__colend--sm-18 grid__start--11 grid__start--sm-2 relative flex-center flex--column">
            <h1 className="not-found__heading bg-black f1 uppercase white">
              404: Error
            </h1>
          </section>
        </Layout>
      </>
    );
  }
}

const NotFound = () => {
  return <NotFoundComponent />;
};

export default NotFound;
