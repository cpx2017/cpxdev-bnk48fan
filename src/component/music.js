import React from 'react';
import { Card, CardHeader, CardContent, CardMedia, Typography, Zoom, CardActions, IconButton, ButtonGroup } from '@material-ui/core';
import MusicCom from './MusicComRe'

const Music = ({gp, fet}) => {
    const [Loaded, setLoaded] = React.useState(false);
    const [Arr, setArr] = React.useState([]);

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
                       <MusicCom item={item} i={i} gp={gp} />
                 )) : (
                     <div className='text-center col-md-12'>
                         Music Video is not found.
                     </div>
                 )}
                 </div>
                 </div>
            ) : (
                <div className='text-center'>
                <Zoom in={Loaded ? false : true} timeout={{ enter: 200, exit: 200}}>
                <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-3 mb-5' />
                </Zoom>
                </div>
            )}
            </>
        )
    }
 
export default Music;