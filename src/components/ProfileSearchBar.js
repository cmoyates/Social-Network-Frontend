import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        '&$disabled $notchedOutline': {
            boarderColor: "yellow !important"
        }
    },
    disabled: {},
    notchedOutline: {}
}));

const ProfileSearchBar = (props) => {

    const classes = useStyles();

    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if (inputValue.length > 2) {
            setOpen(true);
        }
    };
    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        setOpen(newInputValue.length > 2);
    };

    return (
        <div style={{ width: 300 }}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={props.profiles.map((option) => option.user_name)}
                open={open}
                onOpen={handleOpen}
                onClose={() => setOpen(false)}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search', classes: {
                        root: classes.root,
                        disabled: classes.disabled,
                        notchedOutline: classes.notchedOutline
                    }}}
                />
                )}
            />
        </div>
    )
}

export default ProfileSearchBar
