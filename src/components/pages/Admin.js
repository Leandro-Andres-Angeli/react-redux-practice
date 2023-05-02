import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { idGenerator } from '../../helpers/idGenerator';
import { addPet, deletePet, editPet } from '../store/pets/pets-actions';
const PetForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    const formData = Object.fromEntries(new FormData(target));
    // console.log(formData);
    dispatch(addPet({ id: idGenerator(), ...formData }));
    target.reset();
  };
  return (
    <form onSubmit={handleSubmit} className='p-3 m-3 '>
      <label>Name</label>
      <hr />
      <input className='form-control' type='text' name='name' />
      <div className='container my-2'>
        <button className='btn btn-primary' type='submit'>
          add
        </button>
      </div>
    </form>
  );
};
const Pet = ({ pet }) => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    dispatch(editPet({ id: pet.id, name }));
  };
  const handleDelete = () => {
    dispatch(deletePet({ id: pet.id }));
  };
  return (
    <li className='list-group-item p-2 m-4'>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <hr />
        <input
          className='form-control'
          type='text'
          name='name'
          defaultValue={pet.name}
        />
        <div className='container my-2'>
          <button className='btn btn-info' type='submit'>
            edit
          </button>
          <button className='btn btn-danger ms-2' onClick={handleDelete}>
            delete
          </button>
        </div>
      </form>
    </li>
  );
};
const Admin = () => {
  const { pets } = useSelector((state) => state);
  // console.log(pets);
  return (
    <div>
      <PetForm></PetForm>
      <ul className='list-group'>
        {pets.map((pet) => (
          <Pet key={pet.id} pet={pet} />
        ))}
      </ul>
    </div>
  );
};

export default Admin;
