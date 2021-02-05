import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItemText from 'reactstrap/lib/ListGroupItemText';
import { tagPropType } from 'reactstrap/lib/utils';
import {increment, decrement} from '../actions';

const fetchContacts = () =>
  fetch('https://localhost:5001/api/contacts', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .catch(error => console.error('Unable to get items.', error));

const Home = (props) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts().then(data => setContacts(data));
  });

  const handleDelete = id => {
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

  

  return (
    <div>
        <h1 id="tabelLabel" >Contact List</h1>
        <p>This project is a demonstration of my skills as a full-stuck developer!</p>
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