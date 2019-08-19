/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react";
import "lazysizes";

import AppProvider from "~context/AppContext";

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <AppProvider>
        {element}
      </AppProvider>
    </>
  );
};
