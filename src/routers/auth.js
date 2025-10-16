import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerSchema,
  loginSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  refreshSessionController,
  logoutController,
  requestPasswordResetController,
  resetPasswordController,
} from '../controllers/auth.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  registerUserController,
);
authRouter.post('/login', validateBody(loginSchema), loginUserController);
authRouter.post('/refresh', refreshSessionController);
authRouter.post('/logout', logoutController);

authRouter.post(
  '/send-reset-email',
  validateBody(requestPasswordResetSchema),
  requestPasswordResetController,
);
authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  resetPasswordController,
);
