import { useState } from "react";
import { Typography  } from 'antd';
import ListContainer from "./components/list/ListContainer";


export default function App() {
  const {Title} =Typography
  return(
    <div >
    <Title >React Redux Practice</Title>
    <div>
      <Title level={2}>To Do list with Redux</Title>
      <ListContainer></ListContainer>
    </div>
    </div>);
}
