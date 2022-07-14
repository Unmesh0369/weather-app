import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Moment from "react-moment";
import "moment-timezone";
import "./WDetails.css";
import React from "react";

const WDetails = (props) => {
  console.log(props.data);
  return (
    <Paper square className="paper">
      <Grid item container>
        <Grid
          container
          item={true}
          className="currentWeather"
        >
          <CurrentWeather prediction={props.data[0]} />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
      >
        <FutureWeather prediction={props.data} />
      </Grid>
    </Paper>
  );
};

const CurrentWeather=(props)=>{
      
  const weather = (props && props.prediction && props.prediction.weather.length > 0 && props.prediction.weather[0])?props.prediction.weather[0]:""
  return (
    <Grid
      container
      className="currentWeather"
      item
      xs={10}
    >
      <Grid item xs={12} className="todayText" >
        <Typography>Today</Typography>
      </Grid>
      <Grid item xs={4}>
        <TemparatureIcon iconId={weather.icon} size={"icon"}/>
      </Grid>
      <Grid item xs={3}>
        <h1 className="temp" id="h1Temp">
          <Temparature temp={(props.prediction.main || {}).temp} />
        </h1>
        <p className="weatherDescription">{weather.description}</p>
      </Grid>
    </Grid>
  );
}

const Temparature=(props)=>{
  console.log(props);
  return (
    <span className="temp">
      {Math.round(props.temp)}
      <span>&#176;</span>
    </span>
  );
}

const TemparatureIcon=(props)=>{
    console.log(props)
  return <img src={`http://openweathermap.org/img/w/${props.iconId}.png`} alt='weather-icon' className={props.size?'currentTempIcon':''}/>;
}

const FutureWeather=(props)=>{
    console.log(props.prediction)
  return props.prediction.slice(1).map(
    (data) =>
      data.main && (
        <Grid
          container
          key={data.id}
          item
          xs={3}
          className="futureWeather"
        >
          <Grid container className="futureDays">
            <Moment format="ddd">{new Date(data.dt_txt)}</Moment>
          </Grid>
          <Grid>
            <TemparatureIcon iconId={data.weather[0].icon} />
          </Grid>
          <Grid
            container
            item
            className="futureTemp"
          >
            <h5 className="temp">
              <Temparature temp={data.main.temp} />
            </h5>
          </Grid>
        </Grid>
      )
  );
}

export default WDetails;
