export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    console.log("Error in validate schema: " + error);
    return res
      .status(400)
      .json(error.errors.map((err) => console.log("err.message", err.message)));
  }
};
