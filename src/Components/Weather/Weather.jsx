import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import fetchApi from '../../Env';
import { createContext } from 'react';
import WDetails from '../WeatherDetails/WDetails';
import CircularProgress from '@mui/material/CircularProgress';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Context = createContext('');

function BasicTabs() {
  
  const [value, setValue] = useState("OTTAWA");
  const [data,setData]= useState(null)

  const getEnvironmentData=(city)=>{
    let data=fetchApi(city).then(res=>{
        if(res.cod !=200){
            return [];
        }
        const today = new Date(res.list[0].dt_txt);

        const result = res.list.reduce((result, val) => {
            const date = new Date(val.dt_txt); 
            const index = date.getDate() - today.getDate();
            let dateData = result[index] || {}; 
            if(date.getHours() === today.getHours()){
                dateData = {...dateData, ...val};
              }else {
                const history = dateData.history || [];
                history.push(val);
                dateData.history = history;
              }
              result[index] = dateData;
              return result
          }, []);
          
        setData(result)
    })
  }

  useEffect(() => {
   getEnvironmentData("OTTAWA")
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    getEnvironmentData(newValue)
  };

  const tabsData=[  {
    id: 1,
    label: 'OTTAWA',
    value:'OTTAWA'
  },
  {
    id: 2,
    label: 'MOSCOW',
    value:'MOSCOW'
  },
  {
    id: 3,
    label: 'TOKYO',
    value:'TOKYO'
  }

]

  return (
    <Box className='detailsWrapper'>
      <Box className='tabs'>
        <Tabs TabIndicatorProps={{style: {backgroundColor: "rgb(235,243,251)"}}} value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          {/* <Tab label="OTTAWA" value="OTTAWA"  />
          <Tab label="MOSCOW" value="MOSCOW" />
          <Tab label="TOKYO" value="TOKYO"  /> */}
          {tabsData.map((tabInfo) => (
  <Tab
    label={tabInfo.label} 
    value={tabInfo.value}
    key={tabInfo.id}
  />
))}
        </Tabs>
      </Box>
       <Box className='weatherDescription'>
        {data ? <WDetails data={data}/>:
        <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
        }
        {/* <WDetails data={data}/> */}
       </Box>
    </Box>
  );
}

export default BasicTabs;



