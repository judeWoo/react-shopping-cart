import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  SvgIcon,
  TextField,
  makeStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    top: theme.spacing(2.2),
    left: theme.spacing(1.8)
  },
  input: {
    marginLeft: theme.spacing(3.4),
  },
  paper: {
    maxHeight: theme.spacing(20),
  }
}));

const numOfTags = 3;

const Toolbar = ({
  className, products, searchedProducts, setSearchedProducts, setPage, ...rest
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={600} className={classes.box}>
              <SvgIcon fontSize="small" color="action" className={classes.searchIcon}>
                <SearchIcon />
              </SvgIcon>
              <Autocomplete
                multiple
                filterSelectedOptions
                limitTags={numOfTags}
                noOptionsText="해당 되는 상품이 없습니다."
                value={searchedProducts}
                onChange={(_, newValue) => {
                  setSearchedProducts(newValue);
                  setPage(1);
                }}
                options={products}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    placeholder="상품 검색"
                  />
                )}
                classes={{
                  input: classes.input,
                  paper: classes.paper
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array,
  searchedProducts: PropTypes.array,
  setSearchedProducts: PropTypes.func,
  setPage: PropTypes.func,
};

export default Toolbar;
