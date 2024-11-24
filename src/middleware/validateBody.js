const validateBody = (requiredFields = [], optionalFields = []) => {
    return (req, res, next) => {  
      const keys = Object.keys(req.body);
  
      // Cari field yang tidak diperbolehkan
      const invalidFields = keys.filter(
        (key) => !requiredFields.includes(key) && !optionalFields.includes(key)
      );
  
      // Cari field yang hilang (wajib, tetapi tidak ada)
      const missingFields = requiredFields.filter((field) => !keys.includes(field));
  
      if (invalidFields.length > 0 || missingFields.length > 0) {
        return res.status(400).json({
          error: 'Validation error',
          invalidFields: invalidFields.length > 0 ? invalidFields : undefined,
          missingFields: missingFields.length > 0 ? missingFields : undefined,
        });
      }
  
      next(); // Lanjutkan ke controller jika semua validasi lolos
    };
  };
  
  module.exports = { validateBody };
  