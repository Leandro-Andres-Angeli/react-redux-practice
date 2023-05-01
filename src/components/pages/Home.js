import Title from 'antd/es/skeleton/Title';
import React from 'react';
import FormComponent from '../FormComponent';
import ListContainer from '../list/ListContainer';
// import Navbar from '../Navbar'

const Home = () => {
  return (
    <div>
      <FormComponent></FormComponent>
      <Title>React Redux Practice</Title>
      <div>
        <Title level={2}>To Do list with Redux</Title>
        <ListContainer></ListContainer>
      </div>
    </div>
  );
};

export default Home;
