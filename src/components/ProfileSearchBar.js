import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useState} from 'react';
import {makeStyles, alpha} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const ProfileSearchBar = (props) => {
    const classes = useStyles();
    let history = useHistory();

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
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
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
                renderInput={(params) => {
                  const {InputLabelProps,InputProps,...rest} = params;
                  return <InputBase {...params.InputProps} className={null} placeholder="Search…" classes={{root: classes.inputRoot, input: classes.inputInput}} inputProps={{ 'aria-label': 'search' }} {...rest}  />}}
            />
        </div>
    )
}

export default ProfileSearchBar
