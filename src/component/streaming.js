import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faItunes, faDeezer, faYoutube, faTiktok, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons'
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardHeader, CardContent, CardMedia, Grow, Fade, CardActionArea } from '@material-ui/core';
    import CircularProgress from '@material-ui/core/CircularProgress';

const MusicSt = ({fet}) => {
    const [data, setData] = React.useState(null)
    const [hover, setHover] = React.useState(0)
    React.useEffect(()=> {
        fetch(fet + '/bnk48/gettopsong', {
            method: 'post', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
            .then(response => response.json())
            .then(r => {
                setData(r.tracks)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])
    return ( 
        <>
        <Card>
        <h3 className='text-center mt-5'>BNK48 Top Songs Ranking</h3>
            <p className='text-center'>Which BNK48 songs are popular and the highest listening on the best Music Streaming. Powered by Spotify.</p>
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
            {window.innerWidth >1200 && (
          <div class="video-background">
           <Fade in={true} timeout={800}>
           <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/bnk48/sayomain.webp" width={window.innerWidth} />
              </Fade>
      </div>
        )}
        <div className='modcontain mb-5'>
        {window.innerWidth > 1200 ? (
            <div className={(data != null ? '' : 'cover ')+ "row justify-content-center mt-4 mb-3"}>
            {data != null && (
                <>
                <Grow in={data != null && (hover == 4 || hover == 0) ? true : false} timeout={1000}>
              <Card className="col-md m-2 rank4 cur" onClick={() => window.open(data[3].external_urls.spotify, '_blank').focus()}>
                  <CardContent>
                    <CardActionArea onMouseOver={() => setHover(4)} onMouseLeave={() => setHover(0)}>
                  <Typography variant="h5" component="h2">
                    Number 4th
                    </Typography>
                    <hr />
                    <CardMedia
                        className='mb-3'
                        src={data[3].album.images[0].url}
                        component="img"
                    />
                     <Typography component="h5" variant="h5">
                        {data[3].name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date: {new Date(data[3].album.release_date).toDateString()}
                    </Typography>
                    </CardActionArea>
                  </CardContent>
                </Card>
                </Grow>
                <Grow in={data != null && (hover == 2 || hover == 0) ? true : false} timeout={1000}>
              <Card className="col-md m-2 rank2 cur" onClick={() => window.open(data[1].external_urls.spotify, '_blank').focus()}>
              <CardContent>
                    <CardActionArea onMouseOver={() => setHover(2)} onMouseLeave={() => setHover(0)}>
                  <Typography variant="h5" component="h2">
                    Number 2nd
                    </Typography>
                    <hr />
                    <CardMedia
                        className='mb-3'
                        src={data[1].album.images[0].url}
                        component="img"
                    />
                     <Typography component="h5" variant="h5">
                        {data[1].name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date: {new Date(data[1].album.release_date).toDateString()}
                    </Typography>
                    </CardActionArea>
                  </CardContent>
                </Card>
                </Grow>
                <Grow in={data != null && (hover == 1 || hover == 0) ? true : false} timeout={1000}>
              <Card className="col-md m-2 rank1 cur" onClick={() => window.open(data[0].external_urls.spotify, '_blank').focus()}>
              <CardContent>
              <CardActionArea onMouseOver={() => setHover(1)} onMouseLeave={() => setHover(0)}>
                  <Typography variant="h5" component="h2">
                    The best popular BNK48 song
                    </Typography>
                    <hr />
                    <CardMedia
                        className='mb-3'
                        src={data[0].album.images[0].url}
                        component="img"
                    />
                     <Typography component="h5" variant="h5">
                        {data[0].name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date: {new Date(data[0].album.release_date).toDateString()}
                    </Typography>
                    </CardActionArea>
                    </CardContent>
                </Card>
                </Grow>
                <Grow in={data != null && (hover == 3 || hover == 0) ? true : false} timeout={1000}>
              <Card className="col-md m-2 rank3 cur" onClick={() => window.open(data[2].external_urls.spotify, '_blank').focus()}>
              <CardContent>
                    <CardActionArea onMouseOver={() => setHover(3)} onMouseLeave={() => setHover(0)}>
                  <Typography variant="h5" component="h2">
                    Number 3rd
                    </Typography>
                    <hr />
                    <CardMedia
                        className='mb-3'
                        src={data[2].album.images[0].url}
                        component="img"
                    />
                     <Typography component="h5" variant="h5">
                        {data[2].name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date: {new Date(data[2].album.release_date).toDateString()}
                    </Typography>
                    </CardActionArea>
                  </CardContent>
                </Card>
                </Grow>
                <Grow in={data != null && (hover == 5 || hover == 0) ? true : false} timeout={1000}>
              <Card className="col-md m-2 rank5 cur" onClick={() => window.open(data[4].external_urls.spotify, '_blank').focus()}>
                  <CardContent>
                    <CardActionArea onMouseOver={() => setHover(5)} onMouseLeave={() => setHover(0)}>
                  <Typography variant="h5" component="h2">
                    Number 5th
                    </Typography>
                    <hr />
                    <CardMedia
                        className='mb-3'
                        src={data[4].album.images[0].url}
                        component="img"
                    />
                     <Typography component="h5" variant="h5">
                        {data[4].name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date: {new Date(data[4].album.release_date).toDateString()}
                    </Typography>
                    </CardActionArea>
                  </CardContent>
                </Card>
                </Grow>
                </>
        )}
          </div>
          ) : (
        <div className="pb-5 pt-2">
  {data != null && (
    <Grow in={true} timeout={1000}>
        <>
        <Card className="rank1 mt-2" onClick={() => window.open(data[0].external_urls.spotify, '_blank').focus()}>
        <CardContent>
                    <CardActionArea>
                  <Typography variant="h5" component="h2">
                  The best popular BNK48 song
                    </Typography>
                    <hr />
                    <CardMedia
                        className='mb-3'
                        src={data[0].album.images[0].url}
                        component="img"
                    />
                     <Typography component="h5" variant="h5">
                        {data[0].name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date: {new Date(data[0].album.release_date).toDateString()}
                    </Typography>
                    </CardActionArea>
                  </CardContent>
                </Card>
        <Card className="rank2mo mt-4" onClick={() => window.open(data[1].external_urls.spotify, '_blank').focus()}>
        <CardContent>
                    <CardActionArea>
                  <Typography variant="h5" component="h2">
                    Number 2nd
                    </Typography>
                    <hr />
                    <CardMedia
                        className='mb-3'
                        src={data[1].album.images[0].url}
                        component="img"
                    />
                     <Typography component="h5" variant="h5">
                        {data[1].name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date: {new Date(data[1].album.release_date).toDateString()}
                    </Typography>
                    </CardActionArea>
                  </CardContent>
                </Card>
                <Card className="rank3mo mt-4" onClick={() => window.open(data[2].external_urls.spotify, '_blank').focus()}>
        <CardContent>
                    <CardActionArea>
                  <Typography variant="h5" component="h2">
                    Number 3rd
                    </Typography>
                    <hr />
                    <CardMedia
                        className='mb-3'
                        src={data[2].album.images[0].url}
                        component="img"
                    />
                     <Typography component="h5" variant="h5">
                        {data[2].name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date: {new Date(data[2].album.release_date).toDateString()}
                    </Typography>
                    </CardActionArea>
                  </CardContent>
                </Card>
                <Card className="bnktheme mt-4" onClick={() => window.open(data[3].external_urls.spotify, '_blank').focus()}>
        <CardContent>
                    <CardActionArea>
                  <Typography variant="h5" component="h2">
                    Number 4th
                    </Typography>
                    <hr />
                    <CardMedia
                        className='mb-3'
                        src={data[3].album.images[0].url}
                        component="img"
                    />
                     <Typography component="h5" variant="h5">
                        {data[3].name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date: {new Date(data[3].album.release_date).toDateString()}
                    </Typography>
                    </CardActionArea>
                  </CardContent>
                </Card>
                <Card className="bnktheme mt-4" onClick={() => window.open(data[4].external_urls.spotify, '_blank').focus()}>
        <CardContent>
                    <CardActionArea>
                  <Typography variant="h5" component="h2">
                    Number 5th
                    </Typography>
                    <hr />
                    <CardMedia
                        className='mb-3'
                        src={data[4].album.images[0].url}
                        component="img"
                    />
                     <Typography component="h5" variant="h5">
                        {data[4].name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date: {new Date(data[4].album.release_date).toDateString()}
                    </Typography>
                    </CardActionArea>
                  </CardContent>
                </Card>
        </>
            </Grow>
               )}
            </div>
          )}
        </div>
        </>
     );
}
 
export default MusicSt;