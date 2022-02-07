import React from 'react';
import { Card, CardContent, CardHeader, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const Stream = ({fet}) => {
    const classes = useStyles();
    const [urlstream, setStream] = React.useState('');
    const [Load, setLoad] = React.useState(true);
    React.useEffect(() => {
        fetch(fet + '/bnk48/getstream?ch=2', {
            method :'post'
        })
            .then(response => response.json())
            .then(data => {
              setStream(data.link)
              setLoad(false)
            }).catch(() => {
              setStream('')
              setLoad(false)
            })
    },[])
    return ( 
        <>
        <Card>
            <CardContent className='text-center'>
                <CardHeader title='Live Streaming Station' />
                <div className='container'>
                    {urlstream != '' ? (
                        <iframe src={urlstream} width="100%" height={700} allowFullScreen />
                    ) : (
                        <h6>Stream not found</h6>
                    )}
                </div>
            </CardContent>
        </Card>
            <Backdrop className={classes.backdrop} open={Load}>
            <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="50px" />
        </Backdrop>
        </>
     );
}
 
export default Stream;