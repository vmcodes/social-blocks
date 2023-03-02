const generateRandomNumber = (length = 7) =>
  Math.random().toString(10).substring(2, length);

const randomUser = `user${generateRandomNumber()}`;

module.exports = (mongoose) => {
  const Profile = mongoose.model(
    'Profile',
    mongoose.Schema(
      {
        address: { type: String, required: true, unique: true },
        username: { type: String, default: randomUser },
        slug: { type: String, default: randomUser },
        bio: String,
        ipfsHash: String,
        location: String,
        email: String,
        website: String,
        github: String,
        twitter: String,
        youtube: String,
        instagram: String,
        facebook: String,
        qrcode: { type: String, default: 'https://socialblocks.io' },
      },
      { timestamps: true },
    ),
  );
  return Profile;
};
