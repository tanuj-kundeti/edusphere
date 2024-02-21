import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@mui/material/Snackbar';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  chatSection: {
    width: '100%',
    height: '70vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '2px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

var baseUrl = "https://edusphere.vercel.app"
// var baseUrl = "http://127.0.0.1:8000"


const ChatPage = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([])
  const [chatData, setChatData] = useState([])
  const [selectUserName , setSelectUserName] = useState("User")
  const [selectedUserEmail , setSelectedUserEmail] = useState("")
  const [typedMessage , setTypedMessage] = useState("")
  const [snackbarMessage, setSnackbarMessage] = React.useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);

  const userFullName = localStorage.getItem("userFullName"); 
  
  useEffect(() => {
        fetchUserThreads()
    },[])

    async function fetchUserThreads() {
        try {
          const response = await fetch(baseUrl + `/api/chats-for-user/?username=${localStorage.getItem("userId")}`, {
            method: 'GET',
          });
          const data = await response.json();
          setUsers(data.data)
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }

    async function sendChatUpdate() {
        const data = {
            senderusername: localStorage.getItem("userId"),
            username1: localStorage.getItem("userId"),
            username2: selectedUserEmail,
            message: typedMessage
        };
      
        const response = await fetch(baseUrl+"/api/chat-update/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })

        const responseData = await response.json();
        if(responseData.Status == "Success"){
            // Handle response data here
            setSnackbarMessage("Your message is successfully sent to "+ selectUserName)
            setOpenSuccessSnackbar(true)
            fetchUserThreads()
            var obj = {}
            obj["chatId"] = "x"
            obj["userId1"] = "x"
            obj["userId2"] = "x"
            obj["messageSenderId"] = "x"
            obj["message"] = typedMessage
            obj["messageSenderName"] = userFullName
            obj["messageDateTime"] = "recent"

            chatData.push(obj)
            setChatData(chatData)
            setTypedMessage("")

        }
        else{
          console.log("Error occured")
        }
          // .then(response => {
          //   if (response.status == 200) {
          //     // Request was successful
          //     console.log("response : ", response.status)

          //   //   location.reload(); 

          //   } else {
          //     // Request failed
          //     throw new Error("Request failed");
          //   }
          // })
          // .then(data => {
          //   if (data.Status == 'success') {

          //   }

          //   console.log(data);
          // })
          // .catch(error => {
          //   // Handle errors here
          //   console.error(error);
          // });
      }
      

    function handleClick(id) {
        // do something with the clicked item's ID, such as navigate to a new page or update the state
        console.log(`Item ${id} was clicked`);
        var selectedChatData = users.find(item => item.otherUserId === parseInt(`${id}`))
        var selectedChats = selectedChatData["chats"]
        var selectedUserName =  selectedChatData["receiverName"]
        var selectedUserEmail =  selectedChatData["receiveUsername"]

        
        selectedChats.sort((a, b) => a.chatId - b.chatId);
        console.log("required dta : ",selectedChatData )
        setChatData(selectedChats);
        setSelectUserName(selectedChatData["receiverName"])
        setSelectedUserEmail(selectedChatData["receiveUsername"])

    }
  
    function handleTypeMessageChange(event) {
        setTypedMessage(event.target.value);
      }

    function handleSendMessage(e){
        sendChatUpdate()
    }

    function handleClose(e){
        setOpenSuccessSnackbar(false);
      };

  return (
      <div>
        <Grid container >
            {/* <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid> */}
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar style={{backgroundColor: 'blueviolet'}}>
                                    {userFullName.charAt(0).toUpperCase()}
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={userFullName}></ListItemText>
                        <span style={{width: "10px",height: "10px",borderRadius: "50%",backgroundColor: "green"}}></span>

                    </ListItem>
                </List>
                <Divider />
                <List className={classes.messageArea}>
                    {users.map((item) => (
                        <ListItem button key={item.threadId} onClick={() => handleClick(item.otherUserId)}>
                            <ListItemIcon>
                                {(item.otherUserType == 'i') ? 
                                    <Avatar style={{ backgroundColor: 'brown' }}>
                                        {item?.receiverName?.charAt(0).toUpperCase()}
                                    </Avatar>
                                    :
                                    <Avatar style={{ backgroundColor: 'darkgreen' }}>
                                        {item?.receiverName?.charAt(0).toUpperCase()}
                                    </Avatar>
                                }

                                {/* <Avatar>
                                    {item?.receiverName?.charAt(0).toUpperCase()}
                                </Avatar> */}
                            </ListItemIcon>
                            <ListItemText primary={item.receiverName} />
                            {(item.status == 'online') ? 
                            <span style={{width: "10px",height: "10px",borderRadius: "50%",backgroundColor: "green"}}></span>
                            :
                            <span style={{width: "10px",height: "10px",borderRadius: "50%",backgroundColor: "red"}}></span>
                            }
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>

                    {/* {chatData.map((item) => (
                            <ListItem alignItems="flex-start">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" primary={item.message}>
                                        </ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" primary={item.message} secondary={item.messageDateTime}></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            ))} */}

                    {chatData.map((item) => (

                        <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar>
                                        {item.messageSenderName.charAt(0).toUpperCase()}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.message}
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {item.messageDateTime}
                                        </Typography>
                                        {/* {" — I'll be in your neighborhood doing errands this…"} */}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

                        ))}
                </List>
                <p style={{fontSize: 'small', textAlign: 'center', color: 'gray', margin:0}}>
                    Chatting with <span style={{color:'green'}}>{selectUserName} </span>
                </p>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type your message" fullWidth value={typedMessage} onChange={handleTypeMessageChange}/>
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add" onClick={handleSendMessage}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                open={openSuccessSnackbar}
                autoHideDuration={5000}
                onClose={handleClose}
                message={snackbarMessage}
            />
        </Grid>
      </div>
  );
}

export default ChatPage;