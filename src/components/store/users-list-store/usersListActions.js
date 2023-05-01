import types from './usersListTypes';
export const getUsersList = () => ({ type: types.getUsersList });
export const editUserFromList = (payload) => ({
  type: types.editUser,
  payload,
});
export const deleteUserFromList = (payload) => ({
  type: types.deleteUser,
  payload,
});
export const addUserToList = (payload) => ({
  type: types.addUser,
  payload,
});
