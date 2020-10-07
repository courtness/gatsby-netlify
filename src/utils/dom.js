/* eslint-disable import/prefer-default-export */

export function getWindowDimensions() {
  let height = 0;
  let width = 0;

  if (window.innerHeight || document.documentElement || document.body) {
    height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
  }

  if (window.innerWidth || document.documentElement || document.body) {
    width = window.innerWidth || document.documentElement || document.body;
  }

  return {
    width,
    height
  };
}
