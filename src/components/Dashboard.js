import React, { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component {
    render() {
        const user = JSON.parse(localStorage.getItem('user'));

        return (
            <div className="dashboard-container">
                {user ? (
                    <>
                        <h2>Welcome, {user.user_firstname}!</h2>
                        <div className="user-details">
                            <p><strong>Email:</strong> {user.user_email}</p>
                            <p><strong>Phone:</strong> {user.user_phone}</p>
                            <p><strong>City:</strong> {user.user_city}</p>
                        </div>
                    </>
                ) : (
                    <p>No user information available.</p>
                )}
            </div>
        );
    }
}

export default Dashboard;
