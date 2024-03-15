import React, {useState, useEffect} from "react"
import ModelSelector from "./ModelSelector"
import MultiLineTextField from "../../components/TextField"
import Box from '@mui/material/Box';
import SendButton from "../../components/SendButton"
import FixedBottom from "../../components/FixedBottom"
import "../../styles/RightPane.css"
import { getThreadMessages, createThreadMessages } from "../../libraries/api"
import CodeHighlighter from "../../components/CodeHighlighter"
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';

export default function RightPane(props) {

    const [contents, setContents] = useState([]);
    const [firstByte, setFirstByte] = useState(true);

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
                    setFirstByte(false);
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


function ChatHighlighter (prop) {
   // Regular expression to match code blocks wrapped in triple backticks
  const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)\n```/gm;

  // Split the text into code blocks and regular text
  const parts = prop.text.split(codeBlockRegex);

  // Process the parts to render code blocks and regular text
  const elements = parts.map((part, index) => {
    if (index % 3 === 0) {
      // Regular text
      return <span key={index}>{part}</span>;
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
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default Enter key behavior
            handleChatSubmit();
        }
    };

    async function handleChatSubmit () {
        setTextInput('');
        await props.handleCreateThread(textInput);
    };

    return (
        <div className="input--area">
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                }}
            >
                <MultiLineTextField 
                    fullWidth 
                    label='Ask your questions'
                    id="fullWidth"
                    placeholder='Ask your questions'
                    value={textInput}
                    onChange={handleTextInputChange}
                    onKeyPress={handleKeyPress} // Call handleKeyPress function on key press
                />
            </Box>
            <SendButton 
                onClick={handleChatSubmit}
            />
        </div>
    )
}


function ChatOptionPane() {
    const models = [
        {
            "index": 1,
            "name": "gpt-3.5-turbo-0125"
        },
        {
            "index": 2,
            "name": "gpt-3.5-turbo-1106"
        },
        {
            "index": 3,
            "name": "gpt-4-1106-preview"
        },
        {
            "index": 4,
            "name": "gpt-4-1106-vision-preview"
        }
    ]

    const prompts = [
        {
            "index": 1,
            "name": "Interviewer",
            "prompt": ""
        },
        {
            "index": 2,
            "name": "Chat Assistant",
            "prompt": ""
        }
    ]
    
    return (
        <section className="chat--option--pane">
            <h4>Model</h4>
            <ModelSelector
                models = {models}
            />
            <h4>Prompt</h4>
            <ModelSelector
                models = {prompts}
            />
        </section>
    )
}






