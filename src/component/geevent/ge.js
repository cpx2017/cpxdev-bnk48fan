import React from 'react';
import { AppBar, Toolbar,Typography, IconButton, FormControlLabel, DialogTitle, DialogContent, ListItem, DialogActions, Dialog, ListItemText,
Card, CardContent, Avatar, Button, ListItemSecondaryAction, List, Checkbox, Fade, Grow, CardHeader } from '@material-ui/core';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
let delayed;

ChartJS.register(ArcElement, Tooltip, Legend);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const piedata = {
  labels: ['BNK48 Team BIII', 'BNK48 Team NV', 'BNK48 Team Trainee', 'CGM48'],
  datasets: [
    {
      label: '# members',
      data: [8, 13, 21, 20],
      backgroundColor: [
        '#0a6302',
        '#ff85d4',
        '#cb96c2',
        '#49C5A8',
      ],
      borderColor: [
        '#0a6302',
        '#ff85d4',
        '#cb96c2',
        '#49C5A8',
      ],
      borderWidth: 0,
    },
  ],
  }
  const piedata1 = {
    labels: ['BNK48 1st Generation', 'BNK48 2nd Generation', 'BNK48 3rd Generation', 'CGM48'],
    datasets: [
      {
        label: '# members',
        data: [11, 13, 18, 20],
        backgroundColor: [
          '#0a6302',
          '#ff85d4',
          '#cb96c2',
          '#49C5A8',
        ],
        borderColor: [
          '#0a6302',
          '#ff85d4',
          '#cb96c2',
          '#49C5A8',
        ],
        borderWidth: 0,
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

const Ge = ({fet, timesch}) => {
  const History = useHistory()
  const classes = useStyles();


  const [rank, setRank] = React.useState([]); 
  const [spam, setSpam] = React.useState(0); 
  const [candi, setCandi] = React.useState(false); 
  
  const [candiTog, setCandiTog] = React.useState(false); 
  const [candiUrl, setCandiUrl] = React.useState(''); 
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
      fetch(fet + '/bnk48/getstream?ch=1', {
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
    const options = { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    };
    return Number(x).toLocaleString('en', options);
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

  const ToggleDialog = (sw, uri) => {
    if(uri != '') {
      setCandiUrl(uri)
    }
    setCandi(sw)
  }

  const opt ={
    onClick: function(e, element) {
      if(element.length > 0) {
        if (element[0].index >= 0 && element[0].index <= 2) {
          ToggleDialog(true, 'https://yt3.ggpht.com/Cy69lvYdueTXV8PNLpCr6Z_k1YiKMH4wFzZe1WN19Ofz1D3Ov6jbt2KuStdQalsj0f9elLdVZo5H=s1024-c-fcrop64=1,00000016ffffffe9-nd-v1')
        } else if (element[0].index >= 3) {
          ToggleDialog(true, 'https://yt3.ggpht.com/pD8B-UrGtEdWQL81s_ovgBbhkGKkELF7BxvugevH7_GR_dZ-kZYQsmN0ZjpSkXr0GGNldMD5l84xEnI=s1024-c-fcrop64=1,00000000ffffffff-nd-v1')
        }
    }  
  },
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context) => {
      let delay = 0;
      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  }
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
           {window.innerWidth > 1200 && (
              <div class="video-background">
              {localStorage.getItem('lowgraphic') == null ? (
                <div class="video-foreground">
                <iframe src="https://www.youtube.com/embed/t4qbDdGe-0g?autoplay=1&mute=1&controls=0&loop=1&playlist=t4qbDdGe-0g" frameborder="0"></iframe>
              </div>
              ) : (
                <Fade in={true} timeout={800}>
                <img src="https://i3.ytimg.com/vi/OqGvv7F8LiQ/maxresdefault.jpg"  width={window.innerWidth} />
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
                GE3 or BNK48 12th Single General Election is the third of BNK48 general election. And the first Election of BNK48 which use Blockchain Technology also part of this election. Operated by Token X of SCB X. <a onClick={() => History.push('token')}>See more description here</a>
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
                GE3 or BNK48 12th Single General Election is the third of BNK48 general election. And the first Election of BNK48 which use Blockchain Technology also part of this election. Operated by Token X of SCB X. <a onClick={() => History.push('token')}>See more description here</a>
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
                  <div className='col-md-12 text-center'>
                  <FormControlLabel
                        control={
                          <Checkbox
                            checked={candiTog}
                            onChange={() => setCandiTog(!candiTog)}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label="Filter by Generation"
                      />
                    </div>
                    {candiTog ? (
                      <div className='col-md-12'>
                      <Doughnut
                        data={piedata1}
                        options={opt}
                      />
                    </div>
                    ) : (
                      <div className='col-md-12'>
                      <Doughnut
                        data={piedata}
                        options={opt}
                      />
                    </div>
                    )}
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
              1. Activate BNK Token Wallet in iAM48 Application from {moment.unix(1644116400).format('DD MMMM YYYY on HH:mm')} onwards. (Please update iAM48 Application to version 1.8.00 or above) See whitepaper <a href='https://www.bnk48.com/bnktoken/' target='_blank'>here</a>. Or reading clearly for international fan on <a onClick={() => History.push('token')}>here</a>
              </div>
              <div>
              2. Pre-Order BNK48 11th Single on one of 3 types
              <ListItem>
                  <ListItemText primary="CD and Mini photobook Type Package" secondary="Earn 2 Tokens. Started to pre-ordered in March 3, 2022" />
                  </ListItem>
                  <ListItem>
                  <ListItemText primary="Digital Goods Type Package (Music Code)" secondary="Earn 2.4 Tokens. Started to pre-ordered in March 7, 2022" />
                  </ListItem>
              </div>
              <div>
              3. You can vote to favorite member(s) at least 0.1 tokens but unlimited maximum number of tokens until end of voting.
              </div>
              <div>
              4. After General Election event is ended. All usaged tokens will be burned out and cannot be retrieved.
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
                      <TableCell align="center">Band</TableCell>
                      <TableCell align="right">Team</TableCell>
                      <TableCell align="right">Scores</TableCell>
                    </TableRow>
                  </TableHead>
                  {rank.length > 0 ? rank.map((item, i) => (
                    <TableBody key={item.id} className={item.rank == 1 ? 'centerGE' : item.rank > 1 && item.rank <= 16 ? 'senGE' : item.rank > 16 && item.rank <= 32 ? 'nextGE' : ''}
                      data-toggle="tooltip" data-placement="bottom" title={(item.rank == 1 ? item.obj.response.name + ' is both Center position and Senbatsu of BNK48 12th Single' : item.rank > 1 && item.rank <= 16 ? item.obj.response.name + ' is Senbatsu of BNK48 12th Single' : item.rank > 16 && item.rank <= 32 ? item.obj.response.name + ' is participate in second song of BNK48 12th Single' : item.obj.response.name +' is participate in last song of BNK48 12th Single') + (moment().unix() < timesch.vote.close ? ' (Premiere First Day\'s Result)' : '')}
                    >
                    <TableCell component="th" className={classes.rank}>
                          {item.rank}
                        </TableCell>
                        <TableCell align="center" className={classes.img}>
                        <img src={item.obj.response.img} className={classes.large + ' cir'} />
                          </TableCell>
                          <TableCell align="center">
                          {item.obj.response.fullnameEn[0]}  {item.obj.response.fullnameEn[1]} ({item.obj.response.name})
                          </TableCell>
                          <TableCell align="center">
                          {item.obj.response.ref.includes('bnk48') ? 'BNK48' : item.obj.response.ref.includes('cgm48') ? 'CGM48' : ''}
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
                       <TableCell colSpan={6} align='center'>No record(s) found</TableCell>
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
          <Dialog
              fullScreen
              TransitionComponent={Transition}
              open={candi}
              onClose={() => ToggleDialog(false, '')}
              fullWidth={true}
              maxWidth='sm'
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">General Election Candidated members List</DialogTitle>
              <DialogContent className='text-center'>
                <img src={candiUrl} width={800}/>
              </DialogContent>
              <DialogActions>
             
              <Button onClick={() => ToggleDialog(false, '')} className="text-dark">
                  Close
              </Button>
              </DialogActions>
          </Dialog>
        </div>
        </>
    );
}
 
export default Ge;