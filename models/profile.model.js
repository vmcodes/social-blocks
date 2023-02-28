module.exports = (mongoose) => {
  const Profile = mongoose.model(
    'Profile',
    mongoose.Schema(
      {
        address: { type: String, required: true, unique: true },
        username: String,
        slug: String,
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
