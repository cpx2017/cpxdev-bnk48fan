import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Avatar, Grow, ListItemIcon, Typography, Zoom, Link, Breadcrumbs, IconButton, Card, CardHeader, CardMedia, CardContent, Tooltip } from '@material-ui/core';
import moment from 'moment';

import 'react-perfect-scrollbar/dist/css/styles.css';
import Swal from 'sweetalert2'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AOS from "aos";

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
    const FanRoom = ({fet, setSec}) => {
        const classes = useStyles();
        const History = useHistory()
        const [mem, setmem] = React.useState('');
        const FullRef = React.useRef(null);
        const CardRef = React.useRef(null);
        const [arr, setArr] = React.useState([]); 
        const [Ev, setEv] = React.useState([]); 
        const [Loaded, setLoaded] = React.useState(false);
        const [Loaded1, setLoaded1] = React.useState(false);

        const NonLoginDetect = () => {
            if (localStorage.getItem("glog") == null) {
                Swal.fire({
                    title: 'You need to login before use this feature.',
                    icon: 'warning',
                    iconColor: 'rgb(203, 150, 194)'
                  }).then(() => {
                    History.goBack()
                  })
            }
        }

        const LinkHand = (nme) => {
             fetch(fet + '/bnk48/list?mem=' + nme, {
                    method :'get'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        setEv(data)
                    }
                    setLoaded1(true)
                }).catch(() => {
                    setEv([])
                    setLoaded1(true)
                })
        }

        React.useEffect(() => {
            AOS.init({ duration: 1000 });
            if (localStorage.getItem("glog") == null) {
                setSec('Access denied')
                alert("You need to login before use this feature.")
                History.goBack()
            } else {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            var url_string = window.location.href; 
            var url = new URL(url_string);
            var c = url.searchParams.get("name");
            if (c != null && c != "") {
                setmem(c)
                fetch(fet + '/bnk48/getmember?name=' + c +'&tstamp=' + Math.floor( new Date().getTime()  / 1000), {
                    method :'post'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.response == 'Not found this member in record.') {
                        History.push("/")
                    } else {
                        setSec(data.response.name + '\'s Fandom')
                        const temp =[]
                        temp.push(data.response)
                        setArr(temp)
                        setLoaded(true)
                        LinkHand(c)
                    }
                }).catch(() => {
                    setArr([])
                    setLoaded(true)
                })
         
            } else {
                History.push("/")
            }
        }
        }, [])

        const onLocal = (t) => {
            let stillUtc = moment.utc(t).toDate();
            return moment(stillUtc).local().format('DD MMMM YYYY HH:mm:ss');
        }

        return (  
        <>
            <div className="stage pt-5 pb-2" ref={FullRef} onClick={() => NonLoginDetect()}>
                <d ref={CardRef}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h3 className={window.innerWidth > 600 ? ' ml-5' : ' ml-3'}>{mem != '' ? capitalizeFirstLetter(mem) + " BNK48's Fandom" : 'Fetching Header'}</h3>
                            <Breadcrumbs className={window.innerWidth > 600 ? ' ml-5' : ' ml-3'} aria-label="breadcrumb">
                                <Link color="inherit" onClick={() => History.push("/fandom")}>
                                    Members
                                </Link>
                                <Typography color="textPrimary">{capitalizeFirstLetter(mem)}</Typography>
                            </Breadcrumbs>
                        </div>
                        <div className='col-md-6 text-right pr-5 pt-2'>
                            <Button className='border-success' variant="outlined" onClick={() => History.push('/addevent?name=' + mem.toLowerCase())} disabled={arr.length == 0 || arr[0].graduated ? true : false}>
                                {arr.length > 0 ? (arr[0].graduated ? 'This member is graduated': 'Request Event') : 'Loading'}
                            </Button>
                        </div>
                    </div>
                <hr />
                {Loaded ? (
                    <>
                    {arr.length > 0 && arr.map((item, i) => (
                        <Grow in={Loaded} timeout={600}>
                            <Card className="ml-5 mr-5" onClick={() => window.open("/member?name=" + item.name.toLowerCase(), '_blank').focus()}>
                                <CardHeader
                                    avatar={
                                        <Avatar alt={item.name + '-img'} src={item.img} className={classes.large} />
                                    }
                                    action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                    }
                                    title={(<h5>{item.name}</h5>)}
                                    subheader={item.fullnameEn[0] + ' '+ item.fullnameEn[1]}
                                />
                                </Card>
                    </Grow>
                    ))}
                    </>
                ) : (
                    <div className='text-center'>
                         <Zoom in={Loaded ? false : true} timeout={{ enter: 200, exit: 200}}>
                        <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-3 mb-5' />
                        </Zoom>
                    </div>
                )}
                </d>
                {Loaded1 ? (
                <>
                    {Ev.length == 0 ? (
                        <div className='mt-5 pl-5 mr-5'>
                                <Card className='mb-2 p-5 text-center' onClick={() => History.push('/addevent?name=' + mem.toLowerCase())}>
                                        Not found event for this Member. If you hear any event.You can request event to promote here. No hidden cost!
                                    </Card>
                        </div>
                            ) : (
                                <div className='mt-5 pl-5 mr-5'>
                                {Ev.map((item) => (
                                   <Card data-aos="zoom-in-down">
                                   <CardHeader
                                     title={item.title}
                                     subheader={'Event start in ' + onLocal(item.start).toString() + ' until ' + onLocal(item.end).toString()}
                                   />
                                   <CardMedia
                                     className={classes.media}
                                     src={item.img}
                                     component="img"
                                   />
                                   <CardContent>
                                     <Typography variant="body1" component="p">
                                       {item.desc} – <b className='text-muted'>{'Posted by ' + item.name}</b>
                                     </Typography>
                                   </CardContent>
                                 </Card>
                                ))}
                        </div>
                    )}
                </>
                ) : (
                    <div className='text-center'>
                         <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-3 mb-5' />
                    </div>
                )}
                </div>
        </>
         );
    }
     
    export default FanRoom;