import React, { useState, memo } from 'react';
import {
  Box, Container, Grid, makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import { productItems } from 'src/data';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const numOfProductPerPage = 5;

const getProductsByPage = (products, searchedProducts, page) => {
  const newProducts = searchedProducts.length > 0 ? searchedProducts : products;
  return newProducts.slice(
    (page - 1) * numOfProductPerPage, page * numOfProductPerPage
  );
};

const getPageCountByProducts = (products, searchedProducts) => {
  const newProducts = searchedProducts.length > 0 ? searchedProducts : products;
  return Math.ceil(newProducts.length / numOfProductPerPage);
};

const Products = memo(() => {
  const classes = useStyles();
  const [products] = useState(productItems.sort((a, b) => b.score - a.score));
  const [page, setPage] = useState(1);
  const [searchedProducts, setSearchedProducts] = useState([]);

  const onChange = (_, value) => {
    setPage(value);
  };

  return (
    <Page className={classes.root} title="Products">
      <Container fixed>
        <Toolbar
          searchedProducts={searchedProducts}
          setSearchedProducts={setSearchedProducts}
          setPage={setPage}
          products={products}
        />
        <Box mt={3}>
          <Grid container spacing={3}>
            {getProductsByPage(products, searchedProducts, page).map((product) => (
              <Grid item key={product.id} lg={4} md={6} xs={12}>
                <ProductCard
                  className={classes.productCard}
                  product={product}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            color="primary"
            count={getPageCountByProducts(products, searchedProducts)}
            page={page}
            size="small"
            onChange={onChange}
          />
        </Box>
      </Container>
    </Page>
  );
});

export default Products;
