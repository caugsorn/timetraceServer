module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    "Log",
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Untitled...",
        
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
        type: DataTypes.ENUM("MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"),
      },
      week: {
        type: DataTypes.INTEGER
      }
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
