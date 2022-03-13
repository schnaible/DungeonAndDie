import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const triviasTableAttributes = [
    {
        attributeName: 'Question',
        attributeDBName: 'Question',
        align: 'left'
    }

];

let keyID = 0;

const nextKey = () => keyID++;

export default function TriviaTable(props) {


    const [trivias, setTrivias] = useState([]);
    console.log(`in TriviaTTable trivias contains is ${JSON.stringify(trivias)}`);


    useEffect(() => {
        const api = new API();

        async function getTrivias() {
            const triviasJSONString = await api.allTrivia();
            console.log(`trivias from the DB ${JSON.stringify(triviasJSONString)}`);
            setTrivias(triviasJSONString.data);
        }

        getTrivias();
    }, []);



    return <Fragment>
        {
            trivias.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="trivia table">
                    <TableHead>
                        <TableRow key={nextKey()}>
                            {
                                triviasTableAttributes.map(attr => <TableCell key={nextKey()}
                                                                              align={attr.align}>{attr.attributeName}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trivias.map((trivia) => (
                            <TableRow
                                key={nextKey()}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                {
                                    triviasTableAttributes.map(attr => <TableCell key={nextKey()}
                                                                                  align={attr.align}>{trivia[attr.attributeDBName]}</TableCell>)
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        }
    </Fragment>
}