import { useSelector, useDispatch } from 'react-redux';
import {
  addToContacts,
  deleteContact,
  filterContacts,
} from '../redux/contactSlice';

export default function useLocalStorage() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  const handleAddContact = newContact => dispatch(addToContacts(newContact));
  const handleDeleteContact = id => dispatch(deleteContact(id));
  const handleSetFilter = value => dispatch(filterContacts(value));

  return {
    contacts,
    filter,
    addContact: handleAddContact,
    deleteContact: handleDeleteContact,
    setFilter: handleSetFilter,
  };
}
