const { DateTime } = require("luxon");
const { QueryTypes, Op, where} = require('sequelize');
const db = require("../models");
const { sequelize, Log } = require("../models")

const createError = require("../util/createError");
const week = DateTime.local().weekNumber;


exports.logTime = async (req, res, next) => {
    const {timeStart, timeEnd, category, timeSpan, day, week, date} = req.body

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
    console.log(category)
    const result = category === null ?  'Untitled...' : category
    console.log('before change')
    console.log(result)
    const log = await Log.create({
        category,
      timeStart: timeStart,
      timeEnd: timeEnd,
      timeSpan,
      day,
      week,
      date,
      userId:2
    });
    res.status(201).json({ message: "Logged succesfully", log });
};


exports.getSum = async (req,res,next) => {
    const sum = await Log.sum('time_span', {where: {'week' : { [Op.like]: `${week}`}}})
    console.log(week)
    console.log(sum)
    res.status(201).json({sum});
}


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

    res.status(201).json({averageCompared, average});
    }
//เช็คลอจิค น่าจะผิด

exports.graphAverage = async (req,res,next) => {
    // const weekDay = [MON, TUE, WED, THU, FRI, SAT, SUN]
    const queryAverageWeek = 'SELECT day, AVG(time_span) AS sum FROM Timetrace.logs GROUP BY day ORDER BY day;'
    const averageWeekData = await Log.sequelize.query(queryAverageWeek, {type: QueryTypes.SELECT}, {raw: true})
   
    const queryWeek = `SELECT day, SUM(time_span) AS sum FROM Timetrace.logs WHERE week LIKE '${week}'  GROUP BY day ORDER BY day`
    const thisWeekData = await Log.sequelize.query(queryWeek, {type: QueryTypes.SELECT}, {raw: true})
    const weekDay = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
    const averageLogData = [];
    const thisWeekLogData = [];

    weekDay.forEach((el, idx) => {
        for (element of averageWeekData) {
            if (el == element.day) 
                 {return averageLogData[idx] = element}
            averageLogData[idx] = {day: el, sum: 0}
        }
    })

    weekDay.forEach((el, idx) => {
        for (element of thisWeekData) {
            if (el == element.day) 
                 {return thisWeekLogData[idx] = element}
            thisWeekLogData[idx] = {day: el, sum: 0}
        }
    })
    res.status(201).json({averageLogData, thisWeekLogData});
}


exports.graphCategory = async (req,res,next) => {
    const queryCategory = `SELECT category, SUM(time_span) AS sum FROM Timetrace.logs WHERE week LIKE '${week}' GROUP BY category;`
    const categoryData = await Log.sequelize.query(queryCategory, {type: QueryTypes.SELECT}, {raw: true})
    res.status(201).json({categoryData});
}


exports.getLog = async (req,res, next) => {
    const userId = 2
    const { weekId } = req.params
    const query = `SELECT category, time_start, time_end, time_span, id,day, week, concat(day,week) as col FROM Timetrace.logs WHERE user_id = 2 AND week = ${weekId} GROUP BY col, id;`
    const log = await Log.sequelize.query(query, {type: QueryTypes.SELECT}, {raw: true})
    const logGroupByDate =log.reduce((acc, cur) => {        
        if (!acc[cur.col]) {
            acc[cur.col] = []
        } acc[cur.col].push(cur)
        return acc
    },{})
    
    const categoryForFilter = log.reduce((acc, cur) => {        
        if (!acc[cur.category]) {
            acc[cur.category] = []
        } acc[cur.category].push(cur)
        return acc
    },{})
    // console.log(logGroupbyCategory)
    res.status(201).json({logGroupByDate,  categoryForFilter});
}

exports.getLogByCategory = async (req,res,next) => {
    const query = `SELECT category, time_start, time_end, time_span, id,day, week, concat(day,week) as col FROM Timetrace.logs WHERE user_id = 2 GROUP BY category;`
    const log = await Log.sequelize.query(query, {type: QueryTypes.SELECT}, {raw: true})
    const logGroupbyCategory = log.reduce((acc, cur) => {
        if (!acc[cur.category]) {
            acc[cur.category] = []}
        acc[cur.category].push(cur)
        return acc
    },{})
    console.log(logGroupbyCategory)
}