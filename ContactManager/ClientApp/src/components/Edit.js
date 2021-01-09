import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Home } from './Home';

export class Edit extends Component {
  static displayName = Edit.name;

  constructor(props) {
    super(props);
    var defaultDate = new Date();
    this.state = { id : 0, 
                  name: '',
                  birthdate: defaultDate,
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
    this.state.updatedAt = new Date();
    fetch('https://localhost:5001/api/contacts/' + this.state.id, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id : this.state.id,
                          name : this.state.name, 
                          birthdate : this.state.birthdate,
                          contactGroup : this.state.group,
                          description : this.state.description,
                          createdAt : this.state.createdAt,
                          updatedAt : this.state.updatedAt })
    })
    .then(response => response.json())
    .then(this.props.history.push('/'))
    .catch(error => console.error('Unable to create contact.', error));
    
  }

  render() {
    const { data } = this.props.location;
    var contact = data;
    //alert('Contact ' + contact.name + ' is being edited!')
    this.state = { id : contact.id, 
        name: contact.name,
        birthdate: contact.birthdate,
        group: contact.group,
        description: contact.description,
        favorite: contact.favorite,
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt
    };
    //alert('Contact ' + this.state.id + ' is being edited!')
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
              <input class="form-check-input" type="checkbox"
                checked={this.state.favorite} onChange={this.handleInputChange}/> Favorite
            </label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}
export default withRouter(Edit);