import React from "react";
import { Button, Input } from "antd";
import {
  EditOutlined,
  AntDesignOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { green, blue } from "@ant-design/colors";
import { deleteTodo, updateTodo } from "../store/store";
import { store } from "../store/store";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ListItem = ({ id, todo }) => {
  const inputRef = useRef();
  const { todo: todosFromStore } = store.getState();
  const dispatch = useDispatch();
  const [readOnly, setReadOnly] = useState(true);
  const [saveVisibility, setSaveVisibility] = useState(true);
  const [currentTodo] = todosFromStore.filter((t) => t.id === id);
  const [inputValue, setInputValue] = useState(currentTodo.todo);
  // console.log(currentTodo);
  const handleEdit = () => {
    setReadOnly((prev) => !prev);
    inputRef.current.focus();
  };
  const handleInputChange = () => {
    // console.log("input change")
    const {
      input: { value },
    } = inputRef.current;

    const { todo } = currentTodo;
    setInputValue(value);
    setSaveVisibility(todo === value);
  };
  const handleSave = (
    _,
    callback = function (alertMessage) {
      setReadOnly(true  )
      alert(alertMessage);
      
    }
  ) => {
    let msg = "message edited";
    try {
      dispatch(updateTodo({ id, todo: inputValue }));
    } catch (err) {
      msg = console.log;
    } 

    callback(msg);
  };
  const handleOnBlur = (e) => {
    if (e.relatedTarget?.dataset.type === `save-btn-${id}`) {
      // console.log("same btn")
      return;
    }
    // console.log("blur")
    // inputRef.current.input.value ="fodsfndsinin"
    setInputValue(todo);

    setSaveVisibility(true);
    setReadOnly(true);
  };
  const handleDelete = () => {
    console.log(id);
    dispatch(deleteTodo({ id }));
  };
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
        style={{
          transition: "border .4s ease",
          ...(readOnly ? readOnlyStyles : activeEditStyles),
        }}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
      <Button
        style={{ backgroundColor: green[4], color: "white" }}
        onClick={handleEdit}
        icon={<EditOutlined />}
      />
      <Button
        style={{
          transition: "opacity .3s ease",
          ...(saveVisibility ? { opacity: 0 } : { opacity: 1 }),
        }}
        onClick={handleSave}
        data-type={`save-btn-${id}`}
        type="primary"
        icon={<SaveOutlined />}
      />
      <Button
        type="primary"
        onClick={handleDelete}
        danger
        icon={<DeleteOutlined />}
      />
    </>
  );
};

export default ListItem;
