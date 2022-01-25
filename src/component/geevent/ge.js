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

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const piedata = {
  labels: ['BNK48 Team BIII', 'BNK48 Team NV', 'BNK48 Team Trainee', 'CGM48'],
  datasets: [
    {
      label: '# of Votes',
      data: [8, 13, 21, 20],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 5,
    },
  ],
  }


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

const Ge = ({fet}) => {
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

  const [rank, setRank] = React.useState([]); 
  const [spam, setSpam] = React.useState(0); 
  const [ts, setts] = React.useState('Updating'); 
  const [urlstream, setStream] = React.useState(''); 

  const ResultFetch = () => {
    setts('Updating')
    fetch(fet + '/bnk48/listge', {
      method :'post'
  })
      .then(response => response.json())
      .then(data => {
          setRank(data)
          setts(moment().format("DD MMMM YYYY HH:mm:ss"))
      }).catch(() => {
        setRank([])
        setts(moment().format("DD MMMM YYYY HH:mm:ss") + ' (Error fetching)')
      })
      fetch(fet + '/bnk48/getstream', {
        method :'post'
    })
        .then(response => response.json())
        .then(data => {
          setStream(data.link)
        }).catch(() => {
          setStream('')
        })
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  React.useEffect(() => {
    ResultFetch()
    setInterval(function () {
      if (moment().unix() >= timesch.announ && moment().unix() <= timesch.announ + 86400) {
        ResultFetch()
        setSpam(0)
      }
    }, 60000);
  }, [])

  // const Refresh = () => {
  //   if (spam == 3) {
  //     alert("You have temporary blocked because you get refresh too many times for system performance reason. Please wait a minute to continue.")
  //   } else {
  //     let i = spam + 1
  //     setSpam(i)
  //     ResultFetch()
  //   }
  // }

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
        if(cur > timesch.announ + 86400) {
          dcn = 0
        } else if(cur >= timesch.announ && cur <= timesch.announ + 86400) {
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
          <div className='row mt-5 ml-1 mr-1'>
          <Card className={(window.innerWidth > 700 ? '' : 'mb-5') + ' col-md-5'}>
            <CardContent>
              <CardHeader title="TimeLine of Election" subheader="Notes: Timeline are subject to change as appropriate due to the situation of the epidemic of Covid-19." />
              <hr />
              <div className='row justify-content-center mb-5'> 
              <List className='col-md-8'>
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
                  <ListItemText className={CheckTZ(4) == 0 ? 'text-muted' : CheckTZ(4) == 1 ? 'text-success' : ''} primary="Announcement Result" secondary="Apr 9, 2022" />
                  {
                    CheckTZ(4) == 0 && (
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
                    CheckTZ(4) == 1 && (
                      <ListItemSecondaryAction>
                         <IconButton edge="end">
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
          <Card className={(window.innerWidth > 700 ? 'ml-3' : '') + ' col-md'}>
            <CardContent>
            <CardHeader title="General Election Candidate Summary" subheader='We have 62 BNK48 and CGM48 members who candidated' />
              <hr />
              <div className='row justify-content-center'>
                <div className='col-md-8'>
                <Pie
                data={piedata}
              />
              </div>
              </div>
            </CardContent>
          </Card>
          </div>
          
          <Card className='mt-5'>
            <CardContent>
            <CardHeader title="How to voting your member to one of Senbatsu!" />
              <hr />
              <div>
              Please wait for the announcement from BNK48 official.
              </div>
            </CardContent>
          </Card>
          <Card className='mt-5'>
            <CardContent>
              <CardHeader title="Result of Election" subheader={'Latest update: ' + ts} />
              <hr />
              <TableContainer>
                <Table stickyHeader aria-label="simple table">
                <caption className='text-right'>System will be update records every minute. You don't need to be refresh</caption>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.rank}>Rank</TableCell>
                      <TableCell className={classes.img} align="center">Member Image</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="right">Team</TableCell>
                      <TableCell align="right">Scores</TableCell>
                    </TableRow>
                  </TableHead>
                  {rank.length > 0 ? rank.map((item) => (
                    <TableBody key={item.id}>
                    <TableCell component="th" className={classes.rank}>
                          {item.rank}
                        </TableCell>
                        <TableCell align="center" className={classes.img}>
                        <img src={item.obj.response.img} className={classes.large + ' cir'} />
                          </TableCell>
                          <TableCell align="center">
                          {item.obj.response.fullnameEn[0]}  {item.obj.response.fullnameEn[1]}
                          </TableCell>
                          <TableCell align="right">
                          {item.obj.response.team == "" ? 'None' : item.obj.response.team}
                          </TableCell>
                          <TableCell align="right">
                          {numberWithCommas(item.sc)}
                          </TableCell>
                  </TableBody>
                  )): (
                    <TableBody>
                       <TableCell colSpan={5} align='center'>No record(s) found</TableCell>
                  </TableBody>
                  )}
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
          <Card className='mt-5'>
            <CardContent>
            <CardHeader title="Watching Live Stream" subheader="Operated by Youtube Live" />
              <hr />
              <div className='text-center'>
              {urlstream != '' ? (
                <iframe src={urlstream} width="100%" height={700} allowFullScreen />
              ) : (
                <div>
                Please wait for the announcement from BNK48 official.
                </div>
              )}
              </div>
            </CardContent>
          </Card>
        </div>
        </>
    );
}
 
export default Ge;