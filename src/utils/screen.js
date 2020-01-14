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

export function ieDetector() {
  const ua = window.navigator.userAgent;

  const msie = ua.indexOf(`MSIE `);
  if (msie > 0) {
    return parseInt(ua.substring(msie + 5, ua.indexOf(`.`, msie)), 10);
  }

  const trident = ua.indexOf(`Trident/`);
  if (trident > 0) {
    const rv = ua.indexOf(`rv:`);
    return parseInt(ua.substring(rv + 3, ua.indexOf(`.`, rv)), 10);
  }

  const edge = ua.indexOf(`Edge/`);
  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, ua.indexOf(`.`, edge)), 10);
  }

  return false;
}
