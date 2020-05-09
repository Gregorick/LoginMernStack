import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends Component {

   logout = e => {
       e.preventDefault()
       localStorage.removeItem('usertoken');
       this.props.history.push('/')
   }

    render() {

        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>  
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>  
                </li>
            </ul>  
        )
        
        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="" onClick={this.logout} className="nav-link">Logout</a>  
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>  
                </li>
            </ul>  
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <button className="navbar-toggle" 
                type="button" data-toggle="collapse" data-target="#navbar1" 
                aria-controls="navbar1" aria-expanded="false" aria-lable="toggle navigation">
                      <span className="navbar-toggle-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-md-center" id='navbar1'>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                               Home
                            </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)