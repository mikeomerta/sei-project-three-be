function errorHandler(err, req, res, next) {
  console.log(`🤖 Oh No, Something Is Wrong!
  Error: ${err.name}
  `)
  // apparently shows the function that causes the error:
  console.log('Error Stack', err.stack)

  // 404 Error
  if (err.name === 'CastError' || err.name === 'NotFound') {
    return res.status(404).json({ message: 'Item not found' })
  }

  // 404 Error, but with a syntax error, as in something has gone pretty badly.
  if (err.name === 'SyntaxError') {
    return res.status(404).json({ message: 'You have done something very wrong!  Try again.', errors: err.name })
  }

  // 422 errors
  if (err.name === 'ValidationError') {
    const customErrors = {}

    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }
    
    return res.status(422).json({
      message: 'You did not fill it in coreectly', errors: customErrors,
    })
  }

  next(err)

}

export default errorHandler