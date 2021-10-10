import React, {useState, useEffect} from 'react' 
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles, TextField } from '@material-ui/core'
import validator from 'validator'

const useStyles = makeStyles({
 field: {
    marginTop: "2%",
    marginBottom: "2%"
  }
})

export default function Create({items}) {
  const classes = useStyles();
  const [firstrender, setfirstrender] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // console.log({items});

  const handleSubmit = () => {
    setEmailError(false);
    setPasswordError(false);
    if(!validator.isEmail(email)){
      setEmailError(true);
    }
    if(password.length<3){
      setPasswordError(true);
    }
  }

  useEffect(() => {
    if(!emailError && !passwordError && !firstrender){
      console.log("submit");
    }
    setfirstrender(false);
  }, [emailError,passwordError]);


  return (
    <Container size="sm">
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
      >
        Create a New Note
      </Typography>

    <form noValidate autoComplete="off" >
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        className={classes.field}
        label="Emaill"
        variant="outlined"
        color="primary"
        fullWidth
        required
        error={emailError}
        placeholder="ex: xyz@Ehub.edu"
      />
      <TextField
        className={classes.field}
        onChange={(e) => setPassword(e.target.value)}
        label="password"
        variant="outlined"
        color="primary"
        type="password"
        error={passwordError}
        fullWidth
        required
        placeholder="ex: xyz@Ehub.edu"
      />
       <Button
        className={classes.btn}
        color="secondary" 
        variant="contained"
        onClick={handleSubmit}
        endIcon={<KeyboardArrowRightIcon />}>
        Submit
      </Button>
    </form>

     

      
    </Container>
  )
}