/**
 * @param {Function[]} operations
 * @param {Function} callback
 */

 /*
 *Реализация функции параллельного выполнения асинхронных
 *операций в стиле Promise
 */
module.exports = function (operations, callback) {
//создаем promise на каждую операцию
var arrProm = operations.map(start);


function start (iOper,i){
     return new Promise (function(resolve, reject){
        iOper(function(err,result){// тут наш next
            if (err) {reject(err)}
                resolve(result);
        })
     })
}
// Promise.all возвращает промис с результирующим массивом
// или первой ошибкой
Promise.all(arrProm).then(function(fulfiled){
    callback(null, fulfiled);})
    .catch(function(error){
        callback(error, null);
    });
};