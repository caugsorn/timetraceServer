module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      priority: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
        defaultValue: 3,
        validate: {
          notEmpty: true,
        },
      },
      week: DataTypes.INTEGER,

    },
    { underscored: true }
  );

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Task;
};
