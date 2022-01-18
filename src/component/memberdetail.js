import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Fade, Grow, CardMedia, Typography, Zoom, Link, Breadcrumbs } from '@material-ui/core';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import CakeIcon from '@material-ui/icons/Cake';
import GroupIcon from '@material-ui/icons/Group';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PanToolIcon from '@material-ui/icons/PanTool';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    const MemDetail = ({fet}) => {
        const History = useHistory()
        const [mem, setmem] = React.useState('');
        const [arr, setArr] = React.useState([]); 
        const [Loaded, setLoaded] = React.useState(false);

        React.useEffect(() => {
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
                                    <hr />
                                    <>
                                        <h6><LocationOnIcon fontSize="small"/> {item.province}</h6>
                                        <h6><CakeIcon fontSize="small"/> {item.birthday}</h6>
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
                                </div>
                        </Fade>
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
                
            </div>
        </>
         );
    }
     
    export default MemDetail;