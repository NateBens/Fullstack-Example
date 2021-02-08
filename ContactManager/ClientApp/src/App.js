import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import { Edit } from './components/Edit';


import './custom.css'

function App() {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/edit' component={Edit} />
    </Layout>
  );
}

export default App;