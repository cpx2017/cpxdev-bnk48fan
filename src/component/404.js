import React from 'react';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardActionArea, CardContent, CardMedia, Grow, Fade } from '@material-ui/core';

const ErrCom = ({setSec}) => {
  React.useEffect(() => {
    setSec('Page not found')
  }, [])
    return ( 
      <>
      {window.innerWidth >1200 && (
        <div class="video-background">
         <Fade in={true} timeout={800}>
         <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayomain.webp" width={window.innerWidth} />
            </Fade>
    </div>
      )}
           {window.innerWidth >1200 ? (
          <div className="cover mt-4">
          <Grow in={true} timeout={1000}>
        <Card className="col-md-4 m-5">
        <CardContent>
                <Typography variant="h5" component="h2">
                  Error 404 | Page not Found
                </Typography>
                <hr />
                <Typography color="textSecondary">
                  Sorry, but this page is unavaliable right now
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
                  Error 404 | Page not Found
                </Typography>
                <hr />
                <Typography color="textSecondary">
                  Sorry, but this page is unavaliable right now
                </Typography>
              </CardContent>
          </Card>
          </Grow>
        </div>
        )}
      </>
     );
}
 
export default ErrCom;