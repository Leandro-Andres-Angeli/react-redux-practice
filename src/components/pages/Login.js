import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from './../store/store';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    const { target } = e;
    const {
      role: { value: roleValue },
      name: { value: nameValue },
      password: { value: passwordValue },
    } = target;
    console.log(roleValue, nameValue, passwordValue);
    dispatch(
      login({
        name: nameValue,
        role: roleValue,
        password: passwordValue,
      })
    );
    const route = () => (roleValue === 'admin' ? '/admin' : '/');
    history.push(route());
  };
  return (
    <div>
      <form className='p-5 m-5 border' onSubmit={handleLogin}>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Name
          </label>
          <input type='text' name='name' required className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            required
            type='password'
            name='password'
            className='form-control'
            id='exampleInputPassword1'
          />
        </div>
        <select name='role' className='form-select mb-2'>
          <option value='user'>user</option>
          <option value='admin'>admin</option>
        </select>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
