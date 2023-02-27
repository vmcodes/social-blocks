require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret';

export async function getToken(address: string) {
  const [accessToken] = await Promise.all([
    jwt.sign(
      {
        sub: address,
      },
      jwtSecret,
      { expiresIn: '1d' },
    ),
  ]);

  return {
    accessToken,
  };
}

export async function verifyToken(req) {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    const verified = jwt.verify(token, jwtSecret);

    if (verified) {
      return verified.sub;
    }

    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}
