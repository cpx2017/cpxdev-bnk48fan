import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Switch as BasicSwitch,
  useHistory,
} from "react-router-dom";

import 'sweetalert2/dist/sweetalert2.min.css'
import moment from 'moment'
import { AppBar, Toolbar,Typography, IconButton, Drawer, FormControlLabel, Switch, ListItem, ListItemIcon, Divider, ListItemText,
Dialog, DialogActions, Button, DialogTitle, DialogContent, Avatar, Badge, CardContent, CardMedia, Slide } from '@material-ui/core';
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
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import Home from './component/home';
import MemberList from './component/members';
import LiveCom from './component/livestream'
import MamSam from './component/memberdetail';
import TokenCom from './component/token';
import News from './component/news';
import MusicCom from './component/music';
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

const newspop = [
  {
    title: 'These rabbits jump reached to 2 million views on Youtube!',
    desc: 'Thank you for all supporting.',
    link: 'https://www.youtube.com/watch?v=579M0US5_8Q',
    src:'https://yt3.ggpht.com/IvSPKWgoUzO9zwCpn2Iu30JfcNKnqu-vI2ZxofKSKBOiZIEKc0Nx7ok6oBjTN-kIX76275leT0jk7Q=s800-nd-v1'
  },
  {
    title: 'The Rabbit : BNK48 3rd Generation premiere Short Film and Mini-Fanmeet',
    desc: 'Become the first of group to watching short movie film of The Rabbit. and see exclusive members in reserved time.',
    link: 'https://www.facebook.com/bnk48official/posts/519134706237847',
    src:'https://pbs.twimg.com/media/FMrrcgnakAETTXZ?format=jpg&name=4096x4096'
  },
  {
    title: "It's time for E-San fan!",
    desc: "BNK48 10th Single D-AAA Roadshow and Hi-Touch. Let's join them at Central Udon",
    link: 'https://www.facebook.com/CentralUdon/posts/5365828890128499',
    src:'https://pbs.twimg.com/media/FMqwwRTacAEwASg?format=jpg&name=large'
  },
  {
    title: 'Vote "First Rabbit" by BNK48 to The highest of T-POP Top Chart',
    desc: 'Download and vote First Rabbit to T-POP Top Chart. See Chart ranking result on T-POP Stage TV Show every Saturday in ' + moment.utc('14.30', 'HH:mm').local().format('HH:mm') + ' on Workpoint TV',
    link: 'https://t-pop.com/?locate=en',
    src:'https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/bnk48frabbitvotefortpop.jpg'
  },
  {
    title: 'BNK48 3rd Generation Debut Single "First Rabbit" Music video is released on Youtube and also avaliable all Streaming Platform',
    desc: 'The first rabbit is coming! Let\'s appreciate the cuteness of these rabbits on all streaming platform and Music Video.',
    link: 'https://BNK48.bfan.link/FirstRa3bitTH',
    src:'https://yt3.ggpht.com/Nw_L8Ld9tiedec6fVR_Nz9IbCYE7aU7K83oZmjamz3CtnidwXWuRT4sP95rutPYHrTqJzafwfSewKMs=s1024-c-fcrop64=1,00000000ffffffff-nd-v1'
  }
]


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

  const UrlClk = () => {
    window.open(survey, '_target')
  }

  if (uri != '') {
    return (<>
    <BrowserRouter>
       <Slide in={localStorage.getItem('lowgraphic') == null && window.innerWidth > 1100 ? !open : true} timeout={600} direction='down'>
       <AppBar position="sticky" className='bnktheme app-barcurve'>
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
                <div className={cls.search + ' mt-2'}>
              {window.innerWidth > 800 && (
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
                 <ListItemIcon onClick={() => setMemDl(true)} className={(window.innerWidth > 800 ? 'mt-2' : '') + ' cur'}>
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
                <ListItem component={Link} to='/music' className={window.location.pathname == '/music' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <YouTubeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Music" />
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
                    text: 'Region mode will enhance system performance. Current region connection has been referenced by IP address',
                    icon: 'info',
                    iconColor: 'rgb(203, 150, 194)'
                  }).then(() => {
                    window.open('https://status.cpxdev.tk', '_blank').focus()
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
                    badgeContent={kamiimg != '' && kamiimg != '-' ? <SmallAvatar src={kamiimg} data-toggle="tooltip" data-placement="top" title={"\"" + kamin + "\" is your Kami-Oshi"} /> : ''}
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
                      <Route exact path="/" render={() => <Home fet={Fet().ul} gp={Reduce} />} />
                      <Route path="/memberlist" render={() => <MemberList fet={Fet().ul} />} />
                      <Route path="/livestream" render={() => <LiveCom fet={Fet().ul} />} />
                      <Route path="/member" render={() => <MamSam fet={Fet().ul} kamio={kamin} />} />
                      <Route path="/news" render={() => <News fet={Fet().ul} />} />
                      <Route path="/token" render={() => <TokenCom fet={Fet().ul} />} />
                      <Route path="/music" render={() => <MusicCom gp={Reduce} fet={Fet().ul} />} />
                      <Route path="/officialupdate" render={() => <Offici fet={Fet().ul} />} />
                      <Route path="/fandom" render={() => <FamdomList fet={Fet().ul} />} />
                      <Route path="/fandomroom" render={() => <FanRoom fet={Fet().ul} />} />
                      <Route path="/addevent" render={() => <AddEvent fet={Fet().ul} />} />
                      <Route path="/eventcontrol" render={() => <Mana fet={Fet().ul} />} />
                      <Route path="/api" render={() => <Api fet={Fet().ul} />} />
                      <Route path="/manual" render={() => <SiteMan fet={Fet().ul} />} />
                      <Route path="/follow" render={() => <FollowCom fet={Fet().ul} />} />

                      <Route path="/ge3" render={() => <GeCom fet={Fet().ul} />} />
                      <Route path="/ge3mana" render={() => <GeMana fet={Fet().ul} />} />
                      <Route exact render={() => <PageErr />} />
                    </BasicSwitch>
                      
                
                    </BrowserRouter>   
        <footer className="bg-white text-center pt-2 pb-2 bnktheme">
          Copyright {new Date().getFullYear()}, CPXDevStudio Allright Reserved
          <br /> All BNK48 and CGM48 contents are licensed by Independent Artist Management (iAM). We don't affiliated with them. Please don't be to copy and modified contents for any commercial use.
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
               <Avatar alt={JSON.parse(localStorage.getItem("glog")).name} src={kamiimg} />
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
       
  <Dialog
      open={EvtPop}
      onClose={() => {
        setpopup(false)
      }}
      maxWidth='md'
      scroll='body'
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
              <a href={item.link} className='mt-1'>
                  Reference Link
              </a>
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
            <a href={newspop[0].link} className='mt-1'>
                Reference Link
            </a>
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
    </>)
  }
  return (
    <div className='text-center mt-5 pt-5'>
       <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center' />
    Welcome to BNK48 Fan Space, please wait
  </div>
  )
}

export default App;