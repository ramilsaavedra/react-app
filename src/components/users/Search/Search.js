import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        users: PropTypes.array.isRequired,
        clearUsers: PropTypes.func.isRequired,
        setAlert: PropTypes.func.isRequired,
    }

    onSubmit = e => {
        e.preventDefault();
        if(this.state.text === ''){
            this.props.setAlert('Please enter something', 'light')
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: '' })
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        const { users, clearUsers } = this.props;
        return (
            <div>
                <form className='form'>
                    <input type='text' name='text' placeholder='Search Users...' value={this.state.text} onChange={this.onChange}/>
                    <input type='submit' value='Search' className='btn btn-dark btn-block' onClick={this.onSubmit}/>
                </form>
                { users.length ? <button className='btn btn-light btn-block' onClick={clearUsers}>Clear</button> : null }
            </div>
        )
    }
}

export default Search
