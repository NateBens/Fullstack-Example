import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Home } from './Home';

export class AddContact extends Component {
  static displayName = AddContact.name;

  constructor(props) {
    super(props);
    var defaultDate = new Date().toLocaleString();
    this.state = { name: '',
                  birthdate: '',
                  group: '',
                  description: '',
                  favorite: false,
                  createdAt: defaultDate,
                  updatedAt: defaultDate
  };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleOnSubmit(event){
    event.preventDefault();
    fetch('https://localhost:5001/api/contacts', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name : this.state.name, 
                          birthdate : this.state.birthdate,
                          contactGroup : this.state.group,
                          description : this.state.description,
                          favorite : this.state.favorite,
                          createdAt : this.state.createdAt,
                          updatedAt : this.state.updatedAt })
    })
    .then(response => response.json())
    //.then(alert('Contact ' + this.state.name + ' was created!'))
    .then(this.props.history.push('/'))
    .catch(error => console.error('Unable to create contact.', error));
    
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id ="namefield" name="name" 
              value={this.state.name} onChange={this.handleInputChange}/>
          </div>
          <div class="form-group">
            <label for="birthdate">Birthdate:</label>
            <input type="date" id="birthdatefield" name="birthdate" 
              value={this.state.birthdate} onChange={this.handleInputChange}/>
          </div>
          <div class="form-group">
            <label for="group">Group:</label>
            <input type="text" id="groupfield" name="group"
              value={this.state.group} onChange={this.handleInputChange}/>
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <input type="text" id="descriptionfield" name="description"
              value={this.state.description} onChange={this.handleInputChange}/>
          </div>
          <div class="form-check mb-2 mr-sm-2 mb-sm-0">
            <label class="form-check-label">
              <input class="form-check-input" type="checkbox" name="favorite"
                checked={this.state.favorite} onChange={this.handleInputChange}/> Favorite
            </label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}
export default withRouter(AddContact);