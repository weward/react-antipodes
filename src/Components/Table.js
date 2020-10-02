import React from 'react'
import { Table as MatTable} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Skycons, { SkyconsType } from 'react-skycons'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    centered: {
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center'
    },
    title: {
        textAlign: 'center',
        height: '60px'
    },
  });

function Table({ data }) {
    const classes = useStyles()
console.log(data)
    return (
        <>
            <h3 className={ [classes.title] }>{ data.address }</h3>

            { data.weather.sunrise !== undefined && 
                <div className={ classes.centered }>
                    <p>{ `${data.coordinates.latitude}, ${data.coordinates.longitude}` }</p>
                    <Skycons
                        color="black"
                        type={SkyconsType[`${data.weather.icon}`]}
                        animate={true}
                        size={96}
                        resizeClear={true}
                        className={ classes.centered }
                    />
                </div> 
            }
        
            { data.weather.sunrise !== undefined && 
                <TableContainer component={Paper}>
                    <MatTable aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Sunrise</TableCell>
                                <TableCell align="right">{ data.weather.sunrise }</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Sunset</TableCell>
                                <TableCell align="right">{ data.weather.sunset }</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Min. Temp</TableCell>
                                <TableCell align="right">{ data.weather.temp_min } °C</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Max. Temp</TableCell>
                                <TableCell align="right">{ data.weather.temp_max } °C</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Feels Like</TableCell>
                                <TableCell align="right">{ data.weather.feels_like } °C</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Wind Speed</TableCell>
                                <TableCell align="right">{ data.weather.wind_speed } m/sec</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Humidity</TableCell>
                                <TableCell align="right">{ data.weather.humidity } %</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Pressure</TableCell>
                                <TableCell align="right">{ data.weather.pressure } hPa</TableCell>
                            </TableRow>
                        </TableBody>
                    </MatTable>
                </TableContainer>
            }
        </>
    )
}

export default Table
