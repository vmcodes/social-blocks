module.exports = (mongoose) => {
  const User = mongoose.model(
    'User',
    mongoose.Schema(
      {
        address: { type: String, required: true, unique: true },
        username: { type: String, unique: true },
      },
      { timestamps: true },
    ),
  );
  return User;
};
