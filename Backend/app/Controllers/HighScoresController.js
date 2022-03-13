const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');
const buildStudentViewFromCourses = require('../Schema/buildStudentViewFromCourses');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class HighScoresController {
    constructor() {
        console.log('Constructor of HighScoreController is called.');
    }

    async allHighScores(ctx) {
        console.log('Scores all Scores called.');
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *
                FROM high_score
                ORDER BY Score
            `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in ScoresController::allScores", error);
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

    async HighScoresAdder(ctx) {
        let Info = ['','','',''];//This is the array for user information
        let count = 0;//this is used to mark what part of the array we are adding to
        for(let i = 0; i < ctx.params.Username.length; i++){//This is where I read the data and extract the information
            if(ctx.params.Username[i] === ',')//Since I passed the data in a list it is seperated by ,. Make sure , is not allowed for names
                count++;
            else
                Info[count] += ctx.params.Username[i];
        }
            //console.log('Test');
        console.log('Score added.');
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO high_score (Username,Class,Score,Time) 
                VALUE ('${Info[0]}','${Info[1]}','${Info[2]}','${Info[3]}');
            `;
            dbConnection.query({
                sql: query,
                //The variable below must retain a name from the high Score table.
                values: [ctx.params.Username]//This username variable holds all the information for the player that the table needs
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in MarketsController::marketWithMarketID", error);
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

module.exports = HighScoresController;
