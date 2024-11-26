const { errorResponse } = require('../utils/responseConsistency'); // Import the errorResponse utility

/**
 * Middleware to validate the request body
 * @param {Array} requiredFields - List of required fields in the request body
 * @param {Array} optionalFields - List of optional fields in the request body
 */
const validateBody = (requiredFields = [], optionalFields = []) => {
  return (req, res, next) => {
    const keys = Object.keys(req.body);

    // Check for invalid fields (fields that are not required or optional)
    const invalidFields = keys.filter(
      (key) => !requiredFields.includes(key) && !optionalFields.includes(key)
    );

    // Check for missing required fields
    const missingFields = requiredFields.filter((field) => !keys.includes(field));

    // If there are invalid or missing fields, return an error response
    if (invalidFields.length > 0 || missingFields.length > 0) {
      return errorResponse(
        res,
        null, // No need to send error object in this case
        'Validation error',
        400,
        invalidFields.length > 0 ? { invalidFields } : undefined,
        missingFields.length > 0 ? { missingFields } : undefined
      );
    }

    next(); // Continue to the next middleware/controller if validation passes
  };
};

module.exports = { validateBody };
