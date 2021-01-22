import React, {
  useContext,
  useState
} from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ShoppingCartContext from 'src/components/ShoppingCart';
import {
  getPrice
} from 'src/utils/localStorage';
import { getSize } from 'src/utils/object';
import CartCard from './CartCard';
import CheckoutCard from './CheckoutCard';
import EmptyCartCard from './EmptyCartCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  cartCard: {
    height: '100%',
    marginBottom: theme.spacing(2)
  }
}));

const Cart = () => {
  const classes = useStyles();
  const [shoppingCart, setShoppingCart] = useContext(ShoppingCartContext);
  const [price, setPrice] = useState(() => getPrice());

  return (
    <Page className={classes.root} title="Shopping Cart">
      {getSize(shoppingCart) > 0
        ? (
          <Container maxWidth="xl">
            <Box mt={3}>
              <Grid container justify="space-between" spacing={3}>
                <Grid item lg={8} sm={6} xs={12}>
                  {Object.values(shoppingCart)
                    .map((product) => (
                      <Grid item key={product.id} xs={12}>
                        <CartCard
                          className={classes.cartCard}
                          product={product}
                          setPrice={setPrice}
                          shoppingCart={shoppingCart}
                          setShoppingCart={setShoppingCart}
                        />
                      </Grid>
                    ))}
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <CheckoutCard
                    price={price}
                    setPrice={setPrice}
                    shoppingCart={shoppingCart}
                    setShoppingCart={setShoppingCart}
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        )
        : (
          <Container>
            <EmptyCartCard />
          </Container>
        )}
    </Page>
  );
};

export default Cart;
