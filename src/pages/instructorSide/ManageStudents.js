import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import LayoutCourse from '../../components/layouts/LayoutCourse'
import RTable from '../../components/RTable'
import BASE_API_URL from '../../services/BaseUrl'
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    card:{
        marginBottom:"3%"
    },
 
}));



export default function ManageStudents() {
    const classes = useStyles();
    const [data, setData] = useState(null);
    useEffect(async () => {
        const access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNDE3MjcxOSwiZXhwIjoxNjM0MTc2MzE5LCJuYmYiOjE2MzQxNzI3MTksImp0aSI6IkFlcUVzcU9wRDZPSUh6bmUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.6FZRo-arwrvPBmv0X-XbfiW2G3b7678DwtK6BbO5lpc";
        const response = await axios.get(`${BASE_API_URL}/api/instructor/course/get-student-info/1`,
          {headers:{
            'Authorization' : `Bearer ${access_token}`
          }}
        );
        const data_fetched = response.data;
        setData(data_fetched);
        }, []);

        const handleRemove = (id) => {
            console.log(id);
        }

        const handlePending = (id) => {
            console.log(id);
        }

    return (
    <LayoutCourse title="qwe">

        <div>
            <Typography className={classes.card}  component="h2"  variant="h4" >
                Manage Students
            </Typography>

            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={1}>
            {data && <RTable data={data} handleRemove={handleRemove} handlePending={handlePending}/>}
            </Grid>
            </Grid>
        </div>
        </LayoutCourse>

    )
}

