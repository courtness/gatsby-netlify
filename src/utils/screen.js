const mobileWidth = 768;
const tabletWidth = 1024;

export function isDesktop() {
  return window.matchMedia(`(min-width: ${tabletWidth + 1}px)`).matches;
}

export function isMobile() {
  return window.matchMedia(`(max-width: ${mobileWidth - 1}px)`).matches;
}

export function isIOS() {
  return !!navigator.platform.match(/iPhone|iPod|iPad/);
}

export function isTablet() {
  return window.matchMedia(
    `(min-width: ${mobileWidth}px) and (max-width: ${tabletWidth}px)`
  ).matches;
}
