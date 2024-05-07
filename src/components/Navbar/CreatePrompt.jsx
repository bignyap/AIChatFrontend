import * as React from 'react';

import BasicModal from '../Common/Modal';
import MultiLineTextField from "../Common/TextField"


export default function CreatePromptDialog(props) {

    const [textInput, setTextInput] = React.useState("");

  const handleClose = () => {
    props.handleClose();
  };

  const handleSubmit = () => {
    // Some Ops
    handleClose();
  };

  return (
    <BasicModal
      dialogContent={<CreatePromptDialogContent 
        setTextInput={setTextInput}
        textInput={textInput}
      />}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      title={"Create New Thread"}
      open={props.open}
    />
  );
}


function CreatePromptDialogContent (props) {

    return (
        <>
            <MultiLineTextField 
                label={""}
                placeholder={"Write the prompt here"}
                value= {props.textInput}
                rows={6}
                maxRows={10}
                onChange= {(event) => props.setTextInput(event.target.value)}
            />
        </>
    )
}
