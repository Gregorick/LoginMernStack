import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
             first_name: '',
             last_name: '',
             email: '',
             errors: {
                msg: ''
             }
        }
    }

    componentDidMount() {
       try {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email
        })
       } catch {
           this.setState({
               errors: {
                   msg: 'Debes de estar logeado'
               }
           })
       }
    }

    render() {
  if ( this.state.email ) {
    return (
        <div className="container">
            <div className="jumbotron mt-5">
                <div className="col-sm-8 mx-auto">
                    <h1 className="text-center">PROFILE</h1>
                </div>
                <table className="table col-md-6 mx-auto">
                     <tbody>
                         <tr>
                             <td> First Name</td>
                             <td>{this.state.first_name}</td>
                         </tr>
                         <tr>
                             <td> Last Name</td>
                             <td>{this.state.last_name}</td>
                         </tr>
                         <tr>
                             <td> Email</td>
                             <td>{this.state.email}</td>
                         </tr>                                                          
                     </tbody>
                    </table>  
            </div>
        </div>
    )
   } else {
   return <p className="text-center jumbotron mt-5">{this.state.errors.msg}</p>
   }
    }
}
