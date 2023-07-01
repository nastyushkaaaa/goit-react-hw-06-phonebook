import { nanoid } from 'nanoid';
import { Form } from './Form';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import useLocalStorage from '../hooks/useLocalStorage';

export function App() {
  const { contacts, filter, addContact, deleteContact, setFilter } =
    useLocalStorage();

  function handleDeleteContact(id) {
    deleteContact(id);
  }

  function formSubmitHandler({ name, number }) {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    if (
      !contacts.some(existingContact => existingContact.name === contact.name)
    ) {
      addContact(contact);
    } else {
      alert(contact.name + ' is already in contacts!');
    }
  }

  function changeFilter(e) {
    setFilter(e.currentTarget.value);
  }

  const normalizedFilter = filter.toLocaleLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div>
      <Form onSubmit={formSubmitHandler} />
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        list={visibleContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}
