import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
        '&$disabled $notchedOutline': {
            boarderColor: "yellow !important"
        }
    },
    disabled: {},
    notchedOutline: {}
}));

const CssTextField = withStyles({
    /*root: {
      /*'& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#ffffff',
          background: '#ffffff'
        },
        '&:hover fieldset': {
          borderColor: '#ffffff',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#ffffff',
        },
      },
    },*/
  })(TextField);

const ProfileSearchBar = (props) => {
    let history = useHistory();

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
                id="free-solo-2-demo"
                disableClearable
                options={props.profiles}
                getOptionLabel={(option)=>{return option.user_name}}
                open={open}
                onOpen={handleOpen}
                onClose={() => setOpen(false)}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onChange={(event, value)=>{history.push('/profile/' + value.profile_id);}}
                popupIcon={null}
                style={{hasPopupIcon: false, hasClearIcon: false}}
                renderInput={(params) => (
                <CssTextField
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
