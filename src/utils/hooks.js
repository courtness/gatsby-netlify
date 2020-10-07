import { useEffect, useRef, useState } from "react";

export const useInterval = (callback, delay) => {
  const savedCallback = useRef(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);

      return () => clearInterval(interval);
    }

    return undefined;
  }, [delay]);
};

export const useKeyPress = targetKey => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener(`keydown`, downHandler);
    window.addEventListener(`keyup`, upHandler);
    return () => {
      window.removeEventListener(`keydown`, downHandler);
      window.removeEventListener(`keyup`, upHandler);
    };
  }, []);

  return keyPressed;
};

export const useTimeout = (
  callback,
  timeout = 0,
  { renderCancel = false } = {}
) => {
  let timeoutId;

  const cancel = () => timeoutId && clearTimeout(timeoutId);

  useEffect(
    () => {
      timeoutId = setTimeout(callback, timeout);

      return cancel;
    },
    !renderCancel
      ? [setTimeout, clearTimeout]
      : [callback, timeout, setTimeout, clearTimeout]
  );

  return cancel;
};
