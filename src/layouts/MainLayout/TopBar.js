import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  IconButton,
  Link,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import ReorderIcon from '@material-ui/icons/Reorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Logo from 'src/components/Logo';
import ShoppingCartContext from 'src/components/ShoppingCart';
import { getSize } from 'src/utils/object';

const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    fontSize: 28
  },
  iconButton: {
    marginLeft: 'auto'
  },
  logo: {
    width: 110
  },
  toolbar: {
    backgroundColor: theme.palette.background.default,
    height: 68
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [shoppingCart] = useContext(ShoppingCartContext);

  return (
    <AppBar className={clsx(classes.root, className)} elevation={1} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Link href="home">
          <Logo className={classes.logo} />
        </Link>
        <IconButton
          color="primary"
          aria-label="products"
          component={Link}
          href="products"
          className={classes.iconButton}
        >
          <ReorderIcon className={classes.icon} />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="shopping cart"
          component={Link}
          href="cart"
        >
          <Badge badgeContent={getSize(shoppingCart)} color="error">
            <ShoppingCartIcon className={classes.icon} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
