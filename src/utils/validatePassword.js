const validatePassword = (password, confirmPassword) => {
    const errors = [];
    // validasi jumlah password
    if (password!==confirmPassword) {
        errors.push('password konfirmasi tidak sesuai');
    }
    // validasi jumlah password
    if (password.length < 8) {
        errors.push('Password harus memiliki minimal 8 karakter');
    }
    // Validasi huruf kecil
    if (!/[a-z]/.test(password)) {
        errors.push('Password harus mengandung huruf kecil');
    }

    // Validasi huruf besar
    if (!/[A-Z]/.test(password)) {
        errors.push('Password harus mengandung huruf besar');
    }

    // Validasi angka
    if (!/\d/.test(password)) {
        errors.push('Password harus mengandung angka');
    }

    // Validasi karakter spesial
    // if (!/[@$!%*?&]/.test(password)) {
    //   errors.push('Password harus mengandung karakter spesial seperti @$!%*?&');
    // }

    return errors;
};
module.exports={ validatePassword };