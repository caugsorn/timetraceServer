module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 100],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      lastUpdatedPassword: DataTypes.DATE,
    },
    { underscored: true, paranoid: true }
  );

  User.associate = (models) => {
    User.hasMany(models.Log, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    User.hasMany(models.Task, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return User;
};
