export function getDimensions(el) {
  let found;
  let left = 0;
  let top = 0;
  let width = 0;
  let height = 0;
  let { offsetBase } = getDimensions;

  if (!offsetBase && document.body) {
    // eslint-disable-next-line no-multi-assign
    offsetBase = getDimensions.offsetBase = document.createElement(`div`);

    offsetBase.style.cssText = `position:absolute;left:0;top:0`;
    document.body.appendChild(offsetBase);
  }

  if (
    el &&
    el.ownerDocument === document &&
    `getBoundingClientRect` in el &&
    offsetBase
  ) {
    const boundingRect = el.getBoundingClientRect();
    const baseRect = offsetBase.getBoundingClientRect();

    found = true;
    left = boundingRect.left - baseRect.left;
    top = boundingRect.top - baseRect.top;
    width = boundingRect.right - boundingRect.left;
    height = boundingRect.bottom - boundingRect.top;
  }

  return {
    found,
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height
  };
}

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

export function query(selector, context) {
  context = context || document;

  if (/^(#?[\w-]+|\.[\w-.]+)$/.test(selector)) {
    switch (selector.charAt(0)) {
      case `#`:
        return [context.getElementById(selector.substr(1))];
      case `.`:
        return [].slice.call(
          context.getElementsByClassName(selector.substr(1).replace(/\./g, ` `))
        );
      default:
        return [].slice.call(context.getElementsByTagName(selector));
    }
  }

  return [].slice.call(context.querySelectorAll(selector));
}
