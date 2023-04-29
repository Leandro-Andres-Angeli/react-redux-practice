import React from 'react'
import { useSelector } from 'react-redux'

import ListItem from './ListItem'
import { List } from 'antd';

const ListContainer = () => {
    const {todo }= useSelector((state)=>state)
   
  return (
    <>
   
    <List   header={<div>Todo List</div>} 
    
    bordered
    dataSource={todo}
    renderItem={({id,todo}) => (
      <List.Item key={id} style={{justifyContent:"start",gap:"10px",textTransform:"capitalize"}}>
        <ListItem {...{id,todo}}></ListItem>
      
      </List.Item>
    )}>
     
    </List>
    </>
  )
}

export default ListContainer