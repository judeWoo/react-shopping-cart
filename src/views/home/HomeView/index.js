import React, { memo } from 'react';
import {
  Box, Container, Grid, makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import HomeCard from './HomeCard';
import Footer from './Footer';
import pages from './pages';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  homeCard: {
    height: '100%'
  }
}));

const Home = memo(() => {
  const classes = useStyles();

  return (
    <Page className={classes.root}>
      <Container maxWidth="lg">
        <Box mt={4}>
          <Grid container spacing={3}>
            {pages.map((page) => (
              <Grid item key={page.id} md={6} xs={12}>
                <HomeCard className={classes.homeCard} page={page} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Box flexGrow={1} />
      <Footer />
    </Page>
  );
});

export default Home;
