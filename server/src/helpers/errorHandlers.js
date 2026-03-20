import dotenv from "dotenv";
dotenv.config();

const errorHandler = async (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      error: err,
    }),
  });
};

export default errorHandler;
