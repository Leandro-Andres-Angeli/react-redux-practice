import { combineReducers, compose, createStore } from "redux";
import { listItemFunction } from "../../helpers/listItemGenerator";
import { usersListReducer } from "./users-list-store/usersListReducers";

export const types = {
  showList: "[Todo List] show list",
  addTodo: "[Todo List] addTodo",
  updateTodo: "[Todo List] update Todo",
  deleteTodo:"[Todo List] delete Todo"
};
//ACTIONS
export const addTodo = (payload) => ({ type: types.addTodo, payload });
export const updateTodo = (payload) => ({ type: types.updateTodo, payload });
export const showList = () => ({ type: types.showList });
export const deleteTodo = (payload) => ({ type: types.deleteTodo ,payload });

//ACTIONS
//REDUCERS
export const userReducer = (state = { user: "none" }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const todoReducer = (
  state = [
    listItemFunction("tarea 1"),
    listItemFunction("tarea-2"),
    listItemFunction("tarea-3"),
  ],
  action
) => {
  switch (action.type) {
    case types.showList:
      return state;

    case types.addTodo:
      return [...state, action.payload];

    case types.updateTodo:
      return state.map((listItem) =>
        listItem.id === action.payload.id
          ? {
              ...listItem,
              todo: action.payload.todo,
            }
          : listItem
      );
      case types.deleteTodo:
       
         return state.filter(({id})=> id !== action.payload.id)
    default:
      return state;
  }
};
//REDUCERS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({ todo: todoReducer, user: userReducer,usersList:usersListReducer });

export const store = createStore(reducers, composeEnhancers());
