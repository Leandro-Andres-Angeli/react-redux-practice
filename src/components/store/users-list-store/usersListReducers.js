import { users } from '../../../data/usersData';
import types from './usersListTypes';

export const usersListReducer = (state = users, action) => {
  switch (action.type) {
    case types.editUser:
      return state.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
    case types.deleteUser:
      return state.filter((user) => user.id !== action.payload.id);
    case types.addUser:
      console.log('in');
      return [action.payload, ...state];
    default:
      return state;
  }
};
