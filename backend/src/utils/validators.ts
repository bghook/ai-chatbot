import { log } from "console";
import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty) {
        break;
      }
    }
    const errors = validationResult(req);
    // If there are no errors, move on to the next middleware
    if (errors.isEmpty()) {
      return next();
    }
    // If there are errors, return a 400 status code and a JSON object with the errors
    return res.status(422).json({ errors: errors.array() });
  };
};

// Login validation checks
export const loginValidator = [
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Signup validation checks
export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidator,
];
