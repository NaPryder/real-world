
Response = {
  AUTH_UNAUTHORIZE: 'Unauthorized Access, please login',
  FORBIDEN: 'Forbiden, you not have permission to this site',
}

class CustomError extends Error {
  constructor(msg) {
    super(msg)
    this.name = this.constructor.name
    this.error_return = {
      errors: {
        body: msg
      }
    }
  }
}

class FieldRequireError extends CustomError {
  constructor(fieldName) {
    super(`${fieldName} is required`)
  }
}

class UnautorizedError extends CustomError {
  constructor() {
    super(Response.UnautorizedError)
  }
}

class ForbidenError extends CustomError {
  constructor() {
    super(Response.FORBIDEN)
  }
}

class DataNotFoundError extends CustomError {
  constructor(data, solution='') {
    super(`${data} not found. ${solution}.`)
  }
}

class InvalidDataError extends CustomError {
  constructor(data, solution='') {
    super(`Invalid ${data}. ${solution}.`)
  }
}

class EmailRegisteredError extends CustomError {
  constructor(email) {
    super(`Email ${email} has been registed. please try new email`)
  }
}

class DataExistsError extends CustomError {
  constructor(data) {
    super(`${data} has already existed.`)
  }
}


module.exports = {
  CustomError,
  FieldRequireError,
  UnautorizedError,
  ForbidenError,
  DataNotFoundError,
  InvalidDataError,
  EmailRegisteredError,
  DataExistsError,
}