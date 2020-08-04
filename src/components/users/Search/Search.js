import React, { useState, useContext } from 'react'
import GithubContext from '../../../context/github/githubContext';
import AlertContext from '../../../context/alert/alertContext'

const Search = () =>  {
    const githubContext = useContext(GithubContext);
    const { users, clearUsers } = githubContext;

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const [text, setText] = useState('');
    const onSubmit = e => {
        e.preventDefault();
        if(text === ''){
            showAlert('Please enter something', 'light')
        } else {
            githubContext.searchUsers(text);
            setText('')
        }
    }
    const onChange = e => setText(e.target.value)

    return (
        <div>
            <form className='form'>
                <input type='text' name='text' placeholder='Search Users...' value={text} onChange={onChange}/>
                <input type='submit' value='Search' className='btn btn-dark btn-block' onClick={onSubmit}/>
            </form>
            { users.length ? <button className='btn btn-light btn-block' onClick={clearUsers}>Clear</button> : null }
        </div>
    )
}


export default Search
