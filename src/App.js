import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Switch as BasicSwitch,
  useHistory,
} from "react-router-dom";
import { Alert, AlertTitle } from '@material-ui/lab';
import "aos/dist/aos.css";

import 'sweetalert2/dist/sweetalert2.min.css'
import moment from 'moment'
import { AppBar, Toolbar,Typography, IconButton, Drawer, FormControlLabel, Switch, ListItem, ListItemIcon, Divider, ListItemText,
Dialog, DialogActions, Button, DialogTitle, DialogContent, Avatar, Badge, CardContent, CardMedia, Slide, Grow, Fade, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AcUnitIcon from '@material-ui/icons/AcUnit'
import YouTubeIcon from '@material-ui/icons/YouTube';
import LanguageIcon from '@material-ui/icons/Language';
import DnsIcon from '@material-ui/icons/Dns';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import CodeIcon from '@material-ui/icons/Code';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

import Home from './component/home';
import MemberList from './component/members';
import LiveCom from './component/livestream'
import MamSam from './component/memberdetail';
import TokenCom from './component/token';
import News from './component/news';
import MvCom from './component/music';
import MusicCom from './component/streaming';
import Offici from './component/official';
import FamdomList from './component/fandomlist';
import FanRoom from './component/fanroom';
import AddEvent from './component/addNewEvent';
import Mana from './component/manage';
import Api from './component/apisupport';
import SiteMan from './component/manual';
import FollowCom from './component/follow';
import PageErr from './component/404'

import GeCom from './component/geevent/ge';
import GeMana from './component/geevent/gemanage';

import Fet from './fetch'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Carousel from 'react-material-ui-carousel'
import Swal from 'sweetalert2'

const drawerWidth = 240;
const Client = '961896647339-roenm2ee6i60ed2rhbe2sqee0unlqj0f.apps.googleusercontent.com'

const useStyles = makeStyles((theme) => ({
  sm: {
    width: theme.spacing(3.8),
    height: theme.spacing(3.8),
  },
  lg: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  search: {
    right: theme.spacing(1),
    position: 'absolute',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  fabButton: {
    position: 'fixed',
    zIndex: 1000,
    bottom: 30,
    left: window.innerWidth > 600 ? 100 : 20,
    width: "auto",
    right: window.innerWidth > 600 ? 100 : 20,
  },
}));

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);


const timesch = {
  regis: {
    open: 1641834000,
    close: 1643043599
  },
  vote: {
    open: 1646888400, 
    close: 1649307600
  },
  preannoun: 1647000000,
  announ: 1649473200
}

var url = new URL(window.location.href);
var imgget = url.searchParams.get("imgstar");

function App() {
  const [Section, setSec] = React.useState('');

  const cls = useStyles();
  const History = useHistory()
  const [ Reduce, setReduce] = React.useState(false)
  const [ EvtPop, setpopup] = React.useState(true)
  const [open, setOpen] = React.useState(false);
  const [uri, setUri] = React.useState('');
  const [login, setLogin] = React.useState(false);
  const [MemberDl, setMemDl] = React.useState(false);
  const [loginLoad, setLogLoad] = React.useState(false);
  const [kamiimg, setKami] = React.useState('');
  const [kamin, setKname] = React.useState('');
  const [survey, setSur] = React.useState('');
  const [ImgThumb, setImageThumb] = React.useState('');
  const [spcLive, setLive] = React.useState(false);
  const [geready, setReadyGE] = React.useState(false);
  const [newspop, setNewspop] = React.useState([]);
  const [stream, setStream] = React.useState(null);
  const [tokenID, setToken] = React.useState('');
  const [point, setPoint] = React.useState(0);
  
  const [TokenLoad, setLoadToken] = React.useState(false);
  const [allDone, setAllDone] = React.useState(false);
  const [styleFade, setSty] = React.useState(0);
  

  const FetchKami = (fetdata) => {
    if (localStorage.getItem("glog") != null) {
    const rep = JSON.parse(localStorage.getItem("glog"))
      fetch(fetdata + '/bnk48/getFanMem?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString()  , {
        method :'get'
    })
      .then(response => response.json())
      .then(data => {
        if (data.obj != 'none') {
          setKami(data.obj.response.img)
          setKname(data.obj.response.name)
          setToken(data.wallet)
          // FetchWallet(fetdata, data.wallet)
        } else {
          setKami('-')
          setKname('-')
        }
      });
    }
  }

  React.useEffect(() => {
    document.title = Section + ' | BNK48 Fans Space'
  }, [Section])

  const ReduceAction = () => {
    if (localStorage.getItem("lowgraphic") == null) {
      localStorage.setItem("lowgraphic", "")
      setReduce(true)
    } else {
      localStorage.removeItem("lowgraphic")
      setReduce(false)
    }
  }

  const FetLive = (fet) => {
    fetch(fet + '/bnk48/getstream?ch=2', {
      method :'post'
  })
      .then(response => response.json())
      .then(data => {
        if (data.link != '') {
          setStream(data)
          setImageThumb(data.src)
          setLive(true)
        } else {
          setLive(false)
        }
      }).catch(() => {
        setLive(false)
      })
  }

  const FetchPopNews = (fet) => {
    if (sessionStorage.getItem("ads") == null) {
      setpopup(true)
      fetch(fet + '/bnk48/getSpotUpdate', {
        method :'post'
    })
        .then(response => response.json())
        .then(data => {
          

          fetch(fet + '/bnk48/getmemberbybirth?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
          .then(response => response.json())
          .then(dres => {
            sessionStorage.setItem("ads", 'i')
            if (dres.count == 0) {
              setNewspop(data.response.data)
            } else {
              let tempd = []
              for (let i = 0; i< dres.response.length; i++) {
                if (dres.response[i].graduated == false) {
                tempd.push({
                  title: 'Happy birthday! ' +  dres.response[i].name + ' BNK48',
                  desc: 'Today is her birthday! Let\'s celebrate each other together.',
                  link: '/member?name=' + dres.response[i].name.toLowerCase(),
                  src: dres.response[i].img,
                  place: '',
                  memtag: [
                    dres.response[i].name.toLowerCase()
                  ]
                })
              }
              }
              for (let i = 0; i< data.response.data.length; i++) {
                  tempd.push(data.response.data[i])
              }
              setNewspop(tempd)
            }
          }).catch(() => {
          })
        }).catch(() => {
        })
    } else {
      setpopup(false)
    }
  }

  React.useEffect(() => {
    function isOdd() {
      const ran = Math.floor((Math.random() * 1000) + 1);
      return Math.abs(ran % 2) == 1;
   }
   
    setSty(isOdd() == true ? 2 :1)
    if (localStorage.getItem("lowgraphic") == null) {
      setReduce(false)
    } else {
      setReduce(true)
    }
    if (localStorage.getItem("glog") == null) {
      setLogin(false)
    } else {
      setLogin(true)
    }
    
  if (sessionStorage.getItem('ads') == null) {
    setReadyGE(true)
  } else {
    setReadyGE(false)
  }

    var dem = setInterval(function(){ 
      if (Fet().ul !== '') {
        clearInterval(dem)
        var timeo = setInterval(function(){ 
          if (sessionStorage.getItem('ads') != null) {
            clearInterval(timeo)
            setAllDone(true)
          }
        }, 4500);
        setUri(Fet().ul)
        FetchKami(Fet().ul)
        FetLive(Fet().ul)
        FetchPopNews(Fet().ul)
      }
  }, 10);

  setInterval(function(){ 
    if (Fet().ul !== '') {
     FetLive(Fet().ul)
    }
}, 60000);
  }, [])


  const responseGoogle = (response) => {
    localStorage.setItem("glog", JSON.stringify(response.profileObj))
    fetch(Fet().ul + '/bnk48/addFanMember?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString(), {
      method: 'POST', // or 'PUT'
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      })
      .then(response => response.text())
      .then(data => {
        if (data == "false") {
          FetchKami(Fet().ul)
          setLogin(true)
          setLogLoad(false)
          setOpen(false)
        } else {
          alert("System will be temporary error for a while. Please try again")
          setLogLoad(false)
          setMemDl(false)
          setLogin(false)
          localStorage.removeItem("glog")
          setOpen(false)
        }
      })
      .catch((error) => {
          alert("System will be temporary error for a while. Please try again")
          setLogLoad(false)
          setMemDl(false)
          setLogin(false)
          localStorage.removeItem("glog")
          setOpen(false)
      });
  }

  const errorlog = (response) => {
    setLogLoad(false)
    console.log(response);
  }

  const Signout = (response) => {
    setLogLoad(false)
    setMemDl(false)
    setLogin(false)
    localStorage.removeItem("glog")
    setOpen(false)
    if (window.location.pathname == '/fandom' || window.location.pathname == '/fandomroom') {
      window.location.href = '/'
    }
  }

  const setTokenDialog = () => {
    setLoadToken(true)
    fetch(uri + '/bnk48/upttokenid?i='  + (JSON.parse(localStorage.getItem("glog")).googleId).toString() + '&wallet=' + survey, {
      method :'post'
  })
      .then(response => response.text())
      .then(data => {
        if (data == "true") {
          setMemDl(false)
          Swal.fire({
            title: 'Your iAM Wallet code has been link to Fan Space successfully.',
            icon: 'success',
            iconColor: 'rgb(203, 150, 194)'
          }).then(() => {
            window.location.reload()
          })
        } else {
          setLoadToken(false)
          Swal.fire({
            title: 'Your iAM Wallet code is incorrect.',
            icon: 'error',
            iconColor: 'rgb(203, 150, 194)'
          })
        }
      }).catch(() => {
        setLoadToken(false)
        Swal.fire({
          title: 'Cannot connect to server. please try again',
          icon: 'error',
          iconColor: 'rgb(203, 150, 194)'
        })
      })
   
  }

  if (uri != '' && allDone) {
    return (<>
       <Slide in={localStorage.getItem('lowgraphic') == null && window.innerWidth > 1100 ? !open : true} timeout={600} direction='down'>
       <AppBar position="sticky" className='bnktheme app-barcurve'>
          <Toolbar>
            {open == false && (
            <IconButton onClick={() => setOpen(true)} edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            )}
            <div className='cur' onClick={()=> History.push('/')}>
              <Typography variant='h5' className='title'>
               BNK48 Fans Space
              </Typography>
            </div>
                <div className={cls.search + ' mt-2'}>
              {window.innerWidth >1200 && (
                <FormControlLabel
                className={login ? 'pb-3' : ''}
                control={
                  <Switch
                    checked={Reduce}
                    name="reduce"
                    onChange={()=> ReduceAction()}
                    color="secondary"
                  />
                }
                label="Reduce Graphic"
              />
              )}
              {login&& (
                 <ListItemIcon onClick={() => setMemDl(true)} className={(window.innerWidth >1200 ? 'mt-2' : '') + ' cur'}>
                 <Badge
                   overlap="circular"
                   anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'right',
                   }}
                   badgeContent={kamiimg != '' && kamiimg != '-' ? <img src={kamiimg} data-toggle="tooltip" data-placement="top" title={"\"" + kamin + "\" is your Kami-Oshi"} className={cls.sm + ' border border-white rounded-circle cir avatarlimit'} /> : ''}
                 >
                   <Avatar alt={JSON.parse(localStorage.getItem("glog")).name} src={JSON.parse(localStorage.getItem("glog")).imageUrl} />
                 </Badge>
                 </ListItemIcon>
              )}
              </div>
          </Toolbar>
        </AppBar>
       </Slide>

        <Drawer
                  className={cls.drawer}
                  variant="temporary"
                  color="primary"
                  anchor="right"
                  open={open}
                  classes={{
                    paper: cls.drawerPaper,
                  }}
                >
                <div className={cls.drawerHeader} position="fixed">
                  <IconButton onClick={() => setOpen(false)} size="large">
                    <CloseIcon />
                  </IconButton>
                </div>
                <Divider />
                <d onClick={() => setOpen(false)}>
                <ListItem component={Link} className={window.location.pathname == '/' ? 'activeNav' : ''} to='/' button>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem component={Link} to='/memberlist' className={window.location.pathname == '/memberlist' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Members" />
                </ListItem>
                <ListItem component={Link} to='/news' className={window.location.pathname == '/news' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="News" />
                </ListItem>
                <ListItem component={Link} to='/livestream' className={window.location.pathname == '/livestream' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <LiveTvIcon className={spcLive ? 'text-success' : ''} />
                  </ListItemIcon>
                  <ListItemText primary="Special Live" secondary={spcLive ? 'Livestream is launching' : ''} />
                </ListItem>
                <ListItem component={Link} to='/mv' className={window.location.pathname == '/mv' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <YouTubeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Music Video" />
                </ListItem>
                <ListItem component={Link} to='/music' className={window.location.pathname == '/music' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <MusicNoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Released album and single" />
                </ListItem>
                <ListItem component={Link} to='/officialupdate' className={window.location.pathname == '/officialupdate' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Official Update" />
                </ListItem>
                <ListItem component={Link} to='/fandom' className={window.location.pathname == '/fandom' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <AcUnitIcon />
                  </ListItemIcon>
                  <ListItemText primary="Fandom Event" />
                </ListItem>
                <ListItem component={Link} to='/token' className={window.location.pathname == '/token' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <MonetizationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary='Blockchain Technology' />
                </ListItem>
                <ListItem component={Link} to='/ge3' className={window.location.pathname == '/ge3' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <HowToVoteIcon />
                  </ListItemIcon>
                  <ListItemText primary='BNK48 12th Single General Election' />
                </ListItem>
                <ListItem component={Link} to='/api' className={window.location.pathname == '/api' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText primary='API' />
                </ListItem>
                <ListItem component={Link} to='/follow' className={window.location.pathname == '/follow' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <ThumbUpAltIcon />
                  </ListItemIcon>
                  <ListItemText primary='Follow and Support' />
                </ListItem>
                <ListItem component={Link} to='/manual' className={window.location.pathname == '/manual' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <MenuBookIcon />
                  </ListItemIcon>
                  <ListItemText primary='Site Manual' />
                </ListItem>
                </d>
                <Divider />
                <ListItem onClick={() => {
                  setOpen(false)
                  Swal.fire({
                    html: 'Region mode will enhance system performance. Current region connection has been referenced by IP address.',
                    icon: 'info',
                    iconColor: 'rgb(203, 150, 194)'
                  })
                }} button>
                  <ListItemIcon>
                    <DnsIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Region: ' + Fet().nme} />
                </ListItem>
                {
                  loginLoad ? (
                    <ListItem onClick={() => setMemDl(true)} button>
                    <ListItemIcon>
                    <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="40px" />
                    </ListItemIcon>
                    <ListItemText primary="Signing in" />
                  </ListItem>
                  ) : (
                    <>
                      {!login ? (
                  <ListItem button>
                  <ListItemIcon>
                    <VpnKeyIcon />
                  </ListItemIcon>
                  <GoogleLogin
                    clientId={Client}
                    render={renderProps => (
                      <ListItemText onClick={renderProps.onClick} primary="Login as Google Account" />
                    )}
                    onSuccess={(e) => responseGoogle(e)}
                    onRequest={() => setLogLoad(true)}
                    onFailure={(e) => errorlog(e)}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={login}
                  />
                </ListItem>
                ) : (
                  <ListItem onClick={() => setMemDl(true)} button>
                  <ListItemIcon>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    badgeContent={kamiimg != '' && kamiimg != '-' ? <img src={kamiimg} data-toggle="tooltip" data-placement="top" title={"\"" + kamin + "\" is your Kami-Oshi"} className={cls.sm + ' border border-white rounded-circle cir avatarlimit'} /> : ''}
                  >
                    <Avatar alt={JSON.parse(localStorage.getItem("glog")).name} src={JSON.parse(localStorage.getItem("glog")).imageUrl} />
                  </Badge>
                  
                  </ListItemIcon>
                  <ListItemText primary="You're logged in" secondary={JSON.parse(localStorage.getItem("glog")).name} />
                </ListItem>
                )}
                    </>
                  )
                }
                
                
                </Drawer>
                <BasicSwitch>
                      <Route exact path="/" render={() => <Home fet={Fet().ul} gp={Reduce} ImgThumb={ImgThumb} stream={stream} setSec={(v) => setSec(v)} />} />
                      <Route path="/memberlist" render={() => <MemberList fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route path="/livestream" render={() => <LiveCom fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route path="/member" render={() => <MamSam fet={Fet().ul} kamio={kamin} setSec={(v) => setSec(v)} />} />
                      <Route path="/news" render={() => <News fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route path="/token" render={() => <TokenCom fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route path="/mv" render={() => <MvCom gp={Reduce} fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route path="/music" render={() => <MusicCom gp={Reduce} fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route path="/officialupdate" render={() => <Offici fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route path="/fandom" render={() => <FamdomList fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route path="/fandomroom" render={() => <FanRoom fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route path="/addevent" render={() => <AddEvent fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route path="/eventcontrol" render={() => <Mana fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route path="/api" render={() => <Api fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route path="/manual" render={() => <SiteMan fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route path="/follow" render={() => <FollowCom fet={Fet().ul} setSec={(v) => setSec(v)} />} />

                      <Route path="/ge3" render={() => <GeCom fet={Fet().ul} timesch={timesch} setSec={(v) => setSec(v)} />} />
                      <Route path="/mana" render={() => <GeMana fet={Fet().ul} setSec={(v) => setSec(v)} />} />
                      <Route exact render={() => <PageErr setSec={(v) => setSec(v)} />} />
                    </BasicSwitch>
                      
                  
        <footer className="bg-white text-center pt-2 pb-2 bnktheme">
          Copyright {new Date().getFullYear()}, CPXDevStudio Allright Reserved
          <br /> All BNK48 and CGM48 contents are licensed by Independent Artist Management (iAM). These member images and all events poster is objective for BNK48 supporting only.
        </footer>


        {localStorage.getItem("glog") != null && (
           <Dialog
           open={localStorage.getItem("glog") != null ? MemberDl : false}
           onClose={() => setMemDl(false)}
           fullWidth={true}
           maxWidth='sm'
           aria-labelledby="alert-dialog-title"
           aria-describedby="alert-dialog-description"
          
       >
           <DialogTitle id="alert-dialog-title">Are you sure to sign-out</DialogTitle>
           <DialogContent>
             {kamin != '-' ? (
           <ListItem onClick={() => window.location.href = "/member?name=" + kamin.toLowerCase()} button>
               <ListItemIcon>
               <img alt={JSON.parse(localStorage.getItem("glog")).name} src={kamiimg} className={cls.lg + ' border border-white rounded-circle cir avatarlimit'} />
             </ListItemIcon>
             <ListItemText primary={'Your Kami-Oshi is ' + kamin + ' BNK48'} secondary='Click here to see more description of your Kami-Oshi' />
             </ListItem>
             ) : (
           <ListItem button>
               <ListItemIcon>
                         <Avatar alt={JSON.parse(localStorage.getItem("glog")).name} src="" />
                       </ListItemIcon>
                       <ListItemText primary="You don't have any Kami-Oshi" secondary='Please choose your member which you love only once person.' />
                       </ListItem>
             )}
              {/* {tokenID != '' ? (
           <ListItem onClick={() => {
            navigator.clipboard.writeText(tokenID);
            alert('Your Wallet code has copied to clipboard');
           }} button>
             <ListItemText primary={'Your Token balance' + (point < 0.01 && tokenID != '' ? ' (Your BNK token is insufficient)' : '')} secondary={point + ' Token (s)'} />
             </ListItem>
             ) : (
               <>
                 <ListItem>
                       <ListItemText primary="Now you can also check BNK Token balance from this site" secondary='Please enter your iAM wallet code below in first time (Check it in iAM48 application)' />
                       </ListItem>
                <ListItem>
                      <ListItemText primary={(<TextField value={survey} onChange={(e) => setSur(e.target.value)} fullWidth label="Enter your wallet code here" disabled={TokenLoad} />)} secondary={TokenLoad == false ? (<Button onClick={() => setTokenDialog()} variant="contained" className='mt-1' color='primary'>Add</Button>):(<img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" className='mt-2' width="40px" />)} />
                </ListItem>
               </>
             )} */}
                     <ListItem className='text-info' button>
                       <ListItemText primary='Feature will be unavaliable when you not sign in' secondary='Choose and share your Kami-Oshi member, Fandom group view and add new event' />
                     </ListItem>
           </DialogContent>
           <DialogActions>
           <GoogleLogout
           clientId={Client}
           render={renderProps => (
             <Button onClick={renderProps.onClick} className="text-danger">
             Sign out
         </Button>
           )}
           onLogoutSuccess={(e) => Signout(e)}
           isSignedIn={login}
         />
           <Button onClick={() => setMemDl(false)} className="text-dark">
               Close
           </Button>
           </DialogActions>
       </Dialog>
        )}
       
       {newspop.length >0 && window.location.pathname != '/mana'  && window.location.pathname != '/member' && (
        <Dialog
      open={EvtPop}
      onClose={() => {
        setpopup(false)
        sessionStorage.setItem("ads", 'i')
      }}
      maxWidth='md'
      scroll='body'
TransitionComponent={Grow}
transitionDuration={500}
  >
    
    {newspop.length > 1 ?
    (<Carousel interval={8000}>{
      newspop.map((item, i) => (
        <>
        <DialogTitle id="alert-dialog-title">Advertisement - {item.title}</DialogTitle>
          <DialogContent>
            <CardContent>
              <CardMedia src={item.src} component="img" width={80} />
              <Typography className='mt-3' variant="body2" component="p">
                  {item.desc}
              </Typography>
              <a href={item.link} target='_blank' className='mt-1'>
                  Reference Link
              </a>
            <br />
              {
                item.place != '' && (
                  <a href={item.place} target='_blank' className='mt-1'>
                     <LocationOnIcon/> Where is this event?
                  </a>
                )
              }
              <br/>
              {item.memtag.length > 0 && (<div>
                Member included {
                  (item.memtag.map((nametag, ii) => (
                    <a href={nametag == 'All' ? ("/memberlist"): ("/member?name=" + nametag)} target='_blank'>
                    {ii == 0 ? capitalizeFirstLetter(nametag) : ', ' + capitalizeFirstLetter(nametag)}
                    </a>
                  )))
                }
              </div>)}
            </CardContent>
          </DialogContent>
        </>
      ))
    }</Carousel>) : (
      <>
      <DialogTitle id="alert-dialog-title">Advertisement - {newspop[0].title}</DialogTitle>
        <DialogContent>
          <CardContent>
            <CardMedia src={newspop[0].src} component="img" width={80} />
            <Typography className='mt-3 tw' variant="body2" component="p">
                {newspop[0].desc}
            </Typography>
            <a href={newspop[0].link} target='_blank' className='mt-1'>
                Reference Link
            </a>
            <br />
            {
                newspop[0].place != '' && (
                  <a href={newspop[0].place} target='_blank' className='mt-1'>
                       <LocationOnIcon/> Where is this event?
                  </a>
                )
              }
          </CardContent>
        </DialogContent>
      </>
    )}
    
      <DialogActions>
      <Button onClick={() => {
        setpopup(false)
      }} className="text-dark">
          Close
      </Button>
      </DialogActions>
  </Dialog>
       )}
       </>
  )
  }
  if (imgget != null) {
    return (
      <div className="container">
      <div className="row">
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/1.webp" width="100%" />
          </div>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/2.webp" width="100%" />
          </div>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/3.webp" width="100%" />
          </div>
          <div className="w-100"></div>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/4.webp" width="100%" />
          </div>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/5.webp" width="100%" />
          </div>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/6.webp" width="100%" />
          </div>
          <div className="w-100"></div>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/7.webp" width="100%" />
          </div>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/8.webp" width="100%" />
          </div>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/9.webp" width="100%" />
          </div>
          <div className="w-100"></div>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/10.webp" width="100%" />
          </div>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/11.webp" width="100%" />
          </div>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/12.webp" width="100%" />
          </div>
          <div className="w-100"></div>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/13.webp" width="100%" />
          </div>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/14.webp" width="100%" />
          </div>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/15.webp" width="100%" />
          </div>
          <div className="w-100"></div>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/16.webp" width="100%" />
          </div>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/17.webp" width="100%" />
          </div>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/18.webp" width="100%" />
          </div>
      </div>
  </div>
    )
  }
  return (
    <div className="container mt-5 mb-5">
      {window.innerWidth > 900 ? (
         <div className="row" onDoubleClick={() => setAllDone(true)}>
         <Fade in={styleFade != 0 ? true : false} timeout={400} style={{ transitionDelay: styleFade == 2 ? 0 : 500 }}>
           <div className="col pr-0">
               <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/pcmode/1.webp" width="100%" />
           </div>
         </Fade>
         <Fade in={styleFade != 0 ? true : false}  timeout={400} style={{ transitionDelay: styleFade == 2 ? 300 : 400 }}>
           <div className="col p-0">
               <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/pcmode/2.webp" width="100%" />
           </div>
         </Fade>
         <Fade in={styleFade != 0 ? true : false}  timeout={400} style={{ transitionDelay: styleFade == 2 ? 400 : 300 }}>
           <div className="col p-0">
               <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/pcmode/3.webp" width="100%" />
           </div>
         </Fade>
           <Fade in={styleFade != 0 ? true : false}  timeout={400} style={{ transitionDelay: styleFade == 2 ? 500 :  0 }}>
           <div className="col pl-0">
               <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/pcmode/4.webp" width="100%" />
           </div>
         </Fade>
         <Grow in={uri != '' && geready ? true : false} timeout={1000}>
         <div className={cls.fabButton}>
             <Alert severity="info">
               <AlertTitle>Relax in summer with the latest Single of BNK48 "Sayonara Crawl" on both Youtube Music Video and Music Streaming Platform</AlertTitle>
               Double click or tap on image to skip this page
             </Alert>
             </div>
         </Grow>
         <Grow in={uri != '' && !geready ? true : false} timeout={1000}>
         <div className={cls.fabButton}>
             <Alert severity="info">
               <AlertTitle>Relax in summer with the latest Single of BNK48 "Sayonara Crawl" on both Youtube Music Video and Music Streaming Platform</AlertTitle>
                     Double click/tap here on image or wait 5 seconds to skip this page
             </Alert>
             </div>
         </Grow>
       </div>
      ) : (
        <div className="row" onDoubleClick={() => setAllDone(true)}>
        <Fade in={styleFade != 0 ? true : false} timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 0 : 350 }}>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/1.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1250 : 450 }}>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/2.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1350 : 550 }}>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/3.webp" width="100%" />
          </div>
        </Fade>
          <div className="w-100"></div>
          <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 250 :  650 }}>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/4.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1150 :  750 }}>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/5.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1450 :  850 }}>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/6.webp" width="100%" />
          </div>
        </Fade>
          <div className="w-100"></div>
          <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 350 :  950 }}>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/7.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1050 :  1050 }}>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/8.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1550 :  1150 }}>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/9.webp" width="100%" />
          </div>
        </Fade>
          <div className="w-100"></div>
          <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 450 :  1250 }}>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/10.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 950 :  1350 }}>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/11.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1650 :  1450 }}>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/12.webp" width="100%" />
          </div>
        </Fade>
          <div className="w-100"></div>
          <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 550 :  1550 }}>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/13.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 850 :  1650 }}>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/14.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1750 :  1750 }}>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/15.webp" width="100%" />
          </div>
        </Fade>
          <div className="w-100"></div>
          <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 650 :  1850 }}>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/16.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 750 :  1950 }}>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/17.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1850 :  2050 }}>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayofade/18.webp" width="100%" />
          </div>
        </Fade>
        <Grow in={uri != '' && geready ? true : false} timeout={1000}>
        <div className={cls.fabButton}>
            <Alert severity="info">
              <AlertTitle>Relax in summer with the latest Single of BNK48 "Sayonara Crawl" on both Youtube Music Video and Music Streaming Platform</AlertTitle>
              Double click or tap on image to skip this page
            </Alert>
            </div>
        </Grow>
        <Grow in={uri != '' && !geready ? true : false} timeout={1000}>
        <div className={cls.fabButton}>
            <Alert severity="info">
              <AlertTitle>Relax in summer with the latest Single of BNK48 "Sayonara Crawl" on both Youtube Music Video and Music Streaming Platform</AlertTitle>
                    Double click/tap here on image or wait 5 seconds to skip this page
            </Alert>
            </div>
        </Grow>
      </div>
      )}
</div>
  )
}

export default App;
