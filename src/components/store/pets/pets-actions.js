import { types } from './pets-types';

const editPet = (payload) => ({ type: types.edit, payload });
const deletePet = (payload) => ({ type: types.delete, payload });
export { editPet, deletePet };
