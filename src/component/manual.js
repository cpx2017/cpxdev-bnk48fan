import React from 'react';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardActionArea, CardContent, CardMedia, Grow, Fade, CardHeader } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Topbar from '../img/topbar.png'
import Sidebar from '../img/sidemenu.png'

const HomeCom = ({fet}) => {
    const History = useHistory()
    const [Loaded1, setLoaded1] = React.useState(false);
    const [Loaded2, setLoaded2] = React.useState(false);
    const [onMonth, setMonth] = React.useState(false);
    const [birth, setBirth] = React.useState([]);
    const [samplemem, setMem] = React.useState([]);
    React.useEffect(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(fet + '/bnk48/getmemberbybirth?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
  .then(response => response.json())
  .then(data => {
    if (data.count == 0) {
        setMonth(true)
        fetch(fet + '/bnk48/getmemberbybirthmonth?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
  .then(response => response.json())
  .then(data => {
    setBirth(data.response)
        setLoaded1(true)
  });
    } else {
        setBirth(data.response)
        setLoaded1(true)
    }
  });
 const ran = Math.floor(Math.random() * 3) + 1;
 fetch(fet + '/bnk48/getmemberby?filter=gen&param=' + ran + '&tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
  .then(response => response.json())
  .then(data => {
      setMem(data.response)
      setLoaded2(true)
  });
    }, [])

    const ChangeRoute = (name) =>{
        History.push("/member?name=" + name.toLowerCase())
    }

    return ( 
        <>
        {window.innerWidth > 800 && (
          <div class="video-background">
           <Fade in={true} timeout={800}>
               <div class="">
               <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/myport/fav/bnk48.jpg" />
              </div>
              </Fade>
      </div>
        )}
             {window.innerWidth > 800 ? (
            <div className="cover mt-4">
            <Grow in={true} timeout={1000}>
          <Card className="col-md-4 m-5">
          <CardContent>
        <Typography variant="h5" component="h2">
          BNK48 Fan Space online Manual
        </Typography>
        <hr />
        <Typography color="textSecondary">
          What are feature which you can use and how to use it.
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
          BNK48 Fan Space online Manual
        </Typography>
        <hr />
        <Typography color="textSecondary">
          What are feature which you can use and how to use it.
        </Typography>
      </CardContent>
    </Card>
    </Grow>
  </div>
          )}
  
  <div className="stage p-5">
  <Card>
      <CardContent>
            <CardHeader title='What is BNK48 Fan Space' />
            <Typography className='ml-3' color="textSecondary">
                BNK48 Fan Space is online space for every BNK48 fans from around the world. You can join without any subscription cost.
            </Typography>
      </CardContent>
  </Card>
  <Card className='mt-5'>
      <CardContent>
            <CardHeader title='Behind of this site' />
            <Typography className='ml-3 mb-4' color="textSecondary">
                We use React JS for better front-end framework to load website dynamically and faster. And enhance system by Multi-Region up to 6 locations in the world. System will be detect the nearest
                region automatically by refer from IP address.
            </Typography>
            <div className='text-center'>
                <img src='https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/CPXDev%20Studio%20Multi-Region%20Location.jpg' width={1000} />
            </div>
      </CardContent>
  </Card>
  <Card className='mt-5'>
      <CardContent>
            <CardHeader title='Topbar' />
            <div className='text-center mb-3'>
                <img src={Topbar} width={1000} />
            </div>
            <Typography className='ml-3 mb-4' color="textSecondary">
                Topbar include 2 elements. On left corner is side menu button. You can choose page to change by click this button. On right corner is reduce graphic switcher. This site includes background video rendering from Youtube embeded.
                But lower spec devices maybe slow while video is rendering. You can switch on to close it.
            </Typography>
            
      </CardContent>
  </Card><Card className='mt-5'>
      <CardContent>
            <CardHeader title='Side Menu' />
            <div className='row'>
            <div className='text-center col-md-3'>
                <img src={Sidebar} width={400} />
            </div>
            <Typography className='ml-3 col-md' color="">
                Side Menu is main menu to see all contents of this website. You can see description of menu choices below.
                <ListItem>
                  <ListItemText primary='Home' secondary='Main page of site' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Members' secondary='All BNK48 members list' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='News' secondary='News update about BNK48 from popular agency news collected by Google News.' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Music' secondary='Latest BNK48 single and album Music Videos from BNK48 Youtube Channel.' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Official Update' secondary='Latest news and announcement from BNK48 from BNK48 Official. All metadatas will link from Twitter.' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Fandom Event' secondary='You can see and share BNK48 special fan event by part of BNK48 member. You need to Login as Google account to use this content feature.' />
                </ListItem>
            </Typography>
            </div>
            
            
            
      </CardContent>
  </Card>
  </div>
        </>
    );
}
 
export default HomeCom;