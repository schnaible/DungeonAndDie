const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');
const buildStudentViewFromCourses = require('../Schema/buildStudentViewFromCourses');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class TriviasController {
    constructor() {
        console.log('Constructor of TriviasController is called.');
    }

    async allTrivias(ctx) {
        console.log('trivias all trivias called.');
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *
                FROM
                    trivia

                ORDER BY QuestionID
            `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TriviasController::allTrivias", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async triviaWithTriviaID(ctx) {
        //console.log(`ctx.params.QuestionID: ${ctx.params.QuestionID}`)
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *
                FROM
                    trivia
                WHERE
                    QuestionID = ?
            `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.QuestionID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TriviasController::triviaWithTriviaID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }
}

module.exports = TriviasController;
