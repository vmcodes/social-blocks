module.exports = (mongoose) => {
  const User = mongoose.model(
    'User',
    mongoose.Schema(
      {
        address: { type: String, required: true, unique: true },
      },
      { timestamps: true },
    ),
  );
  return User;
};
