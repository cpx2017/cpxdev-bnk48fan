import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
}));

const CardLoop = ({item, i, gp}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={i == 0 ? "col-md-10 mb-5" : "col-md-4 mb-5"}>
     <Card className={i == 0 ? "border border-warning border-5" : ""}>
      <CardHeader
        title={(i == 0 ? 'Highlight Music Video | ' : '') +item.snippet.title}
        subheader={'Uploaded by ' + item.snippet.videoOwnerChannelTitle + ' on ' + new Date(item.snippet.publishedAt).toLocaleString()}
    />
        <CardMedia
        component='iframe'
        height={i == 0 ? 700 : 350}
        src={'https://www.youtube.com/embed/' + item.snippet.resourceId.videoId +'?mute=1' + (window.innerWidth <= 600 || gp == true ? '' : '&autoplay=1')}
        allowFullScreen
    />
      <CardActions disableSpacing>
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
