import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
  makeStyles,
  Divider
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import {
  decreasePrice,
  increasePrice,
  updatePrice,
  updateShoppingCart,
  getQuantity,
  getIsForCheckout,
} from 'src/utils/localStorage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  box: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  checkbox: {
    marginLeft: theme.spacing(0),
  },
  deleteIcon: {
    fontSize: theme.spacing(4)
  },
  quantity: {
    marginRight: theme.spacing(1)
  },
  quantityButton: {
    minWidth: theme.spacing(4),
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1)
  },
  quantityRemoveButton: {
    marginRight: 'auto'
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
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(30),
    },
    [theme.breakpoints.up('md')]: {
      height: theme.spacing(25),
    },
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(20),
    },
  },
  totalPriceCopy: {
    fontWeight: 400,
    marginRight: 'auto',
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(1)
    },
  }
}));

const CartCard = ({
  className, product, shoppingCart, setShoppingCart, setPrice, ...rest
}) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(() => getQuantity(product.id));
  const [isForCheckout, setIsForCheckout] = useState(() => getIsForCheckout(product.id));

  const onAddQuantClick = () => {
    const { id, price } = product;
    const newShoppingCart = { ...shoppingCart };

    newShoppingCart[id].quantity += 1;

    setShoppingCart(newShoppingCart);
    updateShoppingCart(newShoppingCart);

    setQuantity((oldQuantity) => oldQuantity + 1);

    if (newShoppingCart[id].isForCheckout) {
      increasePrice(price);
      setPrice((oldPrice) => oldPrice + price);
    }
  };

  const onRemoveQuantClick = () => {
    if (quantity > 0) {
      const { id, price } = product;
      const newShoppingCart = { ...shoppingCart };

      newShoppingCart[id].quantity -= 1;

      setShoppingCart(newShoppingCart);
      updateShoppingCart(newShoppingCart);

      setQuantity((oldQuantity) => oldQuantity - 1);

      if (newShoppingCart[id].isForCheckout) {
        decreasePrice(price);
        setPrice((oldPrice) => oldPrice - price);
      }
    }
  };

  const onRemoveClick = () => {
    const { id, price } = product;
    const newPrice = price * quantity;
    const newShoppingCart = { ...shoppingCart };

    if (newShoppingCart[id].isForCheckout) {
      decreasePrice(newPrice);
      setPrice((oldPrice) => oldPrice - newPrice);
    }

    delete newShoppingCart[id];

    setShoppingCart(newShoppingCart);
    updateShoppingCart(newShoppingCart);
  };

  const onChange = () => {
    const { id, price } = product;
    const newPrice = price * quantity;
    const newShoppingCart = { ...shoppingCart };

    newShoppingCart[id].isForCheckout = !isForCheckout;

    setShoppingCart(newShoppingCart);
    updateShoppingCart(newShoppingCart);

    updatePrice(isForCheckout, newPrice);
    setPrice((oldPrice) => oldPrice + (isForCheckout ? -newPrice : newPrice));

    setIsForCheckout((oldIsForCheckout) => !oldIsForCheckout);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container>
          <Grid item lg={3} xs={12}>
            <Box my={2} className={classes.box}>
              <Avatar
                alt="Product"
                src={product.coverImage}
                variant="rounded"
                className={classes.thumbnail}
              />
            </Box>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Box my={2} className={classes.box}>
              <Typography color="textPrimary" variant="h4">
                {product.title}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" className={classes.box}>
              <Button
                variant="contained"
                color="primary"
                aria-label="add quantity"
                className={classes.quantityButton}
                onClick={onAddQuantClick}
              >
                <AddIcon />
              </Button>
              <Typography
                align="center"
                color="textPrimary"
                variant="h4"
                className={classes.quantity}
              >
                {`${quantity.toLocaleString()}`}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                aria-label="remove quantity"
                className={clsx(
                  classes.quantityButton,
                  classes.quantityRemoveButton
                )}
                disabled={quantity === 1}
                onClick={onRemoveQuantClick}
              >
                <RemoveIcon />
              </Button>
            </Box>
            <Box mt={2} display="flex" alignItems="center" className={classes.box}>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={isForCheckout}
                    onChange={onChange}
                    name={`${product.id}-checkbox`}
                    color="primary"
                  />
                )}
                label="이 상품을 결제에 포함합니다."
                labelPlacement="start"
                className={classes.checkbox}
              />
            </Box>
            {product.availableCoupon === false ? (
              <Box mt={1} display="flex" alignItems="center" className={classes.box}>
                <Typography color="textSecondary" variant="body2" className={classes.noCouponCopy}>
                  쿠폰 적용이 불가한 상품입니다.
                </Typography>
              </Box>
            ) : null}
          </Grid>
          <Grid item lg={2} xs={8}>
            <Box my={2} className={classes.box}>
              <Typography color="textPrimary" variant="h4">
                {`₩ ${(product.price).toLocaleString()}`}
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={1} xs={4}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton
                color="secondary"
                aria-label="remove Item"
                onClick={onRemoveClick}
              >
                <DeleteIcon className={classes.deleteIcon} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center">
          <Typography color="textPrimary" variant="h4" className={classes.totalPriceCopy}>
            구매 예정가:
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {`₩ ${(product.price * quantity).toLocaleString()}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

CartCard.propTypes = {
  className: PropTypes.string,
  shoppingCart: PropTypes.object,
  setShoppingCart: PropTypes.func,
  setPrice: PropTypes.func,
  product: PropTypes.object.isRequired
};

export default CartCard;
