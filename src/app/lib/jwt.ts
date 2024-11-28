import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'qj5tBZ2pLG/yFDbdvsiDDHahr/7wsHn7SjpMlERjGifulZ3vCMfk3hERrkMDaouaAP3PxEYbmVs'; // Idealmente, configure isso no .env

const TOKEN_EXPIRATION = '1h'; 

/**
 * 
 * @param payload 
 * @returns 
 */
export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
}

/**
 * 
 * @param token 
 * @returns 
 */
export function verifyToken(token: string): object {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
}
