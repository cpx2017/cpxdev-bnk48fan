import React from 'react';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardActionArea, CardContent, CardMedia, Grow, Fade, CardHeader } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

import Topbar from '../img/topbar.png'
import Sidebar from '../img/sidemenu.png'
import Mems from '../img/members.png'
import Mem from '../img/member.png'
import Log from '../img/sidemenulogin.png'
import FSMemBad from '../img/fsmemberbadge.png'
import Kamiset from '../img/memberkami.png'
import FanDetail from '../img/FandomDetail.png'
import AddEv from '../img/addevent.png'


const HomeCom = ({fet}) => {
    const History = useHistory()
    const [Loaded1, setLoaded1] = React.useState(false);
    const [Loaded2, setLoaded2] = React.useState(false);
    const [onMonth, setMonth] = React.useState(false);
    const [birth, setBirth] = React.useState([]);
    const [samplemem, setMem] = React.useState([]);

  React.useEffect(() => {
    var root = am5.Root.new("chartdiv");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);


    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/
    var chart;
    if (window.innerWidth < 900) {
      chart = root.container.children.push(am5map.MapChart.new(root, {
        zoomX: false,
        zoomY: false,
        panX: 'translateX',
        panY: 'translateY',
        wheelX: false,
        wheelY: false,
        projection: am5map.geoMercator()
      }));
    } else {
      chart = root.container.children.push(am5map.MapChart.new(root, {
        zoomX: false,
        zoomY: false,
        panX: false,
        panY: false,
        wheelX: false,
        wheelY: false,
        projection: am5map.geoMercator()
      }));
    }
   

    var cont = chart.children.push(am5.Container.new(root, {
      layout: root.horizontalLayout,
      x: 20,
      y: 40
    }));


    // Add labels and controls
    cont.children.push(am5.Label.new(root, {
      centerY: am5.p50,
      text: "Map"
    }));

    var switchButton = cont.children.push(am5.Button.new(root, {
      themeTags: ["switch"],
      centerY: am5.p50,
      icon: am5.Circle.new(root, {
        themeTags: ["icon"]
      })
    }));

    switchButton.on("active", function() {
      if (!switchButton.get("active")) {
        chart.set("projection", am5map.geoMercator());
        chart.set("panX", "translateX");
        chart.set("panY", "translateY");
      }
      else {
        chart.set("projection", am5map.geoOrthographic());
        chart.set("panX", "rotateX");
        chart.set("panY", "rotateY");
      }
    });

    cont.children.push(am5.Label.new(root, {
      centerY: am5.p50,
      text: "Globe"
    }));

    var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow
    }));

    var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
    graticuleSeries.mapLines.template.setAll({
      stroke: root.interfaceColors.get("alternativeBackground"),
      strokeOpacity: 0.08
    });

    var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
    lineSeries.mapLines.template.setAll({
      stroke: root.interfaceColors.get("alternativeBackground"),
      strokeOpacity: 0.6
    });

    // destination series
    var citySeries = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    );

    citySeries.bullets.push(function() {
      var circle = am5.Circle.new(root, {
        radius: 5,
        tooltipText: "{title}",
        tooltipY: 0,
        fill: am5.color(0x00FF00),
        stroke: root.interfaceColors.get("background"),
        strokeWidth: 2
      });

      return am5.Bullet.new(root, {
        sprite: circle
      });
    });

    // arrow series
    var arrowSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    );

    arrowSeries.bullets.push(function() {
      var arrow = am5.Graphics.new(root, {
        fill: am5.color(0x000000),
        stroke: am5.color(0x000000),
        draw: function (display) {
          display.moveTo(0, -3);
          display.lineTo(8, 0);
          display.lineTo(0, 3);
          display.lineTo(0, -3);
        }
      });

      return am5.Bullet.new(root, {
        sprite: arrow
      });
    });

    var cities = [
      {
        id: "as",
        title: "Asia Region",
        geometry: { type: "Point", coordinates: [114.1694, 22.3193] },
      },
      {
        id: "aus",
        title: "Oceania Region",
        geometry: { type: "Point", coordinates: [144.9631, -37.840935] },
      },
      {
        id: "eu",
        title: "Europe Region",
        geometry: { type: "Point", coordinates: [2.3522, 48.8566] },
      },
      {
        id: "af",
        title: "Africa Region",
        geometry: { type: "Point", coordinates: [28.034088, -26.195246] },
      },
      {
        id: "us",
        title: "United State Region",
        geometry: { type: "Point", coordinates: [	-96.8089, 32.7767] },
      },
      {
        id: "su",
        title: "South America Region",
        geometry: { type: "Point", coordinates: [	-47.334938, -22.729958] },
      },
    ];

    citySeries.data.setAll(cities);

    // prepare line series data
    var destinations = [];
    // London coordinates
    var originLongitude = -0.1262;
    var originLatitude = 51.5002;

    am5.array.each(destinations, function (did) {
      var destinationDataItem = citySeries.getDataItemById(did);
      var lineDataItem = lineSeries.pushDataItem({ geometry: { type: "LineString", coordinates: [[originLongitude, originLatitude], [destinationDataItem.get("longitude"), destinationDataItem.get("latitude")]] } });

      arrowSeries.pushDataItem({
        lineDataItem: lineDataItem,
        positionOnLine: 0.5,
        autoRotate: true
      });
    })

    polygonSeries.events.on("datavalidated", function () {
      chart.zoomToGeoPoint({ longitude: -0.1262, latitude: 51.5002 }, 2);
    })
    chart.appear(50, 1);
  }, [])

    React.useEffect(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(fet + '/bnk48/getmemberbybirth?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
  .then(response => response.json())
  .then(data => {
    if (data.count == 0) {
        setMonth(true)
        fetch(fet + '/bnk48/getmemberbybirthmonth?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
  .then(response => response.json())
  .then(data => {
    setBirth(data.response)
        setLoaded1(true)
  });
    } else {
        setBirth(data.response)
        setLoaded1(true)
    }
  });
 const ran = Math.floor(Math.random() * 3) + 1;
 fetch(fet + '/bnk48/getmemberby?filter=gen&param=' + ran + '&tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
  .then(response => response.json())
  .then(data => {
      setMem(data.response)
      setLoaded2(true)
  });
    }, [])

    const ChangeRoute = (name) =>{
        History.push("/member?name=" + name.toLowerCase())
    }

    return ( 
        <>
        {window.innerWidth > 800 && (
          <div class="video-background">
           <Fade in={true} timeout={800}>
               <div class="">
               <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/myport/fav/bnk48.jpg" />
              </div>
              </Fade>
      </div>
        )}
             {window.innerWidth > 800 ? (
            <div className="cover mt-4">
            <Grow in={true} timeout={1000}>
          <Card className="col-md-4 m-5">
          <CardContent>
        <Typography variant="h5" component="h2">
          BNK48 Fan Space online Manual
        </Typography>
        <hr />
        <Typography color="textSecondary">
          What are feature which you can use and how to use it.
        </Typography>
      </CardContent>
            </Card>
            </Grow>
          </div>
          ) : (
        <div className="bnktheme pb-5 pt-2">
    <Grow in={true} timeout={1000}>
  <Card className="ml-2 mr-2">
      <CardContent>
      <Typography variant="h5" component="h2">
          BNK48 Fan Space online Manual
        </Typography>
        <hr />
        <Typography color="textSecondary">
          What are feature which you can use and how to use it.
        </Typography>
      </CardContent>
    </Card>
    </Grow>
  </div>
          )}
  
  <div className="stage p-5">
  <Card>
      <CardContent>
            <CardHeader title='What is BNK48 Fan Space' />
            <Typography className='ml-3' color="textSecondary">
                BNK48 Fan Space is online space for every BNK48 fans from around the world. You can join without any subscription cost.
            </Typography>
      </CardContent>
  </Card>
  <Card className='mt-5'>
      <CardContent>
            <CardHeader title='Behind of this site' />
            <Typography className='ml-3 mb-4' color="textSecondary">
                We use React JS for better front-end framework to load website dynamically and faster. And enhance system by region server which have 6 locations in the world. System will be detect the nearest
                region automatically by refer from IP address.
            </Typography>
            <div className='justify-content-center'>
              <div id="chartdiv"></div>
                {/* <img src='https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/CPXDev%20Studio%20Multi-Region%20Location.jpg' width={1000} /> */}
            </div>
      </CardContent>
  </Card>
  <Card className='mt-5'>
      <CardContent>
            <CardHeader title='Topbar' />
            <div className='text-center mb-3'>
                <img src={Topbar} width={1000} />
            </div>
            <Typography className='ml-3 mb-4' color="textSecondary">
                Topbar include 2 elements. On left corner is side menu button. You can choose page to change by click this button. On right corner is reduce graphic switcher. This site includes background video rendering from Youtube embeded.
                But lower spec devices maybe slow while video is rendering. You can switch on to close it.
            </Typography>
            
      </CardContent>
  </Card>
  <Card className='mt-5'>
      <CardContent>
            <CardHeader title='Side Menu' />
            <div className='row'>
            <div className='text-center col-md-3'>
                <img src={Sidebar} />
            </div>
            <Typography className='ml-3 col-md' color="">
                Side Menu is main menu to see all contents of this website. You can see description of menu choices below.
                <ListItem>
                  <ListItemText primary='Home' secondary='Main page of site' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Members' secondary='All BNK48 members list' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='News' secondary='News update about BNK48 from popular agency news collected by Google News.' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Music' secondary='Latest BNK48 single and album Music Videos from BNK48 Youtube Channel.' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Official Update' secondary='Latest news and announcement from BNK48 from BNK48 Official. All metadatas will link from Twitter.' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Fandom Event' secondary='You can see and share BNK48 special fan event by part of BNK48 member. You need to Login as Google account to use this content feature.' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='BNK48 12th General Election' secondary='Special Event - You can follow about The third of BNK48 General Election. Such as timeline event, Candidate Statistic, Election result.' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='API' secondary='Documentation for unofficial BNK48 Members Public API.' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Region' secondary='Region which is connected.' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Login as Google Account' secondary='Login to Fan Space member with Google Account to use exclusive feature (Such as Fandom Event, set Kami-Oshi).' />
                </ListItem>
            </Typography>
            </div>
      </CardContent>
  </Card>
  <Card className='mt-5'>
      <CardContent>
            <CardHeader title='Homepage' />
            <Typography className='ml-3 mb-4' color="textSecondary">
                In homepage you will see birthday of member in today. If system is not found any member birth in today. It will show member have birthday in this month. Another feature is show sample of BNK48 members (random by generation 1 to 3).
            </Typography>
      </CardContent>
  </Card>
  <Card className='mt-5'>
      <CardContent>
            <CardHeader title='Members' />
            <div className='text-center mb-3'>
                <img src={Mems} width={1000} />
            </div>
            <Typography className='ml-3 mb-4' color="textSecondary">
               You will see all BNK48 members. However, you can search member or sorting members by generation or stage teams. And click to member card to see more profile detail.
            </Typography>
      </CardContent>
  </Card>
  <Card className='mt-5'>
      <CardContent>
            <CardHeader title='Member Detail' />
            <div className='text-center mb-3'>
                <img src={Mem} width={1000} />
            </div>
            <Typography className='ml-3 mb-4' color="textSecondary">
             You can see full member profile here. In addition, you will see effect when today is member's birthday. (Ex. If today is Cherprang BNK48's birthday. You will see button to see effect to celebrate her.)
            </Typography>
      </CardContent>
  </Card>
  <Card className='mt-5'>
      <CardContent>
            <CardHeader title='Fan Space Member Benefit' subheader='Exclusive feature for Fan Space Member' />
            <Typography className='ml-3 mb-4' color="textSecondary">
               You can become to Fan Space member by login as Google account on below of Side menu.
               <div className='text-center mb-3'>
                <img src={Log} />
            </div>
            </Typography>
            <Typography className='ml-3 mb-4' color="textSecondary">
               After that, you will see profile avatar like this.
               <div className='text-center mb-3'>
                <img src={FSMemBad} />
            </div>
            Notes: After you choose your Kami-Oshi member who you love. You will see your Kami-Oshi member image on right-buttom of your profile image.
            </Typography>
            <div>
                <CardHeader title='1. Set or change member as your Kami-Oshi' />
                <div className='text-center mb-3'>
                    <img src={Kamiset} width={900} />
                </div>
                <Typography className='ml-3 mb-4' color="textSecondary">
                 Go to "Members" tab. And search or find member which you love. Then click member to see profile. After that, you can see this button. Finally, you should wait until page is refreshed to done.
                </Typography>
            </div>
            <div>
                <CardHeader title='2. Fandom Event (Fanroom Page)' />
                <Typography className='ml-3 mb-4' color="textSecondary">
                 You need to login first before use this exclusive feature. and click Fandom Event tab in side menu. Then choose your member which you join.
                </Typography>
                 <div className='text-center mb-3'>
                    <img src={FanDetail} width={1000} />
                </div>
                <Typography className='ml-3 mb-4' color="textSecondary">
                 You will see all event of member fanclub both incoming and current event beolow of member profile card. In addition, you can request to add new event of member by click "Request Event" button
                </Typography>
            </div>
            <div>
                <CardHeader title='3. Add Fandom Event' />
                 <div className='text-center mb-3'>
                    <img src={AddEv} width={1000} />
                </div>
                <Typography className='ml-3' color="textSecondary">
                 Fill all inputs which required (Image upload and reference link is optional). We recomended that use English language to share event for all person with international fanclub. And read rules carefully for benefit with your event form is aprroved. Then click "Send Form".
                </Typography>
                <Typography className='ml-3 mb-4' color="textSecondary">
                 After send event request form. We will check and approve this form request about 1-3 days. And we will reply status to your email. After event request has been approved, you will see your event in fanroom page.
                </Typography>
            </div>
      </CardContent>
  </Card>
  </div>
        </>
    );
}
 
export default HomeCom;