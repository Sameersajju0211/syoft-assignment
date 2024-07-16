import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: '',
            user_password: '',
            error: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
        if (registeredUser && registeredUser.user_email === this.state.user_email) {
            if (registeredUser.user_password === this.state.user_password) {
                try {
                    const response = await axios.post('https://syoft.dev/Api/userlogin/api/userlogin', {
                        user_email: this.state.user_email,
                        user_password: this.state.user_password
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log('User login:', response.data);
                    if (response.status === 200) {
                        localStorage.setItem('user', JSON.stringify(registeredUser));
                        this.props.history.push('/dashboard');
                    } else {
                        this.setState({ error: 'Invalid credentials' });
                    }
                } catch (error) {
                    console.error('Error logging in:', error.response ? error.response.data : error.message);
                    this.setState({ error: 'Invalid credentials' });
                }
            } else {
                this.setState({ error: 'Wrong password' });
            }
        } else {
            this.setState({ error: 'User not registered' });
        }
    };

    render() {
        const { user_email, user_password, error } = this.state;

        return (
            <div className="login-container">
                <div className="login-card">
                    <div className="image-container">
                        <img
                            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
                            alt="website login"
                            className="website-login"
                        />
                    </div>

                    <form className="login-info-container" onSubmit={this.handleSubmit}>
                        <h1 className="login-heading">Welcome Back!</h1>

                        <div className="input-container">
                            <label htmlFor="user_email" className="label">
                                Email
                            </label>
                            <input
                                className="input"
                                value={user_email}
                                placeholder="Enter Email"
                                onChange={this.handleChange}
                                name="user_email"
                                id="user_email"
                                type="email"
                                required
                            />
                        </div>

                        <div className="input-container">
                            <label htmlFor="user_password" className="label">
                                Password
                            </label>
                            <input
                                className="input"
                                value={user_password}
                                placeholder="Enter Password"
                                onChange={this.handleChange}
                                name="user_password"
                                id="user_password"
                                type="password"
                                required
                            />
                        </div>

                        <button
                            className="login-button"
                            type="submit"
                        >
                            Login
                        </button>
                        {error && <p className="error-message">{error}</p>}

                        <p className="signup-link">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
