import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  getSelectedCoupon,
  getPrice,
  updateSelectedCoupon,
  updateOrderNumber,
  clearShoppingCart,
} from 'src/utils/localStorage';
import { coupons } from 'src/data';

const useStyles = makeStyles((theme) => ({
  root: {},
  checkoutButton: {
    border: '1px solid',
    marginTop: theme.spacing(2),
    fontSize: theme.spacing(2.5),
    fontWeight: 500,
    width: '100%',

    '&:hover': {
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.text.primary,
      color: theme.palette.text.primary,
    }
  },
  formControl: {
    minWidth: theme.spacing(20)
  }
}));

const CheckoutCard = ({
  className, shoppingCart, setShoppingCart, price, setPrice, ...rest
}) => {
  const classes = useStyles();
  const [finalPrice, setFinalPrice] = useState(() => getPrice());
  const [selectedCoupon, setSelectedCoupon] = useState(() => getSelectedCoupon());
  const navigate = useNavigate();

  const onChange = (event) => {
    setSelectedCoupon(event.target.value);
    updateSelectedCoupon(event.target.value);
  };

  const onClick = () => {
    clearShoppingCart();
    setShoppingCart([]);
    updateOrderNumber(uuid());
    navigate('/checkoutSuccess');
  };

  const updateFinalPrice = useCallback(
    () => {
      if (selectedCoupon && price > 0) {
        const coupon = coupons.find((item) => item.title === selectedCoupon);
        const excludedPrice = Object.values(shoppingCart).filter(
          (product) => product.isForCheckout && !product.availableCoupon
        ).reduce((acc, cur) => acc + Number(cur.price) * Number(cur.quantity), 0);
        const newPrice = price - excludedPrice;
        const newFinalPrice = (
          newPrice > 0
            ? coupon.type === 'rate'
              ? Math.floor(newPrice * (1 - coupon.discountRate / 100))
              : newPrice - coupon.discountAmount
            : 0
        );

        setFinalPrice(newFinalPrice + excludedPrice);
      } else {
        setFinalPrice(price);
      }
    },
    [price, selectedCoupon, shoppingCart],
  );

  useEffect(() => {
    updateFinalPrice();
  }, [updateFinalPrice]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box my={2}>
          <Typography color="textPrimary" variant="h4">
            주문내역
          </Typography>
        </Box>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          mt={4}
          mb={2}
        >
          <Typography color="textPrimary" variant="h4">
            주문금액
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {`₩ ${price.toLocaleString()}`}
          </Typography>
        </Box>
        <Box mb={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="coupon-select-label">
              쿠폰 선택
            </InputLabel>
            <Select
              labelId="coupon-select-label"
              id="coupon-select"
              value={selectedCoupon}
              onChange={onChange}
            >
              <MenuItem
                key="none"
                value=""
              >
                쿠폰 선택 안함
              </MenuItem>
              {coupons.map((coupon) => (
                <MenuItem
                  key={coupon.title}
                  value={coupon.title}
                >
                  {coupon.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Typography color="textPrimary" variant="h4">
            총 결제금액
          </Typography>
          <Typography color="secondary" variant="h3">
            {`₩ ${finalPrice.toLocaleString()}`}
          </Typography>
        </Box>
        <Button
          color="primary"
          variant="contained"
          onClick={onClick}
          className={classes.checkoutButton}
        >
          결제하기
        </Button>
      </CardContent>
    </Card>
  );
};

CheckoutCard.propTypes = {
  className: PropTypes.string,
  shoppingCart: PropTypes.object,
  setShoppingCart: PropTypes.func,
  setPrice: PropTypes.func,
  price: PropTypes.number,
};

export default CheckoutCard;
