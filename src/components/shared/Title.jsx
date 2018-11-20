import React from 'react';

export default function Title({ node, path, onChange }) {
  const onChangeHandler = (event) => onChange({ event, node, path });
  return <input value={node.title} onChange={onChangeHandler} />;
}
