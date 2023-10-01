const _ = require("lodash");

// Duration for which a cached value remains in milliseconds
const CACHE_DURATION = 50000;
const start = new Date();

const cachePeriod = (...args) => {
    let argVal = "";
    if(argVal.length){
        argVal = _.reduce(args[0],(acc,arg) => acc + arg.id,"") + args[1];
    }
    const date = new Date()
    return `${Math.floor((date.getTime() - start.getTime())/CACHE_DURATION)}-${argVal}`
}

module.exports = cachePeriod;