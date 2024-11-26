import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'qj5tBZ2pLG/yFDbdvsiDDHahr/7wsHn7SjpMlERjGifulZ3vCMfk3hERrkMDaouaAP3PxEYbmVs'; // Idealmente, configure isso no .env

// Tempo de expiração configurável
const TOKEN_EXPIRATION = '1h'; // Exemplo: 1 hora

/**
 * Gera um token JWT para um payload específico.
 * @param payload Dados que deseja incluir no token.
 * @returns Token JWT assinado.
 */
export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
}

/**
 * Verifica a validade de um token JWT.
 * @param token Token a ser verificado.
 * @returns Decoded payload ou erro.
 */
export function verifyToken(token: string): object {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
}
