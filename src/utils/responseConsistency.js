// Utility function for creating a standard API response
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      error: false,
      message,
      data
    });
  };
  
  // Utility function for creating a standard error response
  const errorResponse = (res, error, message = 'Something went wrong', statusCode = 500) => {
    return res.status(statusCode).json({
      wrror: true,
      message,
      error: error instanceof Error ? error.message : error
    });
  };
  
  // Utility function for paginated responses
  const paginatedResponse = (res, data, page, limit, total) => {
    return res.status(200).json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total
      }
    });
  };
  
  module.exports = { successResponse, errorResponse, paginatedResponse };
  