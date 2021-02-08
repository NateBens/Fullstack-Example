import React, { useState, useEffect } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
//import ListGroup from 'reactstrap/lib/ListGroup';
//import ListGroupItemText from 'reactstrap/lib/ListGroupItemText';
//import { tagPropType } from 'reactstrap/lib/utils';
//import {increment, decrement} from '../actions';
import AddContact from './AddContact';
import { useFetchContacts, useFetchGroups } from './Fetch';

const Home = (props) => {
  const [contacts, setContacts] = useState([]);
  const [addingContact, setAddingContact] = useState(false);
  const [fetchedcontacts, isFetching] = useFetchContacts();

  useEffect(() => {
    if (contacts && contacts.length < 1) {
      setContacts(fetchedcontacts);
    }
  }, [contacts,fetchedcontacts]);

  const addContact = contact => {
    setContacts({...contacts,contact});
    setAddingContact(false);
  }

  const AddContactForm = () => {
    // if adding contact show button, else show AddContact component.
    if (addingContact) {
      return ( <AddContact addContact={addContact}/> )
    } else {
      return ( <button onClick={() => {setAddingContact(true)}}>Add Contact</button> )
    }
  }

  const handleDelete = id => { //likely needs to be reworked to be in line with add
    console.log('id ' + id)
    fetch('https://localhost:5001/api/contacts/'+ id, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(alert('Contact ' + id + ' was deleted!'))
    .then(setContacts(contacts.filter(contact => contact.id !== id)))
    .catch(error => console.error('Unable to delete contact.', error));
    //fetchContacts();

  };

  const handleEdit = contact => {
    props.history.push({
      pathname: '/edit',
      data: contact
    })
  };

  
  if (isFetching) {
    return <div>Fetching Contacts...</div>
  }
  console.log(contacts);
  return (
    <div>
        <h1 id="tabelLabel" >Contact List</h1>
        <p>This project is a demonstration of my skills as a full-stuck developer!</p>
        <AddContactForm />
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Name</th>
              <th>Birthdate</th>
              <th>Group</th>
              <th>Description</th>
              <th>Favorite</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts && contacts.map(contact => (
              <tr key={contact.name}>
                <td>{contact.name}</td>
                <td>{contact.birthdate}</td>
                <td>{contact.contactGroup}</td>
                <td>{contact.description}</td>
                <td>{contact.favorite.toString()}</td>
                <td>{contact.createdAt}</td>
                <td>{contact.updatedAt}</td>
                <td name="edit"><button onClick={() => handleEdit(contact)}>Edit</button></td>
                <td name="delete"><button onClick={() => handleDelete(contact.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )

};

export default Home;