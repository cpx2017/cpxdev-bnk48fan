import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Avatar, Grow, ListItemIcon, Typography, Zoom, Link, Breadcrumbs, IconButton, Card, CardHeader } from '@material-ui/core';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
    const FanRoom = ({fet}) => {
        const classes = useStyles();
        const History = useHistory()
        const [mem, setmem] = React.useState('');
        const FullRef = React.useRef(null);
        const CardRef = React.useRef(null);
        const [arr, setArr] = React.useState([]); 
        const [Loaded, setLoaded] = React.useState(false);

        const NonLoginDetect = () => {
            if (localStorage.getItem("glog") == null) {
                alert("You need to login before use this feature.")
                History.goBack()
            }
        }

        React.useEffect(() => {
            if (localStorage.getItem("glog") == null) {
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
                        const temp =[]
                        temp.push(data.response)
                        setArr(temp)
                        setLoaded(true)
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
                            <Button className='border-success' variant="outlined" onClick={() => History.push('/addevent?name=' + mem.toLowerCase())}>
                                Request Event
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
                        <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="50px" className='text-center mt-3 mb-5' />
                        </Zoom>
                    </div>
                )}
                </d>
               <div className='mt-5 pl-5 mr-5'>
                    <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-2'>
                            OK
                        </Card>
                        <Card className='mb-5'>
                            OK
                        </Card>
               </div>
                
            </div>
        </>
         );
    }
     
    export default FanRoom;