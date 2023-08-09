import React from 'react';
import { IFilterButtonProps } from '../interfaces';

export default function FilterButton(props: IFilterButtonProps) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressesd}
      onClick={() => {
        props.setFilter(props.name);
      }}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}
