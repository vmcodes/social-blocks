const jwt = require('jsonwebtoken');

export async function getToken(did: string) {
  const [accessToken] = await Promise.all([
    jwt.sign(
      {
        sub: did,
      },
      'EZR<;1Jn4e]h^)1Fjo%7',
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

    const verified = jwt.verify(token, 'EZR<;1Jn4e]h^)1Fjo%7');

    if (verified) {
      return verified.sub;
    }

    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}
