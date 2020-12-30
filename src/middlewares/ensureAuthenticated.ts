import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validacao do token JWT

  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  // Formato: (Bearer token)
  // Dividindo as partes:
  // const [type, token] = authHeader.split(' ');
  // Porem, como nao utilizaremos o type, basta utlizar a syntax seguinte
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    // Forçando o tipo de uma variável
    const { sub } = decoded as TokenPayload;

    // Disponibilizando informações de user em todas as rotas autenticadas da aplicação
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
