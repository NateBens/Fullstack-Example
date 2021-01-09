import React, { Component } from 'react';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItemText from 'reactstrap/lib/ListGroupItemText';
import { tagPropType } from 'reactstrap/lib/utils';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { contacts: [], editing: false };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.populateContacts();
  }

  handleDelete(id) {
    fetch('https://localhost:5001/api/contacts/'+ id, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(alert('Contact ' + id + ' was deleted!'))
    .catch(error => console.error('Unable to delete contact.', error));
    this.populateContacts();
  }
  handleEdit(contact){
    this.props.history.push({
      pathname: '/edit',
      data: contact
    })
  }

  render() {
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
            {this.state.contacts.map(contact =>
              <tr key={contact.name}>
                <td>{contact.name}</td>
                <td>{contact.birthdate}</td>
                <td>{contact.contactGroup}</td>
                <td>{contact.description}</td>
                <td>{contact.favorite.toString()}</td>
                <td>{contact.createdAt}</td>
                <td>{contact.updatedAt}</td>
                <td name="delete"><button onClick={this.handleDelete.bind(this,contact.id)}>Delete</button></td>
                <td name="edit"><button onClick={this.handleEdit.bind(this,contact)}>Edit</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  async populateContacts() {
    fetch('https://localhost:5001/api/contacts', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      //body: JSON.stringify({ id: '123', name : 'qweq' }) //for a post
      // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(data => this.setState({ contacts: data }))
    .then(this.render())
    .catch(error => console.error('Unable to get items.', error));
    //const response = await fetch('contacts');
    //const data = await response.json();
    //this.setState({ contacts: data, loading: false });
  }

}