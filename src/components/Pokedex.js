import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function Pokedex() {
    const classes = useStyles();
    const history = useHistory();

    const [pokemonList, setPokemonList] = useState([]); //list of fetched pokemon (only names)
    const [pokemons, setPokemons] = useState([]); //individual pokemons info
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextUrl, setNextUrl] = useState('');

    useEffect(() => {
        const fetchKantoPokemon = () => {
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    setPokemonList(res.results);
                    setNextUrl(res.next);
                }).catch(err => console.log(err))
        }

        fetchKantoPokemon();
    }, [url]);

    useEffect(() => {
        const fetchPokemonData = (pokemon) => {
            let url = pokemon.url;
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    let type1;
                    let type2;
                    if(res.types.length === 2) {
                        type1 = res.types[1].type.name;
                        type2 = res.types[0].type.name;
                    }
                    else {
                        type1 = res.types[0].type.name;
                        type2 = 'none'
                    }
                    let newPokemon = {
                        id: res.order,
                        name: res.name,
                        sprite: res.sprites.front_default,
                        type1: type1,
                        type2: type2
                    };
                    setPokemons(p => ([...p, newPokemon]));
                    //setPokemons([...pokemons, newPokemon]);
                }).catch(err => console.log(err))
        }

        pokemonList.forEach(pokemon => {
            fetchPokemonData(pokemon);
        });
    }, [pokemonList]);
    
    const goToNextPage = () => {
        setUrl(nextUrl);
    }

    const goToHome = () => {
        history.push('/');
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon className={classes.icon} />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button alignItems="flex-start" variant="contained" color="primary" onClick={goToHome}>
                                Home
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Pokedex
                    </Typography>
                </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {pokemons.map(pokemon => (
                        <Grid item key={pokemon.id} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={pokemon.sprite}
                                    title={pokemon.name}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {pokemon.name}
                                    </Typography>
                                    <Typography>
                                        Types:
                                        <ul>
                                            <li>{pokemon.type1}</li>
                                            <li>{pokemon.type2}</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={goToNextPage}>
                            See more
                        </Button>
                    </Grid>
                </Grid>
            </div>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Pokedex by jufergom
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Made using <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">Pokemon API pokeapi</a>
                </Typography>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}