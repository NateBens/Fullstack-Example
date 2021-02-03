import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { AddContact } from './components/AddContact';
import { Edit } from './components/Edit';


import './custom.css'

function App() {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/add-contact' component={AddContact} />
      <Route path='/edit' component={Edit} />
    </Layout>
  );
}

export default App;