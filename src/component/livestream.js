import React from 'react';
import { Card, CardContent, CardHeader, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AOS from "aos";

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const Stream = ({fet, setSec}) => {
    const classes = useStyles();
    const [urlstream, setStream] = React.useState('');
    const [streaminfo, setInfo] = React.useState(null);
    const [Load, setLoad] = React.useState(true);
    React.useEffect(() => {
        AOS.init({ duration: 1000 });
        fetch(fet + '/bnk48/getstream?ch=2', {
            method :'post'
        })
            .then(response => response.json())
            .then(data => {
                if (data.link != '-') {
                    setSec('[Live] ' + data.title)
                } else {
                    setSec('No Live today')
                }
              setStream(data.link)
              setInfo(data)
              setLoad(false)
            }).catch(() => {
              setStream('')
              setLoad(false)
            })
    },[])
    return ( 
        <>
        <Card>
            <CardContent className='text-center align-center'>
                {streaminfo != null && urlstream != '' ? (
                     <CardHeader title='Live Streaming Station' subheader={(streaminfo.livestatus == 'live' ? '[LIVE] "' + streaminfo.title : streaminfo.title) + '" by ' + streaminfo.uploader} />
                ): (
                    <CardHeader title='Live Streaming Station' subheader='Special Live Streaming will coming soon' />
                )}
               
                <div className='container' data-aos="zoom-out-up">
                    {urlstream != '' ? (
                        <iframe src={urlstream} width="100%" height={window.innerWidth >1200 ? 700 : '100%'} allowFullScreen />
                    ) : (
                        <h6>Stream not found</h6>
                    )}
                </div>
            </CardContent>
        </Card>
            <Backdrop className={classes.backdrop} open={Load}>
            <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" />
        </Backdrop>
        </>
     );
}
 
export default Stream;