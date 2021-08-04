import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ColorPickerCell from './ColorPickerCell';
import Grid from '@material-ui/core/Grid';

const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722"
];

const ColorPicker = (props) => {

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Pick a Color</DialogTitle>
                <DialogContent style={{width: 150}}>
                    <Grid container spacing={0}>
                        <Grid container item xs={12} spacing={0}>
                            <Grid item xs={3}>
                                <ColorPickerCell color={colors[0]} submit={props.handleSubmit}/>
                            </Grid>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[1]} submit={props.handleSubmit}/>
                            </Grid>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[2]} submit={props.handleSubmit}/>
                            </Grid>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[3]} submit={props.handleSubmit}/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={0}>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[4]} submit={props.handleSubmit}/>
                            </Grid>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[5]} submit={props.handleSubmit}/>
                            </Grid>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[6]} submit={props.handleSubmit}/>
                            </Grid>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[7]} submit={props.handleSubmit}/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={0}>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[8]} submit={props.handleSubmit}/>
                            </Grid>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[9]} submit={props.handleSubmit}/>
                            </Grid>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[10]} submit={props.handleSubmit}/>
                            </Grid>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[11]} submit={props.handleSubmit}/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={0}>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[12]} submit={props.handleSubmit}/>
                            </Grid>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[13]} submit={props.handleSubmit}/>
                            </Grid>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[14]} submit={props.handleSubmit}/>
                            </Grid>
                            <Grid item xs={3}>
                                <ColorPickerCell  color={colors[15]} submit={props.handleSubmit}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
        </div>
    )
}

export default ColorPicker
