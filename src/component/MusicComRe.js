import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MuiAlert from '@material-ui/lab/Alert';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment'
import AOS from "aos";


const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CardLoop = ({item, i, gp}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [alt, setAlert] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert('')
    setOpen(false);
  };

  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, [])

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClick = (id, til) => {
    navigator.clipboard.writeText('https://www.youtube.com/watch?v=' + id);
    alert('Link of song '+alt +' has copied to clipboard');
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={i == 0 ? "col-md-9 mb-5" : "col-md-4 mb-5"} data-aos='zoom-in'>
     <Card className={i == 0 ? "border border-warning border-5" : ""}>
      <CardHeader
        title={(i == 0 ? 'Highlight Music Video | ' : '') +item.snippet.title}
        subheader={'Uploaded by ' + item.snippet.videoOwnerChannelTitle + ' since ' + moment.utc(item.snippet.publishedAt).local().format('DD MMMM YYYY HH:mm:ss')}
    />
        <CardMedia
        component='iframe'
        height={i == 0 ? 700 : 350}
        src={'https://www.youtube.com/embed/' + item.snippet.resourceId.videoId +'?mute=1' + (window.innerWidth <= 600 || gp == true ? '' : '&autoplay=1')}
        allowFullScreen
    />
      <CardActions disableSpacing>
      <IconButton onClick={() => handleClick(item.snippet.resourceId.videoId,item.snippet.title)}>
        <ShareIcon />
    </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent onDoubleClick={() => handleExpandClick()}>
          <Typography paragraph className='nl'>
              {item.snippet.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
}
export default CardLoop;
