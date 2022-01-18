import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, TextField, Zoom, MenuItem, Button, ButtonGroup } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const Add = ({fet}) => {
    const [arr, setArr] = React.useState([]); 
    const [name, setName] = React.useState(''); 
    const [desc, setDesc] = React.useState(''); 
    const [tstart, setStart] = React.useState(''); 
    const [tend, setEnd] = React.useState(''); 
    const [link, setLink] = React.useState(''); 
    const [img, setImg] = React.useState(''); 
    const [current, setCur] = React.useState('-'); 

    const ImgHand = (e) => {
        const input = e
        const file = input.target.files[0]
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
              if (file.type.includes('jpeg') || file.type.includes('png') && file.size < 1572864) {
                setImg(e.target.result)
              } else {
                alert("Files type is not support or too large. Please upload only image file (JPG, JPEG or PNG) and file size up to 1.5 MB.")
                e.target.value = ''
              }
            }
            reader.readAsDataURL(file); // convert to base64 string
        }
    }

    React.useEffect(() => {
        let temp = []
        temp.push(
            {
                label: 'Choose member to reference with this event',
                value: '-'
            }
        );
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
                }
            }).catch(() => {
                setArr([])
            })
    }, [])

    const onSub = () => {
        alert()
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
                        onInvalid={(e) => e.target.setCustomValidity('Please enter event name')}
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
     </div>
     );
}
 
export default Add;