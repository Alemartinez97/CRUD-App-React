import {SET_FORM, EDIT_PERSON,DELETE_PERSON,ADD_PERSON} from '../constant/actions-types';

export const setPerson = payload => {
  return {type: SET_FORM, payload};
};
export const deletePerson = payload =>
{
  return {type: DELETE_PERSON, payload};
}
export const editPerson = payload =>
{
  return {type: EDIT_PERSON, payload};
}
export const addPerson = payload =>
{
  return {type: ADD_PERSON, payload};
}