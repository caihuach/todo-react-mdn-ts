import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { IFormProps } from '../interfaces';

function Form(props: IFormProps) {
  const [name, setName] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = function (e) {
    setName(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = function (e) {
    e.preventDefault();
    if (!name.length) {
      return;
    }
    props.addTask(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
