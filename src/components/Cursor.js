import React, { useContext } from "react";
import { AppContext } from "~context/AppContext";
import { CursorContext } from "~context/CursorContext";

const Cursor = () => {
  const { cursorColor, cursorMode } = useContext(AppContext);
  const { cursorPositionX, cursorPositionY } = useContext(CursorContext);

  //

  return (
    <div
      className={`cursor ${
        cursorMode ? `cursor--${cursorMode}` : ``
      } cursor--bg-${cursorColor} fixed top-0 left-0 z-50 rounded-full pointer-events-none`}
      style={{
        transform: `translate3d(${cursorPositionX}px, ${cursorPositionY}px, 0)`
      }}
    ></div>
  );
};

export default Cursor;
