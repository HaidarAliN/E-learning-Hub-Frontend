import { Box, Card, CardContent, CardHeader, Container, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import React from 'react'
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const useStyles = makeStyles({
    card:{
        marginTop: "2%"
    },
    cardbody:{
        borderWidth: "1px",
        borderLeft: '.25rem solid !important',
        borderColor: "#5a5c69 !important"
    },
  
})

export default function Dashboard() {
    const classes = useStyles();
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    return (
        <div>
            <ThemeProvider theme={theme}>
            <Typography  component="h3"  variant="h4" >
                <Box color="text.primary">
                Welcom Haidar Ali
                </Box>
            </Typography>
             <Typography  component="h6" variant="body1" >
                <Box color="text.secondary">
                Here you can check your dash board
                </Box>
            </Typography>
            </ThemeProvider>
            <div className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={6} lg={4} key={1}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="COURSES"
                            action={
                                <IconButton>
                                <MenuBookIcon/>
                                </IconButton>
                            }
                        />
                        <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            25
                        </Typography>
                        </CardContent>
                    </Card>
                </div>
                </Grid>
                <Grid item xs={12} md={6} lg={4} key={2}>
                <div>
                    <Card elevation={1} className={classes.cardbody}>
                        <CardHeader
                            title="STUDENTS"
                            action={
                                <IconButton>
                                  <SupervisorAccountIcon/>
                                </IconButton>
                              }
                        />
                        <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            400
                        </Typography>
                        </CardContent>
                    </Card>
                </div>
                </Grid>
                <Grid item xs={12} md={6} lg={4} key={3}>
                <div>
                    <Card elevation={1} className={classes.cardbody}>
                        <CardHeader
                            title="FINISHED CLASSES"
                            action={
                                <IconButton>
                                    <DoneAllIcon/>
                                </IconButton>
                            }
                        />
                        <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            30%
                        </Typography>
                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>
            </div>
        </div>
    )
}
