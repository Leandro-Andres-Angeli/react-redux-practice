import React from "react";
import { Button, Input, Typography } from "antd";
import { EditOutlined, AntDesignOutlined,SaveOutlined } from "@ant-design/icons";
import { green, blue } from "@ant-design/colors";
import { getState } from "redux";
import { store } from "../store/store";
import { useRef } from "react";
import { useState } from "react";
const ListItem = ({ id, todo }) => {
  const inputRef = useRef()
  const { todo: todosFromStore } = store.getState();
   
  const [readOnly, setReadOnly] = useState(true);
  const [saveVisibility, setSaveVisibility] = useState(true);
  const [currentTodo] = todosFromStore.filter((t) => t.id === id);
  const [inputValue, setInputValue] = useState(currentTodo.todo)
  // console.log(currentTodo);
  const handleEdit = () => {
    setReadOnly((prev) =>  !prev);
    inputRef.current.focus();
    
  };
  const handleInputChange =()=>{
    // console.log("input change")
     const {input : {value}} = inputRef.current;
          
     const {todo} = currentTodo
     setInputValue(value) 
     setSaveVisibility( todo === value   )
  }
  const handleSave = ()=>{
    console.log("save")
  }
  const handleOnBlur = (e)=>{
    if( e.relatedTarget.dataset.type === `save-btn-${id}` ){
      console.log("same btn")
      return
    }
    console.log("blur")
    // inputRef.current.input.value ="fodsfndsinin"
    setInputValue(todo)
  
    setSaveVisibility(true);
      setReadOnly(true);
     
    }
  const readOnlyStyles = { border: "none" };
  const activeEditStyles = { border: `1px solid ${blue[3]}` };
  return (
    <>
      {" "}
      <AntDesignOutlined />
      <Input
        readOnly={readOnly}
        bordered={false}
        onChange={handleInputChange}
        value={inputValue}

        style={{ transition:"border .4s ease",...readOnly ? readOnlyStyles : activeEditStyles}}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
      <Button
        style={{ backgroundColor: green[4], color: "white" }}
        onClick={handleEdit}
        icon={<EditOutlined />}
      />
      <Button
        style={{transition:"opacity .3s ease",...saveVisibility ? {opacity:0} :{ opacity:1} }}
        onClick={handleSave}
        data-type={`save-btn-${id}`}
        type="primary"
        icon={<SaveOutlined />}
      />
    </>
  );
};

export default ListItem;
