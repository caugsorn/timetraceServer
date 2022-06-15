const { DateTime } = require("luxon");
const { QueryTypes, Op} = require('sequelize');
const db = require("../models");
const { sequelize, Log } = require("../models")

const createError = require("../util/createError");
const week = DateTime.local().weekNumber;


exports.logTime = async (req, res, next) => {
    const {timeStart, timeEnd, category='Untitled...', timeSpan, day, week} = req.body

    console.log(day)
    // validation error bc category/timeSpan is empty

    if (timeEnd < timeStart) {
        createError('Error from time: TimeEnd appears to be earlier than timeStart', 401)
    }

    if (!day) {
         createError('Body must contain day', 401)
    }

    if (!week) {
         createError('Body must contain week', 401)
    }

    if (timeSpan < 1) {
        createError('Duration must be longer than 1 second', 401)
    }


    ///{milliseconds: xxxxx}

    category ? category : 'Untitled...' 

    const log = await Log.create({
        category,
      timeStart: timeStart,
      timeEnd: timeEnd,
      timeSpan,
      day,
      week,
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


// router.get('/', logController.getTotalLog)
// SELECT SUM(time_span) FROM Timetrace.logs WHERE week LIKE '23' GROUP BY week;
exports.getSum = async (req,res,next) => {
    const sum = await Log.sum('time_span', {where: {'week' : { [Op.like]: `${week}`}}})
    console.log(week)
    console.log(sum)
    res.status(201).json({sum});
}


// SELECT SUM(time_span) FROM Timetrace.logs WHERE week like '24';
// SELECT SUM(time_span)/count(distinct week) FROM Timetrace.logs WHERE week is not null;
exports.compareToAverage = async (req,res,next) => {
    const sumTotal = await Log.sum('time_span', {where: {'week' : { [Op.ne]: null}}}, {group: 'week'})
    const countWeek = await  Log.findAll({
         attributes: [
            Log.sequelize.literal('COUNT(DISTINCT("week"))', 'COUNT')
        ], where: {'week' : { [Op.ne]: null}}, group: 'week'})
    
    const average = sumTotal/countWeek.length
    console.log(average, countWeek.length)

    const sumWeek = await Log.sum('time_span', {group: 'week', where: {'week' : { [Op.like]: `${week}`}}})
    const averageCompared = sumWeek/average * 100
    console.log('sumWeek: ', sumWeek)

    res.status(201).json({averageCompared});
    }
//เช็คลอจิค น่าจะผิด
// router.get('/', logController.compareLogToAverage)

//[{MON: }]

// average of each day
// average of day of week
exports.graphAverage = async (req,res,next) => {
    // const weekDay = [MON, TUE, WED, THU, FRI, SAT, SUN]
    const queryAverageWeek = 'SELECT day, AVG(time_span) AS sum FROM Timetrace.logs GROUP BY day ORDER BY day;'
    const averageWeekData = await Log.sequelize.query(queryAverageWeek, {type: QueryTypes.SELECT}, {raw: true})
   
    const queryWeek = `SELECT day, SUM(time_span) AS sum FROM Timetrace.logs WHERE week LIKE '${week}'  GROUP BY day ORDER BY day`
    const thisWeekData = await Log.sequelize.query(queryWeek, {type: QueryTypes.SELECT}, {raw: true})
    const weekDay = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
    const allDay = [];

    weekDay.forEach((el, idx) => {
        // console.log(el,idx + '1')
        for (element of averageWeekData) {
            if (el == element.day) 
                 {return allDay[idx] = element}
            allDay[idx] = {day: el, sum: 0}
        }
    })

    res.status(201).json({averageWeekData, thisWeekData});


}


exports.graphCategory = async (req,res,next) => {
    const queryCategory = `SELECT category, SUM(time_span) AS sum FROM Timetrace.logs WHERE week LIKE '${week}' GROUP BY category;`
    const categoryData = await Log.sequelize.query(queryCategory, {type: QueryTypes.SELECT}, {raw: true})
    res.status(201).json({categoryData});
}



// pie chart by category

// time of day