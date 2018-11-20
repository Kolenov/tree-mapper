import React from 'react';

export default function Button({ path, text, onClick }) {
  const clickHandler = () => onClick(path);
  return <button onClick={clickHandler}>{text}</button>;
}
