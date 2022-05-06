import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, TextField, Zoom, MenuItem, Button, Backdrop } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
const Add = ({fet, setSec}) => {
    const classes = useStyles();
    const [arr, setArr] = React.useState([]); 
    const [name, setName] = React.useState(''); 
    const [desc, setDesc] = React.useState(''); 
    const [tstart, setStart] = React.useState(''); 
    const [tend, setEnd] = React.useState(''); 
    const [link, setLink] = React.useState(''); 
    const [img, setImg] = React.useState(''); 
    const [current, setCur] = React.useState('-'); 

    const [load, setLoad] = React.useState(false); 

    const ImgHand = (e) => {
        const input = e
        const file = input.target.files[0]
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
              if (file.type.includes('jpeg') || file.type.includes('png') && file.size < 1572864) {
                setImg(e.target.result)
              } else {
                Swal.fire({
                    title: 'File type is unsupport or too large.',
                    text: "Files type is not support or too large. Please upload only image file (JPG, JPEG or PNG) and file size up to 1.5 MB.",
                    icon: 'warning',
                    iconColor: 'rgb(203, 150, 194)'
                  })
                e.target.value = ''
              }
            }
            reader.readAsDataURL(file); // convert to base64 string
        }
    }

    React.useEffect(() => {
        let temp = []
        fetch(fet + '/bnk48/memberlist?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'get'
        })
            .then(response => response.json())
            .then(data => {
                const res = data.response
                for(var i = 0; i < res.length; i++) {
                    temp.push(
                        {
                            label: res[i].name + ' BNK48',
                            value: res[i].name.toLowerCase()
                        }
                    );
                }
                setArr(temp)
                var url_string = window.location.href; 
                var url = new URL(url_string);
                var c = url.searchParams.get("name");
                if (c != null && c != "") {
                    setCur(c)
                    setSec('Add event for ' + capitalizeFirstLetter(c))
                }
            }).catch(() => {
                setArr([])
                setSec('Add fandom')
            })
    }, [])

    const onSub = (e) => {
        e.preventDefault()
        if (moment(tstart).unix() >= moment(tend).unix()) {
            Swal.fire({
                title: 'File type is unsupport or too large.',
                text: "Please check event start datetime and end datetime and try again.",
                icon: 'warning',
                iconColor: 'rgb(203, 150, 194)'
              })
            return false
        }
        if (current == '-') {
            Swal.fire({
                title: 'BNK48 member cannot tagged',
                text: "Please choose hosted BNK48 member for this event.",
                icon: 'warning',
                iconColor: 'rgb(203, 150, 194)'
              })
            return false
        }

        setLoad(true)
        fetch(fet + '/bnk48/getmember?name=' + current +'&tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
        .then(response => response.json())
        .then(dm => {
            if (dm.response.graduated == true) {
                Swal.fire({
                    title: dm.response.name +" BNK48 is graduated",
                    icon: 'error',
                    text: 'This member is graduated. You cannot add fandom event for this member anymore.',
                  })
                  setLoad(false)
                return false
            } else {
                const Obj = {
                    title: name,
                    desc: desc,
                    member: current,
                    link: link,
                    start: moment(tstart).utc().format("yyyy-MM-DD HH:mm:ss"), // System convert to UTC for easy convert to different time zone
                    end: moment(tend).utc().format("yyyy-MM-DD HH:mm:ss"),
                    img: img,
                    name: JSON.parse(localStorage.getItem('glog')).name,
                    mail: JSON.parse(localStorage.getItem('glog')).email
                  }
                  fetch(fet + '/bnk48/request', {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(Obj),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.errorcode == 0) {
                            Swal.fire({
                                title: 'Event form has been sent!',
                                text: "Event form is sent successfully, Please check email after today about 3 days or less to approving event.",
                                icon: 'success',
                              }).then(() => {
                                window.location.href = "/fandomroom?name=" + current
                              })
                        } else {
                            alert("System will be temporary error for a while. Please try again")
                        }
                        setLoad(false)
                    })
                    .catch((error) => {
                        alert("System will be temporary error for a while. Please try again")
                        setLoad(false)
                    });
            }
        }).catch(() => {
            setArr([])
            setLoad(false)
        })
    }


    return ( 
        <div className="stage pt-5 pb-2">
        <h3 className='text-center'>Add Fandom Event</h3>
        <br />
        <Card className='m-3'>
        <ul class="list-group">
            <li class="list-group-item active">Condition of request BNK48 fandom event announcement</li>
            <li class="list-group-item">1. Please fill out the form truly.</li>
            <li class="list-group-item">2. All requests form will be approved for 1-3 days. If your event is pass away. We will not take any responsibility.</li>
            <li class="list-group-item">3. Do not use profanity, defamation. or cause hatred or division words. We can banned your request everytime when we found break a rule(s).</li>
            <li class="list-group-item">4. Uploaded image should be related to event title and description.</li>
            </ul>
        </Card>
        <Card className={window.innerWidth > 600 ? "m-5" : 'm-2'}>
            <form className='row m-1' onSubmit={onSub}>
                <div className='col-md-8'>
                <TextField
                        label="Event Name"
                        required={true}
                        fullWidth={true}
                        value={name}
                        className="mb-3 mt-3"
                        onChange={(e) => setName(e.target.value)}
                        />
                </div>
                <div className='col-md-10'>
                <TextField
                        multiline={true}
                        required={true}
                        label="Event Description"
                        fullWidth={true}
                        maxRows={30}
                        value={desc}
                        className="mb-3"
                        onChange={(e) => setDesc(e.target.value)}
                        />
                </div>
                <div className='col-md-3'>
                    <TextField
                        required={true}
                        fullWidth={true}
                        select
                        label="Choose Member"
                        helperText='You can change member name'
                        value={current || '-'}
                        className="mb-3"
                        onChange={(e) => setCur(e.target.value)}
                        >
                            {arr.length > 0 && arr.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                </div>
                <div className='col-md-3'>
                <TextField
                        label="Add event link"
                        value={link}
                        placeholder='More event description from Facebook, Instagram, Line square or Twitter link'
                        fullWidth={true}
                        onKeyPress={() => {
                            if (!link.includes("https://")) {
                                let temp = link;
                                temp = temp.replace (/^/,'https://');
                                setLink(temp)
                            }
                        }}
                        className="mb-3"
                        type="url"
                        onChange={(e) => setLink(e.target.value)}
                        />
                </div>
                <div className='col-md-3'>
                <TextField
                        value={tstart}
                        required={true}
                        fullWidth={true}
                        className="mb-3"
                        type="datetime-local"
                        defaultValue={new Date().toString()}
                        variant="standard"
                        helperText="Event Start date"
                        onChange={(e) => setStart(e.target.value)}
                        />
                </div>
                <div className='col-md-3'>
                <TextField
                        label=''
                        helperText="Event End date"
                        value={tend}
                        fullWidth={true}
                        className="mb-3"
                        type="datetime-local"
                        variant="standard"
                        onChange={(e) => setEnd(e.target.value)}
                        />
                </div>
                <div className='col-md-12'>
                <input
                    id="up"
                    type="file"
                    className="d-none"
                    onChange={(e) => ImgHand(e)}
                />
                <label htmlFor="up">
                    <Button variant="contained" color="primary" component="span">
                    Upload Event Image (Optional)
                    </Button>
                    {img != '' && (
                        <CheckIcon className="ml-1 text-success" />
                    )}
                </label>
                <br />
                {img != '' && (
                       <img src={img} width="200px" />
                    )}
                </div>
                    <br />
                    <div className="text-center col-md-12 mt-5 mb-2">
                        <Button type="submit" variant="outlined" color="primary">Send Form</Button>
                    </div>
            </form>
        </Card>
        <Backdrop className={classes.backdrop} open={load}>
            <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" />
        </Backdrop>
     </div>
     );
}
 
export default Add;