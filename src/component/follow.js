import React from 'react';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardHeader, CardContent, CardMedia, Grow, Fade } from '@material-ui/core';
    import MoreVertIcon from '@material-ui/icons/MoreVert';

const Contact = ({fet}) => {

    const [Loaded, setLoaded] = React.useState(false);
    const [news, setNews] = React.useState([]);
    React.useEffect(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(fet + '/bnk48/getnews', {
            method :'get'
        })
        .then(response => response.json())
        .then(data => {
          if (data.rss.channel.item != undefined) {
            setNews(data.rss.channel.item)
            setLoaded(true)
        }
        }).catch(() => {
            setNews([])
            setLoaded(true)
        })
        
    }, [])

    return ( 
        <>
        {window.innerWidth > 800 && (
          <div class="video-background">
           <Fade in={true} timeout={800}>
           <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayoteaser.jpg" width={window.innerWidth} />
              </Fade>
      </div>
        )}
             {window.innerWidth > 800 ? (
            <div className="cover mt-4">
            <Grow in={true} timeout={1000}>
          <Card className="col-md-4 m-5">
              <CardContent>
              <Typography variant="h5" component="h2">
                Follow BNK48
                </Typography>
                <hr />
                <Typography color="textSecondary">
                You have many way to follow every update from Social Platform
                <ListItem>
                    <ListItemText primary="Facebook" secondary={(<a href='//www.facebook.com/bnk48official' target='_blank'>bnk48official</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Instagram" secondary={(<a href='//www.instagram.com/bnk48' target='_blank'>bnk48</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Mobile Application" secondary={(<a href='//app.bnk48.com' target='_blank'>iAM48 Mobile Application. Avaliable to download in Apple App Store or Google Play Store</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Twitter" secondary={(<a href='//twitter.com/bnk48official' target='_blank'>bnk48official</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Tiktok" secondary={(<a href='//www.tiktok.com/@bnk48official_th' target='_blank'>@bnk48official_th</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Youtube" secondary={(<a href='//www.youtube.com/c/BNK48OfficialYouTubeChannel' target='_blank'>BNK48OfficialYouTubeChannel</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Also Streaming Platform" secondary={(<a href='/music' target='_blank'>Go to Music page</a>)} />
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
                Follow BNK48
                </Typography>
                <hr />
                <Typography color="textSecondary">
                You have many way to follow every update from Social Platform
                <ListItem>
                    <ListItemText primary="Facebook" secondary={(<a href='//www.facebook.com/bnk48official' target='_blank'>bnk48official</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Instagram" secondary={(<a href='//www.instagram.com/bnk48' target='_blank'>bnk48</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Mobile Application" secondary={(<a href='//app.bnk48.com' target='_blank'>iAM48 Mobile Application. Avaliable to download in Apple App Store or Google Play Store</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Twitter" secondary={(<a href='//twitter.com/bnk48official' target='_blank'>bnk48official</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Tiktok" secondary={(<a href='//www.tiktok.com/@bnk48official_th' target='_blank'>@bnk48official_th</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Youtube" secondary={(<a href='//www.youtube.com/c/BNK48OfficialYouTubeChannel' target='_blank'>BNK48OfficialYouTubeChannel</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Also Streaming Platform" secondary={(<a href='/music' target='_blank'>Go to Music page</a>)} />
                  </ListItem>
                </Typography>
              </CardContent>
    </Card>
    </Grow>
  </div>
          )}
        </>
    );
}
 
export default Contact;