export const errorHandler = (statusCode: number, message: string) => {
  const error = new Error()
  error.statusCode = statusCode
  error.message = message
  return error
}