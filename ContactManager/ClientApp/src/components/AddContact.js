import React, { useState } from 'react';

const AddContact = (props) => {
  var defaultDate = new Date().toLocaleString();
  const initContact = {
    name: '',
    birthdate: '',
    group: '',
    description: '',
    favorite: false,
    createdAt: defaultDate,
    updatedAt: defaultDate
  };
  const [contact, setContact] = useState(initContact);

  const handleInputChange = e => {
    e.preventDefault();
    const {name,value} = e.target;
    setContact({...contact, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (contact.name) {
      fetch('https://localhost:5001/api/contacts', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name : contact.name,
                            birthdate : contact.birthdate,
                            contactGroup : contact.group,
                            description : contact.description,
                            favorite : contact.favorite,
                            createdAt : contact.createdAt,
                            updatedAt : contact.updatedAt })
      })
      .then(response => response.json())
      //.then(alert('Contact ' + this.state.name + ' was created!'))
      .catch(error => console.error('Unable to create contact.', error));
      handleInputChange(e, props.addContact(contact));
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id ="namefield" name="name"
            value={contact.name} onChange={handleInputChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="birthdate">Birthdate:</label>
          <input type="date" id="birthdatefield" name="birthdate"
            value={contact.birthdate} onChange={handleInputChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="group">Group:</label>
          <input type="text" id="groupfield" name="group"
            value={contact.group} onChange={handleInputChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input type="text" id="descriptionfield" name="description"
            value={contact.description} onChange={handleInputChange}/>
        </div>
        <div className="form-check mb-2 mr-sm-2 mb-sm-0">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" name="favorite"
              checked={contact.favorite} onChange={handleInputChange}/> Favorite
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )

};

export default AddContact;