module.exports = (mongoose) => {
  const Profile = mongoose.model(
    'Profile',
    mongoose.Schema(
      {
        address: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        bio: { type: String, required: true },
        ipfsHash: String,
        location: String,
        email: String,
        website: String,
        github: String,
        twitter: String,
        youtube: String,
        instagram: String,
        facebook: String,
        qrcode: String,
      },
      { timestamps: true },
    ),
  );
  return Profile;
};
