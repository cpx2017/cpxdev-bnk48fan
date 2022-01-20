import React from 'react';
import { AppBar, Toolbar,Typography, IconButton, Drawer, FormControlLabel, Switch, ListItem, ListItemIcon, Divider, ListItemText,
Card, CardContent, Avatar, Button, ListItemSecondaryAction, List, Checkbox, Fade, Grow, CardHeader } from '@material-ui/core';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  rank: {
    width: theme.spacing(10),
  },
  img: {
    width: theme.spacing(50),
  },
}));

const Ge = () => {
  const classes = useStyles();

  const timesch = {
    regis: {
      open: 1641834000,
      close: 1643043599
    },
    vote: {
      open: 1646845200, 
      close: 1649264399
    },
    announ: 1649473200
  }

  const CheckTZ = (meth) => {
    let dcn = 2;
    const cur = moment().unix();
    // const cur = 1649501999;
    switch(meth) {
      case 1:
        if(cur > timesch.regis.close) {
          dcn = 0
        } else if(cur >= timesch.regis.open && cur <= timesch.regis.close) {
          dcn = 1
        } else {
          dcn = 2
        }
        break;
      case 2:
        if(cur > timesch.vote.close) {
          dcn = 0
        } else if(cur >= timesch.vote.open && cur <= timesch.vote.close) {
          dcn = 1
        } else {
          dcn = 2
        }
        break;
      case 3:
        if(cur > timesch.announ) {
          dcn = 0
        } else if(cur >= timesch.vote.close && cur <= timesch.announ) {
          dcn = 1
        } else {
          dcn = 2
        }
        break;
      case 4:
        if(cur >= timesch.announ) {
          dcn = 1
        } else {
          dcn = 2
        }
        break;
      default:
      break;
    }
    return dcn
  }

    return ( 
        <>
           {window.innerWidth > 800 && (
              <div class="video-background">
              {localStorage.getItem('lowgraphic') == null ? (
                <div class="video-foreground">
                <iframe src="https://www.youtube.com/embed/t4qbDdGe-0g?autoplay=1&mute=1&controls=0&loop=1&playlist=t4qbDdGe-0g" frameborder="0"></iframe>
              </div>
              ) : (
                <Fade in={true} timeout={800}>
                  <div class="">
                    <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/myport/fav/bnk48.jpg" />
                  </div>
                  </Fade>
              )}
          </div>
            )}
                {window.innerWidth > 800 ? (
                <div className="cover mt-4">
                <Grow in={true} timeout={1000}>
              <Card className="col-md-4 m-5">
              <CardContent>
                <Typography variant="h5" component="h2">
                What is GE3?
                </Typography>
                <hr />
                <Typography color="textSecondary">
                GE3 or BNK48 12th Single General Election is the third of BNK48 general election. And the first Election of BNK48 which use Blockchain Technology also part of this election. Operated by Token X of SCB X.
                </Typography>
                <hr />
                <Typography variant="body1" component="p">
                  Common Feature
                  <ListItem>
                    <ListItemText primary="1. See timeline of this election in realtime." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2. See election result announcement. Followed from live streaming platform anywhere. (For any users who want to save your internet usage)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="3. See live post and comment or any mentions about this election" />
                  </ListItem>
                </Typography>
              </CardContent>
                </Card>
                </Grow>
              </div>
              ) : (
            <div className="bnktheme pb-5 pt-2">
        <Grow in={true} timeout={1000}>
      <Card className="ml-2 mr-2">
      <CardContent>
                <Typography variant="h5" component="h2">
                What is GE3?
                </Typography>
                <hr />
                <Typography color="textSecondary">
                GE3 or BNK48 12th Single General Election is the third of BNK48 general election. And the first Election of BNK48 which use Blockchain Technology also part of this election. Operated by Token X of SCB X.
                </Typography>
                <hr />
                <Typography variant="body1" component="p">
                  Common Feature
                  <ListItem>
                    <ListItemText primary="1. See timeline of this election in realtime." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2. See election result announcement. Followed from live streaming platform anywhere. (For any users who want to save your internet usage)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="3. See live post and comment or any mentions about this election" />
                  </ListItem>
                </Typography>
              </CardContent>
        </Card>
        </Grow>
      </div>
          )}


        <div className={'stage ' + (window.innerWidth > 700 ? 'p-5' : 'p-2')}>
          <Card>
            <CardContent>
              <CardHeader title="TimeLine of Election" subheader="Notes: Timeline are subject to change as appropriate due to the situation of the epidemic of Covid-19." />
              <hr />
              <div className='row justify-content-center'> 
              <List className='col-md-5'>
                <ListItem>
                  <ListItemText className={CheckTZ(1) == 0 ? 'text-muted' : CheckTZ(1) == 1 ? 'text-success' : ''} primary="Members Registration for Election" secondary="Jan 11-24, 2022" />
                  {
                    CheckTZ(1) == 0 && (
                      <ListItemSecondaryAction>
                        <Checkbox
                          checked={true}
                          tabIndex={-1}
                          disabled={true}
                        />
                  </ListItemSecondaryAction>
                    )
                  }
                   {
                    CheckTZ(1) == 1 && (
                      <ListItemSecondaryAction>
                         <IconButton edge="end">
                      <FiberManualRecordIcon className='text-success' />
                    </IconButton>
                  </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
                <ListItem>
                  <ListItemText className={CheckTZ(2) == 0 ? 'text-muted' : CheckTZ(2) == 1 ? 'text-success' : ''} primary="Open Vote" secondary="Mar 10, 2022" />
                  {
                    CheckTZ(2) == 0 && (
                      <ListItemSecondaryAction>
                        <Checkbox
                          checked={true}
                          tabIndex={-1}
                          disabled={true}
                        />
                  </ListItemSecondaryAction>
                    )
                  }
                   {
                    CheckTZ(2) == 1 && (
                      <ListItemSecondaryAction>
                         <IconButton edge="end">
                      <FiberManualRecordIcon className='text-success' />
                    </IconButton>
                  </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
                <ListItem>
                  <ListItemText className={CheckTZ(3) == 0 ? 'text-muted' : CheckTZ(3) == 1 ? 'text-success' : ''} primary="Close Vote" secondary="Apr 7, 2022" />
                  {
                    CheckTZ(3) == 0 && (
                      <ListItemSecondaryAction>
                        <Checkbox
                          checked={true}
                          tabIndex={-1}
                          disabled={true}
                        />
                  </ListItemSecondaryAction>
                    )
                  }
                   {
                    CheckTZ(3) == 1 && (
                      <ListItemSecondaryAction>
                         <IconButton edge="end">
                      <FiberManualRecordIcon className='text-success' />
                    </IconButton>
                  </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
                <ListItem>
                  <ListItemText className={CheckTZ(4) == 1 ? 'text-success' : ''} primary="Announcement Result" secondary="Apr 9, 2022" />
                   {
                    CheckTZ(4) == 1 && (
                      <ListItemSecondaryAction>
                         <IconButton>
                      <FiberManualRecordIcon className='text-success' />
                    </IconButton>
                  </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
              </List>
              </div>
            </CardContent>
          </Card>
          <Card className='mt-5'>
            <CardContent>
              <CardHeader title="Result of Election" subheader="Notes: System will be under maintenance." />
              <hr />
              <TableContainer>
                <Table stickyHeader aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.rank}>Rank</TableCell>
                      <TableCell className={classes.img} align="center">Member Image</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="right">Team</TableCell>
                      <TableCell align="right">Scores</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableCell component="th" className={classes.rank}>
                          1
                        </TableCell>
                        <TableCell align="center" className={classes.img}>
                        <img src="https://www.bnk48.com/data/Members/4/pro/l/20210602060307abe159.png" className={classes.large + ' cir'} />
                          </TableCell>
                          <TableCell align="center">
                          Cherprang Areekul
                          </TableCell>
                          <TableCell align="right">
                          BIII
                          </TableCell>
                          <TableCell align="right">
                          30000000
                          </TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell component="th" className={classes.rank}>
                          2
                        </TableCell>
                        <TableCell align="center" className={classes.img}>
                        <img src="https://www.bnk48.com/data/Members/14/pro/l/20210602060837kmnst7.png" className={classes.large + ' cir'} />
                          </TableCell>
                          <TableCell align="center">
                          Pimrapat Phadungwatanachok
                          </TableCell>
                          <TableCell align="right">
                          NV
                          </TableCell>
                          <TableCell align="right">
                          1000000
                          </TableCell>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>
        </>
    );
}
 
export default Ge;