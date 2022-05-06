import React from 'react';
import { Button } from '@material-ui/core';

const Mana = ({fet}) => {
    const [url1, setU1] = React.useState(''); 
    const [url2, setU2] = React.useState('');
    const [ done, setDone ] = React.useState(false);

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
                  var url_string = window.location.href; 
                  var url = new URL(url_string);
                  if (url.searchParams.get("point1") == null || url.searchParams.get("point2") == null) {
                    alert("Check url path")
                    window.location.href = "/"
                  } else {
                    setU1(url.searchParams.get("point1"));
                    setU2(url.searchParams.get("point2"));
                    sessionStorage.setItem("dashad", "")
                    setDone(true)
                  }
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
        var url_string = window.location.href; 
        var url = new URL(url_string);
        if (url.searchParams.get("point1") == null || url.searchParams.get("point2") == null) {
          alert("Check url path")
          window.location.href = "/"
        } else {
          setU1(url.searchParams.get("point1"));
          setU2(url.searchParams.get("point2"));
          sessionStorage.setItem("dashad", "")
          setDone(true)
        }
      }
    }, [])
    if (done) {
      return ( 
        <div className='text-center mt-5'>
          <h3>Confirm Fandom Post Check</h3>
            <Button color="primary" href={decodeURI(url1)}>Confirm</Button>
            <Button color="primary" href={decodeURI(url2)}>Decide</Button>
        </div>
     );
    }
    return null
}
 
export default Mana;