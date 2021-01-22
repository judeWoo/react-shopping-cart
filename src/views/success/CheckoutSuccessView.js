import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Page from 'src/components/Page';
import { getOrderNumber } from 'src/utils/localStorage';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  continueShoppingButton: {
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    fontSize: theme.spacing(2.5),
    fontWeight: 500,
    width: theme.spacing(20),

    '&:hover': {
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      textDecoration: 'none'
    }
  },
  orderNumber: {
    fontWeight: 700
  },
  successIcon: {
    fontSize: theme.spacing(20),
  }
}));

const CheckoutSuccessView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const orderNumber = getOrderNumber();

  const onClick = () => {
    navigate('/products');
  };

  return orderNumber
    ? (
      <Page
        className={classes.root}
        title="Checkout Success"
      >
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          mt={3}
        >
          <Container maxWidth="md">
            <Box my={3} textAlign="center">
              <CheckCircleOutlineIcon color="secondary" className={classes.successIcon} />
            </Box>
            <Typography
              align="center"
              color="textPrimary"
              variant="h1"
            >
              구매해 주셔서 감사합니다 :)
            </Typography>
            <Box mt={4} display="flex" justifyContent="center" alignItems="center">
              <Typography
                align="center"
                color="textPrimary"
                variant="subtitle2"
              >
                주문 번호는 다음과 같습니다:&nbsp;
              </Typography>
              <Typography
                align="center"
                color="textPrimary"
                variant="subtitle2"
                className={classes.orderNumber}
              >
                {orderNumber.split('-').pop().toUpperCase()}
              </Typography>
            </Box>
            <Typography
              align="center"
              color="textPrimary"
              variant="subtitle2"
            >
              구매하신 클래스 이용방법은 이메일로 보내드렸습니다. 즐거운 클래스 되시길 바랍니다.
            </Typography>
            <Box mt={3} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                className={classes.continueShoppingButton}
                onClick={onClick}
              >
                계속 쇼핑하기
              </Button>
            </Box>
          </Container>
        </Box>
      </Page>
    )
    : (<Navigate to="/products" />);
};

export default CheckoutSuccessView;
