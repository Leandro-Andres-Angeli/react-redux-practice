import { types } from './pets-types';

const editPet = (payload) => ({ type: types.edit, payload });
const deletePet = (payload) => ({ type: types.delete, payload });
const addPet = (payload) => ({ type: types.add, payload });
export { editPet, deletePet, addPet };
