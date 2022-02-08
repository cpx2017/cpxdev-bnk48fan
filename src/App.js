import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Switch as BasicSwitch,
  useHistory
} from "react-router-dom";
import moment from 'moment'
import { AppBar, Toolbar,Typography, IconButton, Drawer, FormControlLabel, Switch, ListItem, ListItemIcon, Divider, ListItemText,
Dialog, DialogActions, Button, DialogTitle, DialogContent, Avatar, Badge, CardContent, CardMedia } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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

import Home from './component/home';
import MemberList from './component/members';
import LiveCom from './component/livestream'
import MamSam from './component/memberdetail';
import News from './component/news';
import MusicCom from './component/music';
import Offici from './component/official';
import FamdomList from './component/fandomlist';
import FanRoom from './component/fanroom';
import AddEvent from './component/addNewEvent';
import Mana from './component/manage';
import Api from './component/apisupport';
import SiteMan from './component/manual';
import PageErr from './component/404'

import GeCom from './component/geevent/ge';
import GeMana from './component/geevent/gemanage';

import Fet from './fetch'
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const drawerWidth = 240;
const Client = '961896647339-roenm2ee6i60ed2rhbe2sqee0unlqj0f.apps.googleusercontent.com'
const useStyles = makeStyles((theme) => ({
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
}));

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const newspop = {
  title: 'BNK48 3rd Generation Debut Single "First Rabbit" Music video is released on Youtube and also avaliable all Streaming Platform',
  desc: 'The first rabbit is coming! Let\'s appreciate the cuteness of these rabbits on all streaming platform and Music Video.',
  link: 'https://BNK48.bfan.link/FirstRa3bitTH',
  src:'https://yt3.ggpht.com/Nw_L8Ld9tiedec6fVR_Nz9IbCYE7aU7K83oZmjamz3CtnidwXWuRT4sP95rutPYHrTqJzafwfSewKMs=s1024-c-fcrop64=1,00000000ffffffff-nd-v1'
}


function App() {
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
  const [spcLive, setLive] = React.useState(false);
  
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
          setSur('https://docs.google.com/forms/d/e/1FAIpQLSeP2A9V6QPqdU7S0F60X5o4y03Mx20jN1nVK9OZx4klyxiKvg/viewform?usp=pp_url&entry.1855303001=' + rep.name + '&entry.1740619332=' + rep.email + '&entry.1830561642=' + data.obj.response.name + ' BNK48&entry.1201087543=' + data.obj.response.name +' BNK48')
        } else {
          setKami('-')
          setKname('-')
        }
      });
    }
  }

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
          setLive(true)
        } else {
          setLive(false)
        }
      }).catch(() => {
        setLive(false)
      })
  }

  React.useEffect(() => {
    if (sessionStorage.getItem("ads") == null) {
      sessionStorage.setItem("ads", 'i')
      setpopup(true)
    } else {
      setpopup(false)
    }
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
    var dem = setInterval(function(){ 
      if (Fet().ul !== '') {
        clearInterval(dem)
        setUri(Fet().ul)
        FetchKami(Fet().ul)
        FetLive(Fet().ul)
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
          if (window.location.pathname != '/') {
            window.location.reload();
          }
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

  const UrlClk = () => {
    window.open(survey, '_target')
  }

  if (uri != '') {
    return (<>
       <BrowserRouter>
      <AppBar position="sticky" className='bnktheme'>
          <Toolbar>
            {open == false && (
            <IconButton onClick={() => setOpen(true)} edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            )}
            <div onClick={()=> window.location.href = "/"}>
              <Typography variant='h5' className='title'>
               BNK48 Fans Space
              </Typography>
            </div>
              {window.innerWidth > 800 && (
                <div className={cls.search + ' mt-2'}>
                <FormControlLabel
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
                </div>
              )}
          </Toolbar>
        </AppBar>
        <Drawer
                  className={cls.drawer}
                  variant="temporary"
                  color="primary"
                  anchor="left"
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
                <ListItem component={Link} to='/' button>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem component={Link} to='/memberlist' button>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Members" />
                </ListItem>
                <ListItem component={Link} to='/news' button>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="News" />
                </ListItem>
                <ListItem component={Link} to='/livestream' button>
                  <ListItemIcon>
                    <LiveTvIcon className={spcLive ? 'text-success' : ''} />
                  </ListItemIcon>
                  <ListItemText primary="Special Live" secondary={spcLive ? 'Livestream is launching' : ''} />
                </ListItem>
                <ListItem component={Link} to='/music' button>
                  <ListItemIcon>
                    <YouTubeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Music" />
                </ListItem>
                <ListItem component={Link} to='/officialupdate' button>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Official Update" />
                </ListItem>
                <ListItem component={Link} to='/fandom' button>
                  <ListItemIcon>
                    <AcUnitIcon />
                  </ListItemIcon>
                  <ListItemText primary="Fandom Event" />
                </ListItem>
                <ListItem component={Link} to='/ge3' button>
                  <ListItemIcon>
                    <HowToVoteIcon />
                  </ListItemIcon>
                  <ListItemText primary='BNK48 12th Single General Election' />
                </ListItem>
                <ListItem component={Link} to='/api' button>
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText primary='API' />
                </ListItem>
                <ListItem component={Link} to='/manual' button>
                  <ListItemIcon>
                    <MenuBookIcon />
                  </ListItemIcon>
                  <ListItemText primary='Site Manual' />
                </ListItem>
                </d>
                <Divider />
                <ListItem onClick={() => {
                  alert('Region mode will enhance system performance. Current region connection has been referenced by IP address')
                  window.open('https://status.cpxdev.tk', '_blank').focus()
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
                    <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="40px" />
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
                    badgeContent={kamiimg != '' && kamiimg != '-' ? <SmallAvatar src={kamiimg} data-toggle="tooltip" data-placement="top" title={"\"" + kamin + "\" is your Kami-Oshi"} /> : ''}
                  >
                    <Avatar alt={JSON.parse(localStorage.getItem("glog")).name} src={JSON.parse(localStorage.getItem("glog")).imageUrl} />
                  </Badge>
                  
                  </ListItemIcon>
                  <ListItemText primary="You're logged in" secondary={JSON.parse(localStorage.getItem("glog")).name} />
                </ListItem>
                )}
                {login && survey != '' && (
                   <ListItem onClick={() => UrlClk()} button>
                   <ListItemText primary='BNK48 Fan Space Survey feedback' />
                 </ListItem>
                )}
                    </>
                  )
                }
                
                
                </Drawer>
                      <BasicSwitch>
                      <Route exact path="/" render={() => <Home fet={Fet().ul} />} />
                      <Route path="/memberlist" render={() => <MemberList fet={Fet().ul} />} />
                      <Route path="/livestream" render={() => <LiveCom fet={Fet().ul} />} />
                      <Route path="/member" render={() => <MamSam fet={Fet().ul} kamio={kamin} />} />
                      <Route path="/news" render={() => <News fet={Fet().ul} />} />
                      <Route path="/music" render={() => <MusicCom gp={Reduce} fet={Fet().ul} />} />
                      <Route path="/officialupdate" render={() => <Offici fet={Fet().ul} />} />
                      <Route path="/fandom" render={() => <FamdomList fet={Fet().ul} />} />
                      <Route path="/fandomroom" render={() => <FanRoom fet={Fet().ul} />} />
                      <Route path="/addevent" render={() => <AddEvent fet={Fet().ul} />} />
                      <Route path="/eventcontrol" render={() => <Mana fet={Fet().ul} />} />
                      <Route path="/api" render={() => <Api fet={Fet().ul} />} />
                      <Route path="/manual" render={() => <SiteMan fet={Fet().ul} />} />

                      <Route path="/ge3" render={() => <GeCom fet={Fet().ul} />} />
                      <Route path="/ge3mana" render={() => <GeMana fet={Fet().ul} />} />
                      <Route exact render={() => <PageErr />} />
                    </BasicSwitch>
                
               
        <footer className="bg-white text-center pt-2 pb-2 bnktheme">
          Copyright {new Date().getFullYear()}, CPXDevStudio Allright Reserved
          <br /> All BNK48 and CGM48 contents are licensed by Independent Artist Management (iAM). We don't affiliated with them. Please don't be to copy and modified contents for any commercial use.
        </footer>
        </BrowserRouter>
        <Dialog
      open={MemberDl}
      onClose={() => setMemDl(false)}
      fullWidth={true}
      maxWidth='sm'
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
  >
      <DialogTitle id="alert-dialog-title">Are you sure to sign-out</DialogTitle>
      <DialogContent>
        Some feature cannot be used when you don't login.
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
  <Dialog
      open={EvtPop}
      onClose={() => {
        setpopup(false)
      }}
      maxWidth='md'
  >
      <DialogTitle id="alert-dialog-title">Advertisement - {newspop.title}</DialogTitle>
      <DialogContent>
        <CardContent>
          <CardMedia src={newspop.src} component="img" />
          <Typography className='mt-3' variant="body2" component="p">
              {newspop.desc}
          </Typography>
          <a href={newspop.link} className='mt-1'>
              Reference Link
          </a>
        </CardContent>
      </DialogContent>
      <DialogActions>
      <Button onClick={() => {
        setpopup(false)
      }} className="text-dark">
          Close
      </Button>
      </DialogActions>
  </Dialog>
    </>)
  }
  return (
    <div className='text-center mt-5 pt-5'>
       <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="50px" className='text-center' />
    Welcome to BNK48 Fan Space, please wait
  </div>
  )
}

export default App;