import { Box, Button, Checkbox, Drawer, IconButton, List, ListItem, ListItemText, Stack, Tab, Tabs, Typography } from '@mui/material';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { removeWidget } from '../store';

export default function AddWidgets({open , toggleDrawer,handleClickOpen}) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.widgets);

    const [value, setValue] = React.useState(0);
    const [selectedValue, setSelectedValue] = React.useState(Object.keys(data)[0]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
      setSelectedValue(event.target.textContent)
    };

    const handleDelete = (index) => {
        dispatch(removeWidget({ key : selectedValue, index }));
    }

    return (
        <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
            <Box sx={{width:600}}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{p:0.5,  backgroundColor: '#1976d2'}}>
                <Typography
                    variant="overline"
                    noWrap
                    component="div"
                    sx={{color:'white', ml:2,flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Widgets DashBoard
                </Typography>
                <IconButton onClick={toggleDrawer(false)}>
                    <CloseIcon sx={{fontSize:20 , color:'white'}}/>
                </IconButton>
            </Stack>
            <Typography
                    variant="body2"
                    noWrap
                    component="div"
                    sx={{ml:2,flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Personalize your dashboard by adding the follwing widget
            </Typography>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="scrollable force tabs example"
                >
                {Object.keys(data).map((section , index)=>{
                    return(
                        <Tab key={section+index} label={section} />
                    )
                })}
            </Tabs>
            <List>
                {data[selectedValue].map((widget , index)=>{
                    return(
                        <ListItem
                        key={widget.title + index}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={()=>handleDelete(index)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                        >
                        <ListItemText
                            primary={widget.title}
                        />
                        </ListItem>
                    )
                })}
                
            </List>
            <Stack sx={{position:'absolute' , bottom:0 , m:2 , right:0}}>
            <Button variant="contained" fullWidth onClick={()=>handleClickOpen(selectedValue)}>
                Add widget
            </Button>
            </Stack>
            </Box>
        </Drawer>
    )
}
