module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    "Log",
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Untitled...",
        validate: {
          notEmpty: true,
        },
      },
      timeStart: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { notEmpty: true },
      },
      timeEnd: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { notEmpty: true },
      },
      timeSpan: { type: DataTypes.INTEGER },
      day: {
        type: DataTypes.ENUM("SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"),
      },
    },
    { underscored: true, paranoid: true }
  );

  Log.associate = (models) => {
    Log.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Log;
};
