/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import "lazysizes";

import React from "react";
import AppProvider from "~context/AppContext";
import CursorProvider from "~context/CursorContext";
import DocumentProvider from "~context/DocumentContext";

import "~scss/index.scss";

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <DocumentProvider>
        <CursorProvider>
          <AppProvider>{element}</AppProvider>
        </CursorProvider>
      </DocumentProvider>
    </>
  );
};
