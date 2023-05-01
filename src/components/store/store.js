import { combineReducers, compose, createStore } from 'redux';
import { listItemFunction } from '../../helpers/listItemGenerator';
import { petsReducer } from './pets/pets-reducers';
import { usersListReducer } from './users-list-store/usersListReducers';
import Login from './../pages/Login';

export const types = {
  showList: '[Todo List] show list',
  addTodo: '[Todo List] addTodo',
  updateTodo: '[Todo List] update Todo',
  deleteTodo: '[Todo List] delete Todo',
};
//ACTIONS
export const addTodo = (payload) => ({ type: types.addTodo, payload });
export const updateTodo = (payload) => ({ type: types.updateTodo, payload });
export const showList = () => ({ type: types.showList });
export const deleteTodo = (payload) => ({ type: types.deleteTodo, payload });
export const loginTypes = {
  login: '[user] login',
  logout: '[user] logout',
};
export const login = (payload) => ({ type: loginTypes.login, payload });
export const logout = () => ({ type: loginTypes.logout });
//ACTIONS
//REDUCERS
export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case loginTypes.login:
      return action.payload;
    case loginTypes.logout:
      return {};
    default:
      return state;
  }
};
export const todoReducer = (
  state = [
    listItemFunction('tarea 1'),
    listItemFunction('tarea-2'),
    listItemFunction('tarea-3'),
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
      return state.filter(({ id }) => id !== action.payload.id);
    default:
      return state;
  }
};
//REDUCERS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
  todo: todoReducer,
  user: userReducer,
  usersList: usersListReducer,
  pets: petsReducer,
});

export const store = createStore(reducers, composeEnhancers());
