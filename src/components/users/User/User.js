import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Repos from '../../repos/Repos/Repos'
import Spinner from '../../layout/Spinner/Spinner'
import PropTypes from 'prop-types'

class User extends Component {
    componentDidMount(){
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }
    
    static propTypes = {
        user: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired,
        repos: PropTypes.array.isRequired,
    }

    render() {
        const { name, avatar_url, location, bio, company, blog, login, html_url, followers, following, public_repos, public_gists, hireable} = this.props.user
        const { loading } = this.props

        if(loading) return <Spinner />
        return (
            <>
                <Link to='/' className='btn btn-light'>
                    Back to Search
                </Link>
                Hireable:{' '}
                {hireable ?
                    <i className='fa fa-check text-success' />
                    : 
                    <i className='fa fa-times-circle text-danger' />
                }
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img src={avatar_url} className='round-img' style={{width: '150px'}} alt={name}/>
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio &&
                            <>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </>    
                         }
                         <a className='btn btn-dark my-1' href={html_url}>Visit GitHub Profile</a>
                         <ul>
                             <li>
                                 {login && 
                                    <>
                                        <strong>Username: </strong> {login}
                                    </>
                                 }
                             </li>
                             <li>
                                 {company && 
                                    <>
                                        <strong>Company: </strong> {company}
                                    </>
                                 }
                             </li>
                             <li>
                                 {blog && 
                                    <>
                                        <strong>Website: </strong> {blog}
                                    </>
                                 }
                             </li>
                         </ul>
                    </div>
                </div>
                <div className='card text-center'>
                    <div className='badge badge-primary'>Followers: {followers}</div>
                    <div className='badge badge-success'>Following: {following}</div>
                    <div className='badge badge-light'>Public Repos: {public_repos}</div>
                    <div className='badge badge-dark'>Public Gists: {public_gists}</div>
                </div>
                <Repos repos={this.props.repos} />
            </>
        )
    }
}

export default User
