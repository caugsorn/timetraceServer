// const { DateTime,Duration,Interval } = require("luxon");

// // const dt = DateTime.now()
// // console.log(dt.toISO())

// // var dt2 = DateTime.now().minus({days: 2})
// // var dt = DateTime.now().toUTC();

// // var dur = Duration.fromObject({ hours: 2, minutes: 7 });

// // var x = dt.plus(dur)
// // console.log(x)
// // console.log(dt.minus({ days: 7 }))
// // console.log(dt.startOf('day'))
// // console.log(dt.endOf('hour'))

// const timeStart = DateTime.now();
// const timeEnd = DateTime.now().plus({hours:1, minutes: 9})


// // const weekDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
// // const dayStart = new Date()
// // const day = weekDay[dayStart.getDay()]

// // console.log(day)
// // console.log(timeEnd > timeStart)

// //////************** */
// var end = DateTime.fromISO('2017-03-13T00:20:12');
// var start = DateTime.fromISO('2017-03-12T23:12:20');

// // var i = Interval.fromDateTimes(timeStart, timeEnd)

// var ii = end.diff(start).toObject()

// var i = end.diff(start,['months', 'days', 'hours', 'minutes', 'seconds']).toObject()

// // console.log(i)
// // console.log(ii)

// // var iii = DateTime.now().plus({seconds: i.seconds})
// console.log(ii.milliseconds / 60 / 60)
// console.log(ii)
// // console.log(iii)
// //////************** */

// // console.log(i.length('seconds'))

// // var difff = end.diff(start)
// // var c = difff.toObject(); //=> { months: 1 }
// // console.log(c)

