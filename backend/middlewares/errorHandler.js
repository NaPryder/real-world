const { JsonWebTokenError } = require("jsonwebtoken");
const ErrorCase = require('../utils/Errors')

const errorHandler = async (error, req, res, next) => {
  console.log("--------------------");
  try {
    
    console.log(error);
    if (error instanceof JsonWebTokenError) {
      res.status(404).json({
        errors: {
          body: [error.msg]
        }
      })
    }
    else if (error instanceof ErrorCase.UnautorizedError) {
      res.status(401).json(error.error_return)
    }
    else {
      res.status(500).json({
        errors: {
          body: [error.msg]
        }
      })
    }
  } catch (error) {
  } finally {
    console.log("--------------------");
  }
  
}

module.exports = { errorHandler }