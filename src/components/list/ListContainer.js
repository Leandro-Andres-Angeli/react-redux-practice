import React from 'react'
import { useSelector } from 'react-redux'
import { store } from '../store/store'

const ListContainer = () => {
    const todo = useSelector((state)=>state)
    console.log(todo)
  return (
    <div>ListContainer</div>
  )
}

export default ListContainer