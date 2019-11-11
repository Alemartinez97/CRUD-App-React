import {SET_FORM,EDIT_PERSON,DELETE_PERSON,ADD_PERSON} from '../constant/actions-types';

const person = (state = [], action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_FORM:
      return [...state, payload];
      case ADD_PERSON:
        return payload;
      case DELETE_PERSON:
        return state.filter(person => person.id !== payload.id);
      case EDIT_PERSON:
        return state.map(person => {
          if (payload.id === person.id) {
            return payload;
          }
          return person;
        });
    default:
      return state;
  }
};
export default person;
