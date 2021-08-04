import React from 'react'
import Paper from '@material-ui/core/Paper';

const ColorPickerCell = (props) => {
    return (
        <Paper variant="outlined" square={true} onClick={() => {props.submit(props.color);}} style={{
            backgroundColor: props.color,
            width: 37.5,
            height: 32
        }}></Paper>
    )
}

export default ColorPickerCell
