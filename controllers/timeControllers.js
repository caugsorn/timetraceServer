const { DateTime } = require("luxon");
const {Log} = require("../models")

const createError = require("../util/createError");


exports.logTime = async (req, res, next) => {
    const {timeStart, timeEnd, category='Untitled...', timeSpan, day} = req.body


    if (timeEnd < timeStart) {
        createError('Error from time: TimeEnd appears to be earlier than timeStart', 401)
    }

    if (!day) {
         createError('Body must contain day', 401)
    }

    ///{milliseconds: xxxxx}

    const log = await Log.create({
        category,
      timeStart: timeStart.toSQL(),
      timeEnd: timeEnd.toSQL(),
      timeSpan,
      day,
      userId:2
    });
    res.status(201).json({ message: "Logged succesfully", log });
};


//category: String,
//timeStart type:date time
//timeEnd type:date time
//timeSpan timeStart-timeEnd
//day:getDay


exports.getLog = async (req,res,next) => {
    
}