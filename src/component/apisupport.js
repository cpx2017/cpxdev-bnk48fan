import React from 'react';
import { Card, CardContent, CardHeader, CardActionArea} from '@material-ui/core'

const API = ({setSec}) => {
    const [ stat, setstat] = React.useState(null);
    const APITest = () => {
      setSec('API Service')
        fetch('https://api.cpxdev.tk/Home/status')
        .then(function () {
            setSec('API Service [System health is good]')
            setstat(true)
        }).catch(function () {
          setSec('API Service [System maybe lost]')
          // handle error
          setstat(false)
        });
      }
      React.useEffect(() => {
        APITest();
      }, [])
    return ( 
        <Card>
            <CardContent className={window.innerWidth > 700 ? 'pl-5 pr-5' : 'pl-2 pr-2'}>
                <CardHeader title='API Service' subheader='Unofficial BNK48 Members Public API' />
                <hr />
                <p>We also serve BNK48 members profile on Public API service. Member profile contents which you see in website are using this service also. Please see our <a href='https://apicenter.cpxdev.tk/bnk48' target='_blank'>documentation</a> here</p>
                <hr />
                <CardActionArea className={stat === true ? 'text-success' : stat === false ? 'text-danger' : ''}>
                    API Service Status: {stat === true ? 'Systems are great.' : stat === false ? 'Systems is temporary down or under maintenance.' : 'Checking API status'}
                </CardActionArea>
            </CardContent>
        </Card>
     );
}
 
export default API;