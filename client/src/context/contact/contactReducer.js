import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT_CONTACT,
  CLEAR_CURRENT_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, payload] };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === payload.id ? payload : contact
        )
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== payload)
      };
    case SET_CURRENT_CONTACT:
      return { ...state, currentContact: payload };
    case CLEAR_CURRENT_CONTACT:
      return { ...state, currentContact: null };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${payload}`, `gi`);
          return contact.name.match(regex) || contact.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return { ...state, filtered: null };
    // case GET_CONTACTS:
    //   return { ...state, contacts: payload };
    // case CONTACT_ERROR:
    //   return {
    //     ...state,
    //     error: payload
    //   };
    default:
      return state;
  }
};
