import React from "react";
import PropTypes from "prop-types";
import Header from "~components/Header";
import Footer from "~components/Footer";
import Nav from "~components/Nav";

const Layout = ({ children, className }) => (
  <>
    <Nav />

    <Header />

    <main className={`layout ${className}`}>{children}</main>

    <Footer />
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
};
