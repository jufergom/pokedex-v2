import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    image: {
        width: '100%',
        height: 'auto'
    }
}));

export default function Home() {
    const classes = useStyles();
    const history = useHistory();

    const goToPokedex = () => {
        history.push("/Pokedex");
    }
    

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img 
                    src="https://raw.githubusercontent.com/jufergom/pokedex/master/src/img/pokemon_logo.png"
                    className={classes.image} 
                    alt="pokemon"
                />
                <Typography component="h1" variant="h5">
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={goToPokedex}
                    >
                        Enter pokedex
                    </Button>
                </Typography>
            </div>
        </Container>
    );
}