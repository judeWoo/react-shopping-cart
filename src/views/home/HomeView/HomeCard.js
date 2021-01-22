import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      boxShadow: theme.shadows[20]
    }
  },
  link: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  thumbnail: {
    width: '100%',
    height: theme.spacing(30)
  }
}));

const HomeCard = memo(({ className, page, ...rest }) => {
  const classes = useStyles();

  return (
    <Link className={classes.link} href={page.to}>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={3}>
            <Avatar
              alt="page"
              src={page.coverImage}
              variant="rounded"
              className={classes.thumbnail}
            />
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {page.title}
          </Typography>
          <Typography align="center" color="textPrimary" variant="body1">
            {page.description}
          </Typography>
        </CardContent>
        <Box flexGrow={1} />
      </Card>
    </Link>
  );
});

HomeCard.propTypes = {
  className: PropTypes.string,
  page: PropTypes.object.isRequired
};

export default HomeCard;
