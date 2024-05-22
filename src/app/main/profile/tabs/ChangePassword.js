import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';

function PasswordChange() {
    // State variables to hold the form input values
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const user = useSelector(selectUser);
    // Handler function for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            setMessage("New password and confirm password do not match.");
            return;
        }
        const id = user.data.id;
        
 

        try {
            // Make an API request to update the password
            const response = await axios.put('http://127.0.0.1:8000/Auth/update-password', {
               id,
                currentPassword,
                newPassword,
            });
            console.log(response);
            // Handle the response and display a message
            setMessage(response.data.message);
        } catch (error) {
            // Handle errors
            setMessage('Failed to update password.');
        }
    };

    return (
        <div className="password-change-form">
            <Typography variant="h6">Change Password</Typography>
            <form onSubmit={handleSubmit}>
                {/* Current password input */}
                <TextField
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />

                {/* New password input */}
                <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />

                {/* Confirm password input */}
                <TextField
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />

                {/* Submit button */}
                <Button type="submit" variant="contained" color="secondary">
                    Update Password
                </Button>
            </form>
            {/* Display message */}
            {message=="Password updated successfully" ? <Typography color="lightseagreen">{message}</Typography> : <Typography color="error">{message}</Typography>}
        </div>
    );
}

export default PasswordChange;
