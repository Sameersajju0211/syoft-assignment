import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_firstname: '',
            user_email: '',
            user_phone: '',
            user_password: '',
            error: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            user_firstname: this.state.user_firstname,
            user_email: this.state.user_email.trim(),
            user_phone: this.state.user_phone,
            user_password: this.state.user_password,
            user_lastname: 'Mullah',
            user_city: 'Anantapur',
            user_zipcode: '515001'
        };

        try {
            const response = await axios.post('https://syoft.dev/Api/user_registeration/api/user_registeration', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('User registered:', response.data);
            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('registeredUser', JSON.stringify(payload));
                alert('User registered successfully!');
                this.props.history.push('/login');
            } else {
                this.setState({ error: 'Error registering user' });
            }
        } catch (error) {
            console.error('Error registering user:', error.response ? error.response.data : error.message);
            this.setState({ error: 'Error registering user' });
        }
    };

    render() {
        return (
            <div className="signup-container">
                <div className="signup-card">
                    <div className="signup-header">
                        <h2>Sign up</h2>
                        <p>Already have an account?  <Link to="/login" className="singin-link">Sign in</Link></p>
                    </div>
                    <form className="signup-form" onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="user_firstname"
                            placeholder="Full name"
                            value={this.state.user_firstname}
                            onChange={this.handleChange}
                            required
                            className="input-field"
                        />
                        <input
                            type="email"
                            name="user_email"
                            placeholder="Email address"
                            value={this.state.user_email}
                            onChange={this.handleChange}
                            required
                            className="input-field"
                        />
                        <input
                            type="password"
                            name="user_password"
                            placeholder="Password"
                            value={this.state.user_password}
                            onChange={this.handleChange}
                            required
                            className="input-field"
                        />
                        <input
                            type="tel"
                            name="user_phone"
                            placeholder="Phone"
                            value={this.state.user_phone}
                            onChange={this.handleChange}
                            required
                            className="input-field"
                        />
                        <div className="checkbox-container">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">
                                I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                            </label>
                        </div>
                        <button type="submit" className="submit-button">Create your free account</button>
                    </form>
                    {this.state.error && <p className="error">{this.state.error}</p>}
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);
