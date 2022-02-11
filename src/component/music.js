import React from 'react';
import { Card, CardHeader, CardContent, CardMedia, Typography, Zoom, CardActions, IconButton, ButtonGroup } from '@material-ui/core';
import MusicCom from './MusicComRe'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faItunes, faDeezer, faYoutube, faTiktok, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons'

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
            <div className='container border border-success rounded mb-3'>
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        Also avaliable on below streaming platform
                    </div>
                    <div className='col-md-12 text-center'>
                        <FontAwesomeIcon icon={faYoutubeSquare} size="lg" className='mr-1 cur' onClick={() => window.open('https://www.youtube.com/c/BNK48OfficialYouTubeChannel', '_target').focus()} data-toggle="tooltip" data-placement="top" title="See Music Video on youtube" />
                        <FontAwesomeIcon icon={faSpotify} size="lg" className='mr-1 cur' onClick={() => window.open('https://open.spotify.com/artist/0A7q0U0IEdNOHWnQpMRQdD?si=x3cudpoXQLi8L4hD18ekng', '_target').focus()} data-toggle="tooltip" data-placement="top" title="Play on Spotify" />
                        <FontAwesomeIcon icon={faDeezer} size="lg" className='mr-1 cur' onClick={() => window.open('https://www.deezer.com/en/artist/12806207', '_target').focus()} data-toggle="tooltip" data-placement="top" title="Listen on Deezer (Lossless included)" />
                        <FontAwesomeIcon icon={faItunes} size="lg" className='mr-1 cur' onClick={() => window.open('https://music.apple.com/us/artist/bnk48/1255496438', '_target').focus()} data-toggle="tooltip" data-placement="top" title="Avaliable on Apple Music and Itune Store" />
                        <FontAwesomeIcon icon={faYoutube} size="lg" className='mr-1 cur' onClick={() => window.open('https://music.youtube.com/channel/UCngfn4Q-XOei9tQeJxvQR_w?feature=share', '_target').focus()} data-toggle="tooltip" data-placement="top" title="See on Youttube Music" />
                        <FontAwesomeIcon icon={faTiktok} size="lg" className='cur' onClick={() => window.open('https://www.tiktok.com/@bnk48official_th', '_target').focus()} data-toggle="tooltip" data-placement="top" title="Share moment in TikTok" />
                    </div>
                </div>
            </div>
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