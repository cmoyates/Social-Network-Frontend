import React from 'react'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { useState, useEffect, useRef, Fragment } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

let socket;

const useStyles = makeStyles((theme) => ({
    outerDiv: {
        flex: 1,
        display: "flex",
        overflow: "auto",
        flexDirection: "row"
    },
    innerDiv: {
        display: "flex", overflow: "auto", flexDirection: "column"
    },
    listDiv: {
        display: "flex",
        minHeight: 'min-content',
        flexDirection: "column"
    },
    localMessage: {
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: "5px",
        padding: "5px"
    },
    message: {
        border: "2px solid #dedede",
        borderRadius: "5px",
        padding: "5px"
    }
}));

const Messages = (props) => {
    const scrollRef = useRef(null);
    const classes =  useStyles();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [otherPersonName, setOtherPersonName]  = useState("");

    const ENDPOINT = "https://fast-coast-04774.herokuapp.com";

    

    useEffect(() => {
        if (props.chats.length === 0) {
            props.fetchChats();
        }
        else {
            socket = io(ENDPOINT);

            //console.log(socket);

            setOtherPersonName(props.currentChat.participants.find((item)=>(item.profile_id !== props.profile.profile_id)).user_name.split(" ")[0]);

            const name = props.profile.user_name;
            const room = props.currentChat.room_name;
            const profile_id = props.profile.profile_id;
            socket.emit('join', {name, profile_id, room}, (error) => {
                if (error) alert(error);
                console.log(`Joined ${room}`)
                //console.log(props.currentChat.messages)
                //setMessages(props.currentChat.messages.messageList)
            });

            return () => {

                //console.log(props.currentChat.messages.messageList);
                //console.log(messages)
                socket.disconnect();
                socket.off();
            }
        }

        
    }, [ENDPOINT, props.currentChat])

    useEffect(() => {
        if (socket) {
            socket.off('message').on('message', (message) => {
                setMessages([...messages, message]);
                if (scrollRef.current) {
                    scrollRef.current.scrollIntoView({ behaviour: "smooth" });
                }
            })
        }
    }, [messages, props.currentChat])

    useEffect(() => {
        setMessages([]);
        if (props.currentChat) {
            setMessages(props.currentChat.messages.messageList);
        }
    }, [props.currentChat, props.chats])

    /*useEffect(() => {
        socket.on('roomData', (roomData) => {
            console.log("Room Data")
            console.log(roomData)
            setUsers(roomData.users);
        })
    })*/
    
    const sendMessage = (event) => {
        
        event.preventDefault();
        
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    const switchChatRoom = (item) => {
        if (props.currentChat.room_name !== item.room_name) {
            props.currentChat.messages.messageList = messages;
            props.setCurrentChat(item)
        }
    }

    return (
        <Fragment>
            <h1>Messages</h1>
            <div className={classes.outerDiv}>
                <Paper style={{flex: 1}} className={classes.innerDiv}>
                    <List className={classes.listDiv}>
                        <ListItem button onClick={()=>{props.setNewChatDialogOpen(true);}}>
                            <ListItemText>
                                Start a new chat
                            </ListItemText>
                            <ListItemIcon>
                                <AddIcon fontSize="large"/>
                            </ListItemIcon>
                        </ListItem>
                        {props.chats.map((item, index)=>{
                            const otherProfile = item.participants.find((item)=>(item.profile_id !== props.profile.profile_id));
                            const isActive = props.currentChat && item.chat_id === props.currentChat.chat_id;
                            return (<div key={index}>
                                <Divider />
                                <ListItem button onClick={()=>{switchChatRoom(item)}} selected={isActive}>
                                    <ListItemText>
                                        Chat with {otherProfile.user_name}
                                    </ListItemText>
                                    <ListItemIcon>
                                        <Avatar src={otherProfile.img_url}/>
                                    </ListItemIcon>
                                </ListItem>
                            </div>)
                        })}
                    </List>
                </Paper>
                <Paper style={{flex: 2}} className={classes.innerDiv}>
                    <div style={{flex: 1}} className={classes.innerDiv}>
                    <List className={classes.listDiv}>
                        {messages.map((item, index)=>{
                            const isLocal = item.from_id === props.profile.profile_id
                            return (
                                <ListItem 
                                ref={(index + 1 === messages.length) ? scrollRef : null} 
                                style={{display:'flex', justifyContent:`flex-${(isLocal) ? "end" : "start"}`}} 
                                key={index}
                                >
                                    <div style={{display: "flex", flexDirection: "column", alignItems: `flex-${(isLocal) ? "end" : "start"}`}}>
                                        <div className={(isLocal) ? classes.localMessage : classes.message}>{item.text}</div>
                                        <div style={{fontSize: "0.75em"}}>{(isLocal) ? "You" : otherPersonName}</div>
                                    </div>
                                </ListItem>
                            );
                        })}
                    </List>
                    </div>
                    <TextField id="outlined-basic" variant="outlined" 
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                    value={message} 
                    autoComplete='off'
                    onChange={(event) => setMessage(event.target.value)}
                    style={{width: "100%"}}
                    />
                </Paper>
            </div>
        </Fragment>
    )
}

export default Messages