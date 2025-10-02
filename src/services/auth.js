import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';

const ACCESS_TTL_MS = 15 * 60 * 1000;
const REFRESH_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export async function registerUser(payload) {
  const email = String(payload.email).toLowerCase();

  const exists = await User.findOne({ email });
  if (exists !== null) {
    throw new createHttpError.Conflict('Email in use');
  }

  const hashed = await bcrypt.hash(payload.password, 10);

  const created = await User.create({
    name: payload.name,
    email,
    password: hashed,
  });

  return created.toJSON?.() ?? created;
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email: String(email).toLowerCase() });
  if (user === null) {
    throw new createHttpError.Unauthorized('Email or password is incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch !== true) {
    throw new createHttpError.Unauthorized('Email or password is incorrect');
  }

  await Session.deleteOne({ userId: user._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');
  const now = Date.now();

  const session = await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(now + ACCESS_TTL_MS),
    refreshTokenValidUntil: new Date(now + REFRESH_TTL_MS),
  });

  return {
    sessionId: session._id.toString(),
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
  };
}

export async function refreshSession(refreshToken) {
  if (!refreshToken) {
    throw new createHttpError.Unauthorized('No refresh token');
  }

  const prev = await Session.findOne({ refreshToken });
  if (!prev) {
    throw new createHttpError.Unauthorized('Session not found');
  }

  if (prev.refreshTokenValidUntil.getTime() <= Date.now()) {
    await Session.deleteOne({ _id: prev._id });
    throw new createHttpError.Unauthorized('Refresh token expired');
  }

  await Session.deleteOne({ _id: prev._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const newRefreshToken = crypto.randomBytes(30).toString('base64');
  const now = Date.now();

  const next = await Session.create({
    userId: prev.userId,
    accessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(now + ACCESS_TTL_MS),
    refreshTokenValidUntil: new Date(now + REFRESH_TTL_MS),
  });

  return {
    sessionId: next._id.toString(),
    accessToken: next.accessToken,
    refreshToken: next.refreshToken,
  };
}

export async function logoutSession(sessionId, refreshToken) {
  if (!sessionId || !refreshToken) return;
  await Session.deleteOne({ _id: sessionId, refreshToken });
}
