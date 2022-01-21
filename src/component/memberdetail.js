import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Fade, Grow, CardMedia, Typography, Zoom, Link, Breadcrumbs, Button } from '@material-ui/core';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import CakeIcon from '@material-ui/icons/Cake';
import GroupIcon from '@material-ui/icons/Group';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PanToolIcon from '@material-ui/icons/PanTool';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';

import { Fireworks } from 'fireworks-js/dist/react'

var pm = new Audio('https://p.scdn.co/mp3-preview/26031551568cba193fbb55d6e4dcf3eb8fb99b04?cid=774b29d4f13844c495f206cafdad9c86')

const fwoptions = {
    speed: 3,
  }

  const fwstyle = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: 'transperent'
  }

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    const MemDetail = ({fet, kamin}) => {
        const History = useHistory()
        const [mem, setmem] = React.useState('');
        const [arr, setArr] = React.useState([]); 
        const [Loaded, setLoaded] = React.useState(false);
        const [birthday, setBirthday] = React.useState(false);
        const [kami, setKami] = React.useState(false);
        
        const [play, onPlay] = React.useState(false);

        const BirthdayCheck = (val) => {
            fetch(fet + '/bnk48/getmemberbybirth?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
            .then(response => response.json())
            .then(data => {
                if (data.count > 0) {
                     const arr = (data.response)
                     const i = arr.findIndex(x => x.name == val)
                     if (i > -1) {
                        setBirthday(true)
                     }
                } else {
                    setBirthday(false)
                }
            });
        }

        const PlaySong = () => {
            if (pm.paused) { 
                pm.play()
                onPlay(true)
                var loop = setInterval(function () {
                    if (pm.paused) { 
                        clearInterval(loop)
                        onPlay(false)
                    }
                }, 100);
            }
        }

        const Subsc = (val) =>{
            if (localStorage.getItem("glog") != null && kamin != '') {
                let msg = window.confirm("You will change Kami-Oshi from \"" + capitalizeFirstLetter(kamin) + "\" to \"" + capitalizeFirstLetter(val) + "\". Are you sure?")
                if (msg == true) {
                    setLoaded(false)
                    setKami(true)
                    fetch(fet + '/bnk48/uptkami?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString() + '&name=' + val, {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        })
                        .then(response => response.text())
                        .then(data => {
                            if (data == "false") {
                                setKami(false)
                            }
                            setLoaded(true)
                        })
                        .catch((error) => {
                            alert("System will be temporary error for a while. Please try again")
                            setLoaded(true)
                            setKami(false)
                        });
                  }
              } else {
                setLoaded(false)
                setKami(true)
                fetch(fet + '/bnk48/uptkami?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString() + '&name=' + val, {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    })
                    .then(response => response.text())
                    .then(data => {
                        if (data == "false") {
                            setKami(false)
                        }
                        setLoaded(true)
                    })
                    .catch((error) => {
                        alert("System will be temporary error for a while. Please try again")
                        setLoaded(true)
                        setKami(false)
                    });
              }
        }

        React.useEffect(() => {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            var url_string = window.location.href; 
            var url = new URL(url_string);
            var c = url.searchParams.get("name");
            setKami(true)
            if (c != null && c != "") {
                if (localStorage.getItem("glog") != null) {
                    fetch(fet + '/bnk48/getFanMem?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString()  , {
                      method :'get'
                  })
                    .then(response => response.json())
                    .then(data => {
                      if (data.obj != 'none' && (data.obj.response.name).toLowerCase() == c) {
                        setKami(true)
                      } else {
                        setKami(false)
                      }
                    });
                  }
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

                        BirthdayCheck(data.response.name)
                    }
                }).catch(() => {
                    setArr([])
                    setLoaded(true)
                })
         
            } else {
                History.push("/")
            }
            return (() => {
                pm.pause()
            })
        }, [])
        return (  
        <>
            <div className="stage pt-5 pb-2">
                <h3 className={window.innerWidth > 600 ? ' ml-5' : ' ml-3'}>{mem != '' ? 'About ' + capitalizeFirstLetter(mem) + ' BNK48' : 'Fetching Header'}</h3>
                <Breadcrumbs className={window.innerWidth > 600 ? ' ml-5' : ' ml-3'} aria-label="breadcrumb">
                    <Link color="inherit" onClick={() => History.push("/memberlist")}>
                        Members
                    </Link>
                    <Typography color="textPrimary">{capitalizeFirstLetter(mem)}</Typography>
                </Breadcrumbs>
                <hr />
                {Loaded ? (
                    <>
                    {arr.length > 0 && arr.map((item, i) => (
                        <Grow in={Loaded} timeout={600}>
                            <div>
                            <Fade in={play} timeout={{enter:300,exit:500}}>
                            <Fireworks options={fwoptions} style={fwstyle} />
                            </Fade>

                            <Card className={(window.innerWidth > 600 ? ' m-5' : ' m-3') + " row"} key={i}>
                            <div className={window.innerWidth > 1600 ? 'col-lg-3 mb-1' : 'col-lg-4 mb-1'}>
                                <Fade in={true} timeout={600} style={{ transitionDelay: 300}}>
                                    <CardMedia
                                    src={item.img}
                                    component="img"
                                    />
                                </Fade>
                            </div>
                            <Fade in={true} timeout={1200} style={{ transitionDelay: 600}}>
                                <div className='col-md mt-5 mb-5'>
                                    <h4>{item.fullnameEn[0]} {item.fullnameEn[1]} [{item.name}]</h4>
                                    {localStorage.getItem("glog") != null && (
                                        <Button onClick={() => Subsc(mem)} color="primary" variant="contained" disabled={kami}>{kami ? "She's your Kami-Oshi" : 'Set as Kami-Oshi'}</Button> 
                                    )}
                                    <hr />
                                    <>
                                        <h6><LocationOnIcon fontSize="small"/> {item.province}</h6>
                                        {birthday ? (
                                            <h6><CakeIcon fontSize="small"/> Today is her birthday! ({new Date().getFullYear() - new Date(item.birthday).getFullYear() + ' years old'})</h6>
                                        ) : (
                                            <h6><CakeIcon fontSize="small"/> {item.birthday}</h6>
                                        )}
                                        {!item.graduated && (
                                            <>
                                            <p><GroupIcon fontSize="small"/> {item.team}</p>
                                            <p><AccountCircleIcon fontSize="small"/> Generation {item.gen}</p>
                                            </>
                                        )}
                                        <p><FavoriteIcon fontSize="small"/>&nbsp;
                                            {
                                                item.favorite.length > 0 ? item.favorite.map((its, i) => i == item.favorite.length - 1 ? its : its + ', ') : 'None'
                                            }
                                        </p>
                                        <p><NaturePeopleIcon fontSize="small"/>&nbsp;
                                            {
                                                item.hobby.length > 0 ? item.hobby.map((its, i) => i == item.hobby.length - 1 ? its : its + ', ') : 'None'
                                            }
                                        </p>
                                        {item.graduated && (
                                            <p className='bnktext'><PanToolIcon fontSize="small"/> Graduated</p>
                                        )}
                                        {!item.graduated && (
                                            <>
                                            Follow her:&nbsp;
                                            <a className='bnktext' href={item.follow[0]} target='_blank'><FacebookIcon/></a>
                                            <a className='bnktext' href={item.follow[1]} target='_blank'><InstagramIcon/></a>
                                            </>
                                        )}
                                    </>
                                    <hr />
                                    <a className='text-dark' href={item.ref} target='_blank'>Reference from BNK48 official Site</a>
                                    <br />
                                    {birthday && (
                                        <Button onClick={()=> PlaySong()} className='mt-3' color="primary" variant="contained">Click here see effect</Button>  
                                    )}
                                </div>
                        </Fade>
                    </Card>
                            </div>
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
                
            </div>
        </>
         );
    }
     
    export default MemDetail;