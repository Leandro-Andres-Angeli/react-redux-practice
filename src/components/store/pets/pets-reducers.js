import { idGenerator } from '../../../helpers/idGenerator';
import { types } from './pets-types';

const initialState = [
  { id: idGenerator(), name: 'dog' },
  { id: idGenerator(), name: 'cat' },
  { id: idGenerator(), name: 'fish' },
];

export const petsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.edit:
      return state.map((pet) =>
        pet.id === action.payload.id ? { ...pet, ...action.payload } : pet
      );

    case types.delete:
      return state.filter((pet) => pet.id !== action.payload.id);

    default:
      return state;
  }
};
