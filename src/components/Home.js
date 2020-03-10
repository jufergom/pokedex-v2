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

export default function Home() {
    const classes = useStyles();

    let [pokemonList, setPokemonList] = useState([]); //list of fetched pokemon (only names)
    let [pokemons, setPokemons] = useState([]); //individual pokemons info

    useEffect(() => {
        const fetchKantoPokemon = () => {
            fetch('https://pokeapi.co/api/v2/pokemon')
                .then(res => res.json())
                .then(res => {
                    setPokemonList(res.results);
                    /*
                    res.results.forEach(pokemon => {
                        fetchPokemonData(pokemon);
                    })
                    */
                }).catch(err => console.log(err))
        }

        fetchKantoPokemon();
    }, []);

    useEffect(() => {
        const fetchPokemonData = (pokemon) => {
            let url = pokemon.url;
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    let newPokemon = {
                        id: res.order,
                        name: res.name,
                        sprite: res.sprites.front_default
                    };
                    setPokemons(p => ([...p, newPokemon]));
                    //setPokemons([...pokemons, newPokemon]);
                }).catch(err => console.log(err))
        }

        pokemonList.forEach(pokemon => {
            fetchPokemonData(pokemon);
        });
    }, [pokemonList]);

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Album layout
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Album layout
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Something short and leading about the collection below—its contents, the creator, etc.
                    Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                    entirely.
                    </Typography>
                    <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                        <Button variant="contained" color="primary" onClick={() => console.log(pokemons)}>
                            Main call to action
                        </Button>
                        </Grid>
                        <Grid item>
                        <Button variant="outlined" color="primary">
                            Secondary action
                        </Button>
                        </Grid>
                    </Grid>
                    </div>
                </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
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
                                        This is a media card. You can use this section to describe the content.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        View
                                    </Button>
                                    <Button size="small" color="primary">
                                        Edit
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}