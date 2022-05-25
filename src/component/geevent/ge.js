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
import AOS from "aos";
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

const Ge = ({fet, timesch, setSec}) => {
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
    AOS.init({ duration: 1000 });
    setSec('BNK48 12th Single Senbatsu General Election')
    ResultFetch()
    setInterval(function () {
      if (moment().unix() >= timesch.announ - 3600 && moment().unix() <= timesch.announ + 86400) {
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
                <img src="https://pbs.twimg.com/media/FP90nHfacAIvUXu?format=webp&name=large"  width={window.innerWidth} />
                  </Fade>
              )}
          </div>
            )}
                {window.innerWidth >1200 ? (
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
          <Card className={(window.innerWidth > 700 ? '' : 'mb-5') + ' col-md-5'} data-aos='zoom-in-right'>
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
          <Card className={(window.innerWidth > 700 ? 'ml-3' : '') + ' col-md'} data-aos={window.innerWidth > 650 ? 'zoom-in-left' : 'zoom-in-top'}>
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
          
          <Card className='mt-5' data-aos='zoom-in-up'>
            <CardContent>
            <CardHeader title="Election Report" subheader="Reported by Token X. Visualization Statistic by Google Data Studio" data-aos='flip-down' />
              <hr />
              <div className='text-center' data-aos='zoom-out'>
                {
                  window.innerWidth >1200 ? (
                    <iframe src="https://datastudio.google.com/embed/reporting/79887e4e-cf19-4dd8-97f8-d08362c73bb2/page/F6aqC" frameborder="0" width="90%" height={window.innerWidth< 600 ? "500px" : '700px'} />
                  ) : (
                    <iframe src="https://datastudio.google.com/embed/reporting/b7c85307-2842-4e6e-936d-343290b1b0a7/page/F6aqC" frameborder="0" width="100%" height={window.innerWidth< 600 ? "500px" : '700px'} />
                  )
                }
             
              </div>
            </CardContent>
          </Card>
          
          <Card className='mt-5' data-aos='fade-down'>
            <CardContent>
              <CardHeader title="Result of Election" subheader={'Latest update: ' + ts} data-aos='flip-down' />
              <hr />
              <TableContainer>
                <Table stickyHeader aria-label="simple table">
                <caption className='text-right'>{moment().unix() >= timesch.announ &&moment().unix() <= timesch.announ + 86400 ? "System will be update records every minute. You don't need to be refresh" : ''}</caption>
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
                    <TableBody key={item.id} className={(item.rank == 1 ? 'centerGE' : item.rank > 1 && item.rank <= 16 ? 'senGE' : item.rank > 16 && item.rank <= 32 ? 'nextGE' : '') + ' cur'}
                      data-toggle="tooltip" data-placement="bottom" title={(item.rank == 1 ? item.obj.response.name + ' is both Center position and Senbatsu of BNK48 12th Single' : item.rank > 1 && item.rank <= 16 ? item.obj.response.name + ' is Senbatsu of BNK48 12th Single' : item.rank > 16 && item.rank <= 32 ? item.obj.response.name + ' is participate in second song of BNK48 12th Single' : item.obj.response.name +' is participate in last song of BNK48 12th Single') + (moment().unix() < timesch.vote.close ? ' (2nd Preliminary Result)' : '')}
                      onClick={() => item.obj.response.ref.includes('bnk48') ? History.push('member?name=' + item.name.toLowerCase()) : item.obj.response.ref.includes('cgm48') ? window.open('//cgm48fan.cpxdev.tk/member?name=' + item.name.toLowerCase(), '_target') : ''}
                      data-aos='fade-right'
                   >
                    <TableCell component="th" className={classes.rank}>
                          {item.rank}
                        </TableCell>
                        <TableCell align="center" className={classes.img}>
                        <img src={item.obj.response.img} className={classes.large + ' cir avatarlimit'} />
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

          <Card className='mt-5' data-aos='zoom-in-up'>
            <CardContent>
            <CardHeader title="Special Highlight" data-aos='flip-down' />
              <hr />
              <div className='text-center' data-aos='zoom-out'>
                <iframe src="https://clipchamp.com/watch/wi72pi353Qo/embed" frameborder="0" width="90%" height={window.innerWidth< 600 ? "500px" : '700px'} />
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