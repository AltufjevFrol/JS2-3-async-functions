/**
 * @param {Function[]} operations
 * @param {Function} callback
 */

 /*
 *Это реализация функции параллельного выполнения
 *асинхронных операций в стиле callback
 */
 
module.exports = function (operations, callback) {
    if(operations.length === 0) {callback(null,[])}
var arrResult = [];
var end = operations.length;
/*
*end поможет определить что все асинхронные операции
*завершились и пора вызывать финальный callback
*/
operations.map(start);//запускаем все асинхронные функции

function start (iOper,i){
    iOper(next);
    /*
    *функция next определена в start что бы видеть параметр i
    */
        function next (err, data) {
            if (err) {
                end = null;//если есть ошибка не допустим вызов 
                // cb с результатом
                callback(err, null);//запускаем cb с ошибкой
            }else if (end) {
                arrResult[i] = data;//если ошибки нет то запишем результат
                //на соответствующее место в массиве
                end = end-1;
            } 

            if (end === 0) callback(null, arrResult);
            //после завершения всех асинхронных операций
            //вызвали cb  с результирующим массивом
        }
}
};