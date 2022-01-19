import React from 'react';
import { Button } from '@material-ui/core';

const Mana = () => {
    const [url1, setU1] = React.useState(''); 
    const [url2, setU2] = React.useState(''); 

    React.useEffect(() => {
        var url_string = window.location.href; 
                var url = new URL(url_string);
                setU1(url.searchParams.get("point1"));
                setU2(url.searchParams.get("point2"));
    }, [])
    return ( 
        <div className='text-center mt-5'>
            <Button color="primary" href={decodeURI(url1)}>Confirm</Button>
            <Button color="primary" href={decodeURI(url2)}>Decide</Button>
        </div>
     );
}
 
export default Mana;