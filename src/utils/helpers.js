import React from "react";

export function getRandomIntByRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
}

export function fancyError(error) {
  // eslint-disable-next-line no-console
  console.error(`%c ${error} `, `background: #E83B46; color: #280001`);
}

export function fancyLog(log) {
  // eslint-disable-next-line no-console
  console.log(`%c ${log} `, `background: #BDC6CF; color: #242424`);
}

export function fancyWarning(warning) {
  // eslint-disable-next-line no-console
  console.warn(`%c ${warning} `, `background: #FEDCA2; color: #332A03`);
}

export function shuffleArray(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function splitStringToParagraphs(string, marginRems = 2) {
  const splitText = string.split(/\r?\n/);
  const jsx = [];

  splitText.forEach((row, index) => {
    const rowIndex = index;

    if (row !== ``) {
      jsx.push(
        <p
          key={`split-text-${rowIndex}`}
          className={`relative block mb-${marginRems}`}
        >
          {row}
        </p>
      );
    }
  });

  return jsx;
}
