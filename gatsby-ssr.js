/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react";
import "lazysizes";

import AppProvider from "~context/AppContext";

import "~scss/index.scss";

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <AppProvider>{element}</AppProvider>
    </>
  );
};

if (typeof window === `undefined`) {
  global.window = {
    addEventListener: () => {},
    matchMedia: () => {
      return { matches: true };
    },
    navigator: {},
    removeEventListener: () => {},
    server: true
  };
}

if (typeof document === `undefined`) {
  global.document = {};
}
