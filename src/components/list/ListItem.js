import React from "react";
import { Button, Input, Typography } from "antd";
import { EditOutlined, AntDesignOutlined,SaveOutlined } from "@ant-design/icons";
import { green, blue } from "@ant-design/colors";
import { getState } from "redux";
import { store } from "../store/store";
import { useRef } from "react";
import { useState } from "react";
const ListItem = ({ id, todo }) => {
  const { todo: todosFromStore } = store.getState();
  const inputRef = useRef();
  const [readOnly, setReadOnly] = useState(true);
  const [saveVisibility, setSaveVisibility] = useState(true);
  const [currentTodo] = todosFromStore.filter((t) => t.id === id);
  // console.log(currentTodo);
  const handleEdit = () => {
    setReadOnly((prev) => !prev);
    inputRef.current.focus();
  };
  const handleInputChange =()=>{
    console.log("input change")
     const {input : {value}} = inputRef.current;
      
     const {todo} = currentTodo 
     setSaveVisibility( todo === value   )
  }
  const handleSave = ()=>{
    console.log("save")
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
        defaultValue={todo}
        style={{ transition:"border .4s ease",...readOnly ? readOnlyStyles : activeEditStyles}}
        ref={inputRef}
        onBlur = {()=>(setSaveVisibility((true)),(setReadOnly(true)))}
      />
      <Button
        style={{ backgroundColor: green[4], color: "white" }}
        onClick={handleEdit}
        icon={<EditOutlined />}
      />
      <Button
        style={{transition:"opacity .3s ease",...saveVisibility ? {opacity:0} :{ opacity:1} }}
        onClick={handleSave}
        type="primary"
        icon={<SaveOutlined />}
      />
    </>
  );
};

export default ListItem;
