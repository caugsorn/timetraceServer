const { sequelize } = require("./models");

// sequelize
//   .sync({ force: true })
//   .then(() => console.log("DB synced!"))
//   .catch((err) => console.log(err));

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.log("Unable to connect to the database:", err);
//   });

const { User, Task, Log } = require("./models");
// const run = async () => {
//   try {
//     const user = await User.create({
//       username: "john",
//       password: "123456",
//       email: "john@g.com",
//     });
//     console.log("#####" + JSON.stringify(user, null, 2));
//   } catch (err) {
//     console.log(err);
//   }
// };

// run();

const run2 = async () => {
  try {
    const todo = await Task.bulkCreate([
      { title: "math", completed: false, priority: "1", userId: 1 },
      { title: "english", completed: true, priority: "2", userId: 1 },
    ]);
    console.log(JSON.stringify(Task, null, 2));
  } catch (err) {
    console.log(err);
  }
};

run2();

// const timeSpan2 = new Date();
// const second = +timeSpan2.getSeconds();
// console.log(second);
// const run = async () => {
//   try {
//     const log = await Log.create({
//       timeStart: new Date(),
//       timeEnd: new Date(),
//       timeSpan: 11,
//       priority: "2",
//       day: "MON",
//     });
//     console.log(JSON.toString(log));
//   } catch (err) {
//     console.log(err);
//   }
// };

// run();
