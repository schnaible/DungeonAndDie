import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const highScoresTableAttributes = [
    {
        attributeName: 'Username',
        attributeDBName: 'Username',
        align: 'left'
    },
    {
        attributeName: 'Class',
        attributeDBName: 'Class',
        align: 'left'
    },
    {
        attributeName: 'Score',
        attributeDBName: 'Score',
        align: 'left'
    },
    {
        attributeName: 'Time',
        attributeDBName: 'Time',
        align: 'left'
    }
];

let keyID = 0;

const nextKey = () => keyID++;

export default function HighScoreAdderTable({Username,Class,Score,Time}) {


    const [highScores, setHighScores] = useState([]);
    console.log(`in HighScoreTTable highScores contains is ${JSON.stringify(highScores)}`);


    useEffect(() => {
        const api = new API();

        async function getHighScores() {
            const highScoresJSONString = await api.HighScoreAdder(Username,Class,Score,Time);
            console.log(`highScores from the DB ${JSON.stringify(highScoresJSONString)}`);
            setHighScores(highScoresJSONString.data);
        }

        getHighScores();
    }, []);



    return <Fragment>
        {
            highScores.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="highScore table">
                    <TableHead>
                        <TableRow key={nextKey()}>
                            {
                                highScoresTableAttributes.map(attr => <TableCell key={nextKey()}
                                                                                 align={attr.align}>{attr.attributeName}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {highScores.map((highScore) => (
                            <TableRow
                                key={nextKey()}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                {
                                    highScoresTableAttributes.map(attr => <TableCell key={nextKey()}
                                                                                     align={attr.align}>{highScore[attr.attributeDBName]}</TableCell>)
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        }
    </Fragment>
}