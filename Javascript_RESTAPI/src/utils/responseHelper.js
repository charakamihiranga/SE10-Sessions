// Example utility function for standard responses
const sendResponse = (res, status, data) => {
  res.status(status).json(data);
};

module.exports = { sendResponse };
