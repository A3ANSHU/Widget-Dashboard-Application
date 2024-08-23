import { useEffect, useMemo, useState } from 'react';
import './App.css';
import SearchAppBar from './componants/AppBar';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Divider, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import AddWidgets from './componants/AddWidgets';
import { useDispatch, useSelector } from 'react-redux';
import ScrollDialog from './componants/Widgets';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { removeWidget } from './store';
import noData from './assets/cb19914a6a4aedfe2dca65d736ce60bb-removebg-preview.png'
function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.widgets);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [category, setCategory] = useState('');
  const [search , setSearch] = useState('');

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const handleClickOpen = (category) => {
    setOpenDialog(true);
    setCategory(category)
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = (index , cat) => {
    dispatch(removeWidget({ key : cat, index }));
  }

  const filteredData = useMemo(() => {
    return Object.keys(data).reduce((acc, category) => {
      const filteredWidgets = data[category].filter(widget => 
        widget.title.toLowerCase().includes(search.toLowerCase())
      );

      if (filteredWidgets.length > 0) {
        acc[category] = filteredWidgets;
      }

      return acc;
    }, {});
  }, [data, search]);

  return (
    <Box>
    <SearchAppBar search={search} setSearch={setSearch} />
    <Stack direction='row' justifyContent='space-between' sx={{p:2.5 , mt:8}}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
      >
        Widgets DashBoard
      </Typography>
      <Button onClick={toggleDrawer(true)} variant="contained" endIcon={<AddIcon />}>
        Add widgets
      </Button>
      <AddWidgets open={openDrawer} toggleDrawer={toggleDrawer} handleClickOpen={handleClickOpen}/>
    </Stack>
    <Box sx={{overflow:'auto', scrollbarWidth:'thin', height:'80.5vh'}}>
    <Grid container >
      { Object.keys(filteredData).length> 0 ?
      Object.keys(filteredData).map((category , index)=>{
        return(
          <Grid key={category+index} item xs={12}>
            <Typography
              variant="body1"
              noWrap
              component="div"
              sx={{paddingX:2.5}}
            >
              {category}
            </Typography>
            <Grid container>
              {
                filteredData[category].map((widget , index)=>{
                  return(
                    <Grid key={widget.title + index} item xs={12} md={4} sm={6} sx={{p:2}}>
                      <Paper elevation={6} sx={{p:0 ,borderRadius:4 }}>
                        <Stack alignItems={'center'} justifyContent={'space-between'} direction={'row'} sx={{pl:2}}>
                        <Typography
                            variant="overline"
                            noWrap
                            component="div"
                          >
                            {widget.title}
                          </Typography>
                          <IconButton onClick={()=>handleDelete(index , category)}>
                              <CloseIcon sx={{fontSize:20}}/>
                          </IconButton>
                        </Stack>
                        <Stack sx={{p:2}}>
                        <Typography
                            variant="body2"
                            component="div"
                          >
                            {widget.text}
                          </Typography>
                        </Stack>
                      
                      </Paper>
                      
                    </Grid>
                  )
                })
              }
              <Grid item xs={12} md={4} sm={6} sx={{p:2}}>
                <Paper elevation={6} sx={{p:3 ,borderRadius:4 , textAlign:'center'}}>
                  <Button onClick={()=>handleClickOpen(category)} variant="outlined" startIcon={<AddIcon />}>
                    Add widget
                  </Button>
                </Paper>
              </Grid>
            </Grid>
            <Divider/>
          </Grid>
        )
      }):
      <Stack width={'100%'} alignItems={'center'}>
        <img src={noData} alt=''></img>
        <Stack >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{mb:4, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Oops No Data !!!
        </Typography>
        <Button onClick={()=>{setSearch('')}} variant="contained" endIcon={<SearchIcon />}>
          Search Again
        </Button>
        </Stack>
      </Stack>
      }
    </Grid>
    </Box>
    <ScrollDialog category={category} open={openDialog} handleClose={handleClose}/>
    </Box>
  );
}

export default App;
