import React, { Component } from 'react'
import { register } from './UserFunctions'

export default class Register extends Component {

    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }
        register(user).then(res => {
            this.props.history.push(`/login`)
        })
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal"> Por favor Registrate</h1>
                            <div className="form-group">
                                <label htmlFor="first_name"></label>
                                <input type="text" className="form-control" name="first_name"
                                placeholder="Entra el Nombre" value={this.state.fist_name}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name"></label>
                                <input type="text" className="form-control" name="last_name"
                                placeholder="Entra el apellido" value={this.state.last_name}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"></label>
                                <input type="text" className="form-control" name="email"
                                placeholder="Entra el correo" value={this.state.email}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"></label>
                                <input type="text" className="form-control" name="password"
                                placeholder="Ingresa la contraseña" value={this.state.password}
                                onChange={this.onChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Regístrate
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
