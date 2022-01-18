import React from 'react';
import { Card, CardHeader, CardContent, CardMedia, Typography, Zoom, CardActions, IconButton, ButtonGroup } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Music = ({gp, fet}) => {
    const [Loaded, setLoaded] = React.useState(false);
    const [Arr, setArr] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [alt, setAlert] = React.useState('');

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

      const handleClick = (id, til) => {
        navigator.clipboard.writeText('https://www.youtube.com/watch?v=' + id);
        setOpen(true);
        setAlert(til)
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlert('')
        setOpen(false);
      };

    React.useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(encodeURI(fet + '/bnk48/getVideo?tstamp=' + Math.floor( new Date().getTime()  / 1000)), {
            method: 'post', // or 'PUT'
            })
            .then(response => response.json())
            .then(data => {
                setLoaded(true)
                setArr(data.items)
            console.log('Success:', data);
            })
            .catch((error) => {
                setLoaded(true)
            console.error('Error:', error);
            });
    }, [])

        return (
            <>
            <h3 className='text-center mt-5'>Music Video Promote</h3>
            <p className='text-center'>You can see new release songs of BNK48 on below. Powered by Youtube.</p>
            {Loaded ? (
                 <div className="stage pt-5 pl-3 pr-3">
                 <br />
                 <div className='row justify-content-center'>
                 {Arr.length > 0 ? Arr.map((item,i) => (
                     <div className="col-md-4 mb-5">
                     <Card>
                     <CardHeader
                     title={item.snippet.title}
                     subheader={'Uploaded by ' + item.snippet.videoOwnerChannelTitle + ' on ' + new Date(item.snippet.publishedAt).toLocaleString()}
                     />
                     <CardMedia
                     component='iframe'
                     height={350}
                     src={'https://www.youtube.com/embed/' + item.snippet.resourceId.videoId +'?mute=1' + (window.innerWidth <= 600 || gp == true ? '' : '&autoplay=1')}
                     allowFullScreen
                     />
                     <CardContent>
                     </CardContent>
                     <CardActions disableSpacing>
                     <IconButton onClick={() => handleClick(item.snippet.resourceId.videoId,item.snippet.title)}>
                         <ShareIcon />
                     </IconButton>
                     </CardActions>
                     </Card>
                     </div>
                 )) : (
                     <div className='text-center col-md-12'>
                         Music Video is not found.
                     </div>
                 )}
                 </div>
                 <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                            Link of song "{alt}" has copied to clipboard
                            </Alert>
                        </Snackbar>
                 </div>
            ) : (
                <div className='text-center'>
                <Zoom in={Loaded ? false : true} timeout={{ enter: 200, exit: 200}}>
                <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="50px" className='text-center mt-3 mb-5' />
                </Zoom>
                </div>
            )}
            </>
        )
    }
 
export default Music;