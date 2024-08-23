import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addWidget } from '../store';

export default function ScrollDialog({ category ,open , handleClose}) {
    const [widget , setWidget] = React.useState({
        title:'',
        text:''
    });

    const [widgetError , setWidgetError] = React.useState({
        title:false,
        text:false
    });  

    const dispatch = useDispatch()
    const onSubmit = () => {
        const isTitleValid = widget.title.trim() !== '';
        const isTextValid = widget.text.trim() !== '';
    
        if (isTitleValid && isTextValid) {
            dispatch(addWidget({ key: category, widget }));
            handleClose();
            setWidget({
                title: '',
                text: ''
            });
            setWidgetError({
                title: false,
                text: false
            });
        } else {
            setWidgetError({
                title: !isTitleValid,
                text: !isTextValid
            });
        }
    };
    
    const onChange = (e) => {
        const { name, value } = e.target;
        setWidget(prevWidget => ({
          ...prevWidget,
          [name]: value
        }));
        setWidgetError({
            title: false,
            text: false
        });
      };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={
            ()=>{
                handleClose();
                setWidget({
                    title:'',
                    text:''
                })
            }
        }
        scroll={'paper'}
      >
        <DialogTitle id="scroll-dialog-title">{category}</DialogTitle>
        <DialogContent dividers>
            <TextField 
                error={widgetError.title}
                value={widget.title}
                onChange={onChange}
                helperText={widgetError.title?"Incorrect entry.":''}
                name='title'
                label="Title" 
                variant="outlined"  
                margin="normal"  
                fullWidth
            />
            <TextField
                error={widgetError.text}
                value={widget.text}
                onChange={onChange}
                helperText={widgetError.text?"Incorrect entry.":''}
                name='text'
                label="Text" 
                variant="outlined" 
                margin="normal"  
                fullWidth 
                multiline
            />
        </DialogContent>
        <DialogActions>
            <Button 
            onClick={
                ()=>{
                    handleClose();
                    setWidget({
                        title:'',
                        text:''
                    })
                }
            }
            >
                Cancel
            </Button>
            <Button onClick={onSubmit}>Add Widget</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
