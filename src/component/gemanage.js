import React from 'react';
import { Button, TextField, MenuItem, Card, CardContent, FormControlLabel, Checkbox } from '@material-ui/core';

const GeMana = ({fet}) => {
    const [ done, setDone ] = React.useState(false);
    const [ cgmon, setCg ] = React.useState(false);

    const [list, setList] = React.useState([]); 
    const [ Tar, setTar ] = React.useState('-');
    const [mem, setMem] = React.useState([]); 
    const [ MemTar, setMemTar ] = React.useState('-');
    const [Score, setScore] = React.useState(''); 

    React.useEffect(() => {
        let temp = []
        if (cgmon == false) {
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
                    setMem(temp)
                })
        } else {
            fetch(fet + '/cgm48/memberlist?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
                method :'get'
            })
                .then(response => response.json())
                .then(data2 => {
                    const res = data2.response
                    for(var i = 0; i < res.length; i++) {
                        temp.push(
                            {
                                label: res[i].name + ' CGM48',
                                value: res[i].name.toLowerCase()
                            }
                        );
                    }
                    setMem(temp)
                })
        }
    })

    const ListSt = () => {
        let temp = []
        const Number = 64
        for (let i = 0; i < Number; i++) {
            const ob = {
                label: i + 1,
                value: i + 1
            }
            temp.push(ob)
        }
        setList(temp)
    }

    React.useEffect(() => {
        if (sessionStorage.getItem("dashad") == null) {
          let person = prompt("Please enter identity password", "");
          if (person == null || person == "") {
              alert('Access denied')
              window.location.href = "/"
          } else {
            fetch(fet + '/bnk48/authcheck?nm=' +btoa(person), {
              method: 'POST', // or 'PUT'
            })
              .then(response => response.text())
              .then(data => {
                  if (data == "true") {
                    sessionStorage.setItem("dashad", "")
                    setDone(true)
                    ListSt()
                  } else {
                    alert('Access denied')
                    window.location.href = "/"
                  }
              })
              .catch((error) => {
                alert('Server cannot be respond. Access denied')
                window.location.href = "/"
              });
          }
        } else {
            sessionStorage.setItem("dashad", "")
            setDone(true)
            ListSt()
        }
      }, [])

    const sub = (e) => {
        e.preventDefault()
        alert()
    }

    if (done) {
      return ( 
        <Card>
            <form autoComplete='off' onSubmit={sub}>
            <CardContent className='row pl-5 pt-5 pr-5'>
                <div className='col-md-3'>
                    <TextField
                        required={true}
                        fullWidth={true}
                        select
                        label="Choose Rank Number"
                        value={Tar || '-'}
                        className="mb-3"
                        onChange={(e) => setTar(e.target.value)}
                        >
                            {list.length > 0 && list.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                </div>
                <div className='col-md-3'>
                    <TextField
                        required={true}
                        fullWidth={true}
                        select
                        label="Choose Member"
                        value={MemTar || '-'}
                        className="mb-3"
                        onChange={(e) => setMemTar(e.target.value)}
                        >
                            {mem.length > 0 && mem.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                </div>
                <div className='col-md-auto mt-2'>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={cgmon}
                        onChange={(e) => setCg(e.target.checked)}
                        color="primary"
                    />
                    }
                    label="Choose CGM"
                />
                </div>
                <div className='col-md'>
                    <TextField
                        required={true}
                        label="Add score"
                        value={Score}
                        fullWidth={true}
                        className="mb-3"
                        type="number"
                        onChange={(e) => setScore(e.target.value)}
                    />
                </div>
                <Button color='primary' type='submit'>Update</Button>
            </CardContent>
            </form>
        </Card>
     );
    }
    return null
}
 
export default GeMana;