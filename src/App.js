import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar/NavBar';
import Users from './components/users/Users/Users';
import User from './components/users/User/User';
import Search from './components/users/Search/Search';
import Alert from './components/layout/Alert/Alert';
import About from './components/pages/About';
import axios  from 'axios';
import './App.css';

class App extends Component {
  state ={
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null}), 2500);
  }

  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  }

  getUser = async login => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${login}?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  }

  getUserRepos = async login => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ repos: res.data, loading: false });
  }

  render(){
    const { loading, users, alert, user, repos } = this.state;
    return (
      <Router>

        <div className="App">
          <NavBar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route path='/' exact render={
                props => (
                  <>
                    <Search searchUsers={this.searchUsers} users={users} clearUsers={this.clearUsers} setAlert={this.setAlert}/>
                    <Users loading={loading} users={users} />
                  </>
                )
              }/>
              <Route path='/about' component={About} />
              <Route path='/user/:login' render={
                props => (
                  <User {...props} getUser={this.getUser} user={user} loading={loading} getUserRepos={this.getUserRepos} repos={repos}/>
                )
              } />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
