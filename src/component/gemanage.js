import React from 'react';
import { Button, TextField, MenuItem, Card, CardContent, FormControlLabel, Checkbox, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const GeMana = ({fet}) => {
    const classes = useStyles();
    const [ done, setDone ] = React.useState(false);
    const [ cgmon, setCg ] = React.useState(false);

    const [list, setList] = React.useState([]); 
    const [ Tar, setTar ] = React.useState('-');
    const [mem, setMem] = React.useState([]); 
    const [ MemTar, setMemTar ] = React.useState('-');
    const [Score, setScore] = React.useState(''); 
    const [Str, setStr] = React.useState(''); 

    const [load, setLoad] = React.useState(false); 

    const LoadMem = (val) => {
        setCg(val)
        let temp = []
        if (val == false) {
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
    }

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
                    LoadMem(false)
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
            LoadMem(false)
        }
      }, [])

    const sub = (e) => {
        e.preventDefault()
        if (Tar == '-') {
            alert("Please choose Election rank number.")
            return false
        }
        if (MemTar == '-') {
            alert("Please choose hosted BNK48 member for this event.")
            return false
        }
        setLoad(true)
        const Obj = {
            rank: Tar,
            name: MemTar,
            sc: parseInt(Score)
          }
          fetch(fet + '/bnk48/addelec', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(Obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            })
            .then(response => response.text())
            .then(data => {
                if (data == "true") {
                    alert("Election result update success.")
                } else {
                    alert("Ranking is exist.")
                }
                setLoad(false)
                setTar("-")
                setMemTar("-")
                setScore("")
            })
            .catch((error) => {
                alert("System will be temporary error for a while. Please try again")
                setLoad(false)
                setTar("-")
                setMemTar("-")
                setScore("")
            });
    }

    const sub2 = (e) => {
        e.preventDefault()
        if (Str.length != 11) {
            alert("Please add youtube ID.")
            setStr("")
            return false
        }
        setLoad(true)
          fetch(fet + '/bnk48/setstream?uri=' + Str, {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            })
            .then(response => response.text())
            .then(data => {
                if (data == "true") {
                    alert("Update stream success.")
                } else {
                    alert("Error to update.")
                }
                setLoad(false)
                setStr("")
            })
            .catch((error) => {
                alert("System will be temporary error for a while. Please try again")
                setLoad(false)
                setStr("")
            });
    }

    if (done) {
      return ( 
          <>
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
                        onChange={(e) => LoadMem(e.target.checked)}
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
            <hr />
            <form autoComplete='off' onSubmit={sub2}>
            <CardContent className='row pl-5 pr-5'>
                <div className='col-md-8'>
                    <TextField
                        required={true}
                        label="Add Youtube Stream ID"
                        value={Str}
                        fullWidth={true}
                        className="mb-3"
                        type="text"
                        onChange={(e) => setStr(e.target.value)}
                    />
                </div>
                <Button color='primary' type='submit'>Update</Button>
            </CardContent>
            </form>
        </Card>
        <Backdrop className={classes.backdrop} open={load}>
            <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="50px" />
        </Backdrop>
        </>
     );
    }
    return null
}
 
export default GeMana;