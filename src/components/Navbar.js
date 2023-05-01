import React from 'react';
import { blue } from '@ant-design/colors';
import Typography from 'antd/es/typography/Typography';
import { List } from 'antd';
import '../styles/navbar-styles.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/store';

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const getRole = useSelector((state) => state.user.role);
  const links = [
    { link: 'todo-list', path: '/' },
    { link: 'users-list', path: '/users' },
  ];
  getRole === 'admin' && links.push({ link: 'admin', path: '/admin' });
  !getRole && links.push({ link: 'login', path: '/login' });
  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };
  return (
    <nav
      className='navbar'
      style={{ backgroundColor: blue[5], padding: '1rem', color: 'white' }}
    >
      <Typography.Title level={3} style={{ color: 'white' }}>
        Redux And Reducer Practice
      </Typography.Title>
      <List
        className='navbar-ul'
        dataSource={links}
        renderItem={({ link, path }) => (
          <List.Item>
            <NavLink
              activeStyle={{
                fontWeight: 'bold',
                color: 'red',
              }}
              exact
              style={{ color: 'white' }}
              to={path}
            >
              {link}
            </NavLink>
          </List.Item>
        )}
      />
      {getRole && (
        <button className='btn btn-info btn-small' onClick={handleLogout}>
          logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
