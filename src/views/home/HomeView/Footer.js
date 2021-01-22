import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark
  }
}));

const Footer = memo(({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.root} {...rest}>
      <Box py={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="body2">
              Copyleft © 2021 Hokyoon Woo.
            </Typography>
          </Grid>
          <Grid item xs={12} />
        </Grid>
      </Box>
    </Container>
  );
});

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
