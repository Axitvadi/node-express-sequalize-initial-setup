function prepareSuccessResponse (data, message) {
  return {
    success: true,
    data,
    message,
    totalRecords: data.length
  }
}

function prepareErrorResponse (message) {
  return {
    success: false,
    message
  }
}

module.exports = {
  prepareSuccessResponse,
  prepareErrorResponse
}
