const validatePassword = (password, confirmPassword) => {
    const errors = [];
    
    // Validate if passwords match
    if (password !== confirmPassword) {
        errors.push('Passwords do not match');
    }

    // Validate password length
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    // Validate lowercase letter
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    // Validate uppercase letter
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    // Validate number
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    // Validate special character
    // if (!/[@$!%*?&]/.test(password)) {
    //   errors.push('Password must contain a special character like @$!%*?&');
    // }

    return errors;
};

module.exports = { validatePassword };
