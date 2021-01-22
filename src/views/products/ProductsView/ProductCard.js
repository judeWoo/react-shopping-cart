import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ShoppingCartContext from 'src/components/ShoppingCart';
import {
  decreasePrice,
  increasePrice,
  getQuantity,
  updateShoppingCart
} from 'src/utils/localStorage';
import { getSize } from 'src/utils/object';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
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

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();
  const [shoppingCart, setShoppingCart] = useContext(ShoppingCartContext);

  const onAddClick = () => {
    if (getSize(shoppingCart) < 3) {
      const { id, price } = product;
      const newShoppingCart = {
        ...shoppingCart,
        [id]: {
          availableCoupon: true,
          quantity: 1,
          isForCheckout: true,
          ...product,
        }
      };

      setShoppingCart(newShoppingCart);
      updateShoppingCart(newShoppingCart);
      increasePrice(price);
    }
  };

  const onRemoveClick = () => {
    const { id, price } = product;
    const newPrice = price * getQuantity(id);
    const newShoppingCart = { ...shoppingCart };

    if (newShoppingCart[id].isForCheckout) {
      decreasePrice(newPrice);
    }

    delete newShoppingCart[id];

    setShoppingCart(newShoppingCart);
    updateShoppingCart(newShoppingCart);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar
            alt="Product"
            src={product.coverImage}
            variant="rounded"
            className={classes.thumbnail}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {product.title}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {product.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2} display="flex" justifyContent="flex-start" alignItems="center">
        <Typography color="textPrimary" variant="h5">
          {`₩ ${product.price.toLocaleString()}`}
        </Typography>
        <Box ml="auto">
          {product.id in shoppingCart ? (
            <Button
              color="secondary"
              endIcon={<RemoveShoppingCartIcon />}
              onClick={onRemoveClick}
            >
              빼기
            </Button>
          ) : (
            <Button
              color="primary"
              endIcon={<AddShoppingCartIcon />}
              onClick={onAddClick}
              disabled={getSize(shoppingCart) === 3}
            >
              담기
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
