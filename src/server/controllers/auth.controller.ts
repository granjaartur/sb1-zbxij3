import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthService } from '../services/auth.service.js';
import { loginSchema } from '../validators/auth.validator.js';
import { ApiError } from '../utils/api-error.js';

export class AuthController {
  static login = asyncHandler(async (req: Request, res: Response) => {
    const data = loginSchema.parse(req.body);
    const result = await AuthService.login(data.email, data.password);
    res.json(result);
  });
}