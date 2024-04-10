import React, {useState, useEffect} from "react"
import Box from '@mui/material/Box';
import FixedBottom from "../../components/FixedBottom"
import "../../styles/RightPane.css"
import { getThreadMessages, createThreadMessages } from "../../libraries/api"
import CodeHighlighter from "../../components/CodeHighlighter"
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Markdown from 'react-markdown';

export default function RightPane(props) {

    const [contents, setContents] = useState([]);

    useEffect(() => {
        const fetchThreadMessages = async () => {
            if (props.currThread) {
                const messages = await getThreadMessages(props.currThread);
                setContents(messages);
            } else {
                setContents([]);
            }
        };
        
        fetchThreadMessages();
    }, [props.currThread]);

    async function handleCreateThread(message) {
        setContents(prevThreads => 
            [...prevThreads, {
                "message": message,
                "role": "user"
            }]
        );

        const onDataReceived = (message) => {
            const response = {
                "message": message.message,
                "role": 'assistant'
            }
            setContents(prevContents => {
                if (message.firstByte) {
                    return [...prevContents, response];
                } else {
                    return [...prevContents.slice(0, -1), response];
                }
            });
        };
        await createThreadMessages(props.currThread, message, onDataReceived);
    };

    return (
        <>{props.currThread && (
            <FixedBottom 
                top={
                    <div className="chat--history">
                        {contents.map((content, index) => 
                            <ChatMessage key={index} content={content} />
                        )}
                    </div>
                }
                bottom={
                    <UserMessage 
                        handleCreateThread={handleCreateThread}
                    />
                }
            />
        )}</>
    )
}


function ChatMessage (props) {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar 
                    alt={props.content.role === "user" ? "You" : "Assistant"} 
                    src="/static/images/avatar/2.jpg" 
                />
            </ListItemAvatar>
            <ListItemText 
                primary={
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body1"
                        color="black"
                        style={{fontWeight: 'bold'}}
                    >
                        {props.content.role === "user" ? "You" : "Assistant"}
                    </Typography> 
                } 
                secondary={
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="subtitle1"
                        color="black"
                    >
                        {<ChatHighlighter text={props.content.message} />}
                    </Typography> 
                }
            />
        </ListItem>
    )
}

// TODO: Improve this function to handle different cases

function ChatHighlighter (prop) {
   // Regular expression to match code blocks wrapped in triple backticks
  const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)\n```/gm;

  // Split the text into code blocks and regular text
  const parts = prop.text.split(codeBlockRegex);

  // Process the parts to render code blocks and regular text
  const elements = parts.map((part, index) => {
    if (index % 3 === 0) {
      // Regular text
      return <span key={index}>
        <Markdown>
            {part}
        </Markdown>
    </span>;
    } else if (index % 3 === 1) {
      // Language name
      return null;
    } else {
      // Code content
      return <CodeHighlighter key={index} code={part} language={parts[index - 1]} />;
    }
  });

  return <div>{elements}</div>;
}


function UserMessage(props) {
    const [textInput, setTextInput] = useState('');
    
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter' && event.shiftKey) {
            setTextInput(prevText => prevText + '\n');
            event.preventDefault();
        } else if (event.key === 'Enter') {
            event.preventDefault();
            handleChatSubmit();
        }
    };

    async function handleChatSubmit () {
        setTextInput('');
        await props.handleCreateThread(textInput);
    };

    return (
        
        <Box
            sx={{
                p: '2px 4px', 
                display: 'flex', 
                alignItems: 'center',
                width: '100%',
                maxWidth: '100%'
            }}
        > 
            <InputBase
                fullWidth
                multiline
                sx={{ 
                    ml: 1, 
                    flex: 1, 
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)', 
                    padding: '10px',
                    borderRadius: '20px',
                }}
                placeholder='Ask your questions'
                maxRows={6}
                value={textInput}
                onChange={handleTextInputChange}
                onKeyDown={handleKeyPress}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleChatSubmit}
                        >
                            <SendIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </Box>
    )
}






