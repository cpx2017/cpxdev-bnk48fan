import React from 'react';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardActionArea, CardContent, CardMedia, Grow, Fade, CardHeader } from '@material-ui/core';
    import { useHistory } from 'react-router-dom';
    import moment from 'moment'
    import AOS from "aos";

const HomeCom = ({fet, gp, ImgThumb, stream}) => {
    const History = useHistory()
    const [Loaded1, setLoaded1] = React.useState(false);
    const [Loaded2, setLoaded2] = React.useState(false);
    const [Loaded3, setLoaded3] = React.useState(false);
    const [onMonth, setMonth] = React.useState(false);
    const [birth, setBirth] = React.useState([]);
    const [samplemem, setMem] = React.useState([]);
    const [highMV, setMV] = React.useState([]);
    const [GenRan, setGenRan] = React.useState(0);

    React.useEffect(() => {
      AOS.init({ duration: 1000 });
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
      setGenRan(ran)
      setMem(data.response)
      setLoaded2(true)
  });

  fetch(encodeURI(fet + '/bnk48/getVideo?tstamp=' + Math.floor( new Date().getTime()  / 1000)), {
    method: 'post', // or 'PUT'
    })
    .then(response => response.json())
    .then(data => {
        setLoaded3(true)
        setMV(data.items)
    console.log('Success:', data);
    })
    .catch((error) => {
        setLoaded3(true)
    console.error('Error:', error);
    });
    }, [])

    const ChangeRoute = (name) =>{
        History.push("/member?name=" + name.toLowerCase())
    }

    return ( 
        <>
        {window.innerWidth > 1100 && (
          <div class="video-background">
          {localStorage.getItem('lowgraphic') == null ? (
            <div class="video-foreground">
            <iframe src="https://www.youtube.com/embed/vX2Y5xNQnYE?autoplay=1&mute=1&controls=0&loop=1&playlist=vX2Y5xNQnYE" frameborder="0"></iframe>
          </div>
          ) : (
            <Fade in={true} timeout={800}>
                <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayomain.webp" width={window.innerWidth} />
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
                  Welcome to BNK48 Fan Space
                </Typography>
                <hr />
                <Typography color="textSecondary">
                  This is your space for join with BNK48 fans around the world. Let's enjoy!
                </Typography>
                <hr />
                <Typography variant="body1" component="p">
                  How do you do in this space?
                  <ListItem>
                    <ListItemText primary="1. See current all members and view her profile." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2. Who are member born today. You can know. (Reference from local timezone)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="3. See fresh news about BNK48 here. (Powered by Google News)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="4. You can contact us to help promote favorite member's event without any cost." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Notes: Your donation and feedback is primary phase to help our online space work better." />
                  </ListItem>
                </Typography>
              </CardContent>
            </Card>
            </Grow>
          </div>
          ) : (
        <div className="pb-5 pt-2">
    <Grow in={true} timeout={1000}>
  <Card className="bnktheme ml-2 mr-2">
      <CardContent>
        <Typography variant="h5" component="h2">
          Welcome to BNK48 Fan Space
        </Typography>
        <hr />
        <Typography color="textSecondary">
          This is your space for join with BNK48 fans around the world. Let's enjoy!
        </Typography>
        <hr />
        <Typography variant="body1" component="p">
          How do you do in this space?
          <ListItem>
            <ListItemText primary="1. See current all members and view her profile." />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. Who are member born today. You can know. (Reference from local timezone)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. See fresh news about BNK48 here. (Powered by Google News)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. You can contact us to help promote favorite member's event without any cost." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Notes: Your donation and feedback is primary phase to help our online space work better." />
          </ListItem>
        </Typography>
      </CardContent>
    </Card>
    </Grow>
  </div>
          )}
  
  <div className="stage text-center pt-5 pb-2">
  {Loaded3 ? (
    <>
      <d>
        {ImgThumb != '' && stream != null ? (
          <h3 className='mb-5' data-aos="fade-down">Special Live Streaming</h3>
        ) : (
          <h3 className='mb-5' data-aos="fade-down">Highlight Video Content or Music Video</h3>
        )}
      </d>
      <div className='row ml-3 mr-3 justify-content-center' data-aos="zoom-in">
      {highMV.length > 0 ? (
        <Zoom in={true} timeout={250}>
           <div className="col-md-10 mb-5">
                     <Card>
                     {
                         ImgThumb != '' ? (
                          <CardHeader
                     className='text-left'
                     title={stream.livestatus == 'live' ? (<p className='form-inline'><div class="circleload redload"></div>&nbsp;{stream.title}</p>) : stream.title}
                     subheader={'Streamed by ' + stream.uploader + ' since '+ moment.utc(stream.start).local().format('DD MMMM YYYY HH:mm:ss') + '. Click image thumbnail to watching Live'}
                     />
                         ) : (
                          <CardHeader
                     className='text-left'
                     title={highMV[0].snippet.title}
                     subheader={'Uploaded by ' + highMV[0].snippet.videoOwnerChannelTitle + ' since ' + moment.utc(highMV[0].snippet.publishedAt).local().format('DD MMMM YYYY HH:mm:ss')}
                     />
                         )
                       }
                     
                     {
                       ImgThumb != '' ? (
                        <CardMedia
                        component='img'
                        onClick={() => History.push('/livestream')}
                        src={ImgThumb}
                        />
                       ) : (
                        <CardMedia
                        component='iframe'
                        height={600}
                        src={'https://www.youtube.com/embed/' + highMV[0].snippet.resourceId.videoId +'?mute=1' + (window.innerWidth <= 600 || gp == true ? '' : '&autoplay=1')}
                        allowFullScreen
                        />
                       )
                     }
                     <CardContent>
                     </CardContent>
                     </Card>
                     </div>
          </Zoom>
      ) : (
          <h6 data-aos="zoom-out">No Highlight MV.</h6>
      )}
      </div>
    </>
  ) : (
    <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center' />
  )}
  <hr />
  {onMonth ? (
  <h3 className='mb-5' data-aos="zoom-in-up">BNK48 Members Birthday in this month</h3>
  ) : (
    <h3 className='mb-5' data-aos="zoom-in-up">BNK48 Members Birthday in today</h3>
  )}
  {Loaded1 ? (
      <div className='row ml-3 mr-3 justify-content-center'>
      {birth.length > 0 ? birth.map((item, i) => (
           <div className='col-md-3 mb-5' onClick={() => ChangeRoute(item.name)}>
           <Card>
           <CardActionArea>
           <CardMedia
                 src={item.img}
                 component="img"
                 className={item.graduated == true ? 'grayimg' : ''}
                 />
               <CardContent>
                   <h5>{item.name}</h5>
                   <p>Birthday: {moment(new Date().getFullYear() + "-" + (new Date(item.birthday).getMonth() + 1)+ "-" + (new Date(item.birthday).getDate())).format('ddd DD MMMM YYYY')} ({new Date().getFullYear() - new Date(item.birthday).getFullYear() + ' years old'})</p>
               </CardContent>
             </CardActionArea>
              </Card> 
           </div>
      )) : (
          <h6 data-aos="zoom-out">No BNK48 member birthday in today.</h6>
      )}
      </div>
  ) : (
    <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center' />
  )}
  < hr />
  <CardHeader title={(<h3 data-aos="zoom-in-down">Sample Members</h3>)} subheader={GenRan != 0 ? ('Generation ' + GenRan) : ''} className='mb-5' />
  {Loaded2 ? (
      <div className='row ml-3 mr-3 justify-content-center'>
      {samplemem.length > 0 ? samplemem.map((item, i) => (
        <Zoom in={true} timeout={150} style={{ transitionDelay: (i * 150)-150 }}>
          <div className='col-md-3 mb-5' onClick={() => ChangeRoute(item.name)}>
          <Card>
          <CardActionArea>
          <CardMedia
                src={item.img}
                component="img"
                className={item.graduated == true ? 'grayimg' : ''}
                />
              <CardContent>
                  <h5>{item.name}</h5>
              </CardContent>
            </CardActionArea>
             </Card> 
          </div>
          </Zoom>
      )) : (
          <h6>No BNK48 member birthday in today.</h6>
      )}
      </div>
  ) : (
    <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center' />
  )}
  </div>
        </>
    );
}
 
export default HomeCom;