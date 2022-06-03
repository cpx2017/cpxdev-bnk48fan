import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faItunes, faDeezer, faYoutube, faTiktok, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons'
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardHeader, CardContent, CardMedia, Grow, Fade, CardActionArea } from '@material-ui/core';
    import CircularProgress from '@material-ui/core/CircularProgress';
    import AOS from "aos";

const MusicSt = ({fet, setSec}) => {
    const [data, setData] = React.useState([])
    const [hover, setHover] = React.useState('')
    const [Loaded, setLoaded] = React.useState(false);
    React.useEffect(()=> {
      setSec('Song Album List')
      AOS.init({ duration: 1000 });
      setLoaded(true)
        fetch(fet + '/bnk48/getsongal', {
            method: 'post', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
            .then(response => response.json())
            .then(r => {
              setLoaded(false)
                setData(r.items)
            })
            .catch((error) => {
              setLoaded(false)
                console.error('Error:', error);
            });
    }, [])
    return ( 
        <>
        <Card>
        <h3 className='text-center mt-5'>BNK48 Song Album List</h3>
            <p className='text-center'>Released BNK48 albums and singles. Powered by Spotify.</p>
            <div className='container border border-success rounded mb-3'>
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        All BNK48 songs is avaliable on below streaming platform
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

        </Card>
        {Loaded && (
        <Zoom in={Loaded} timeout={{ enter: 200, exit: 200}}>
          <Card className='p-5 text-center mt-5'>
                <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-5 mb-5' />
                Connect to service
          </Card>
         </Zoom>
        )}
            {window.innerWidth >1200 && (
          <div class="video-background">
           <Fade in={true} timeout={800}>
           <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayomain.webp" width={window.innerWidth} />
              </Fade>
      </div>
        )}
        <div className='modcontain justify-content-center row mt-5 mb-5'>
              {data.length > 0 ? data.map((item,i) => (item.release_date.includes(new Date().getFullYear()) || item.release_date.includes(new Date().getFullYear() - 1)) ? (
                 <Card key={item.id} className={'col-md-3 mb-3' + (window.innerWidth < 700 ? ' bnktheme' : '')} data-aos="zoom-in" >
                  <CardContent>
                    <CardActionArea onClick={() => window.open(item.external_urls.spotify, '_blank').focus()}>
                  <Typography variant="h5" component="h2">
                    {item.name}
                    </Typography>
                    <hr />
                    <CardMedia
                        className='mb-3'
                        src={item.images[0].url}
                        component="img"
                    />
                     <Typography variant="body1">
                        {item.album_type =='single' && item.total_tracks == 1 ? 'The single song by ' + item.artists[0].name : item.album_type =='single' && item.total_tracks > 1 ? 'This Extended Play (EP) included ' + item.total_tracks +' tracks.'  : 'This Studio Album included ' + item.total_tracks +' tracks.' }
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date: {new Date(item.release_date).toDateString()}
                    </Typography>
                    </CardActionArea>
                  </CardContent>
                </Card>
              ) : null) : (
                <Zoom in={!Loaded} timeout={{ enter: 200, exit: 200}}>
                <Card className='col-md-12 p-5 text-center mb-5 mt-5'>
                      There was a problem connecting to the service. Please try again later
                </Card>
              </Zoom>
              )}
        </div>
        </>
     );
}
 
export default MusicSt;