import React, { Component } from "react";
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
          className={`not-found w-full relative ${
            this.state.mounted ? `mounted` : ``
          }`}
        >
          <h1 className="f1">404</h1>
        </Layout>
      </>
    );
  }
}

const NotFound = () => {
  return <NotFoundComponent />;
};

export default NotFound;
