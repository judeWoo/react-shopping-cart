import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  checkoutButton: {
    border: '1px solid',
    marginTop: theme.spacing(2),
    fontSize: theme.spacing(2.5),
    fontWeight: 500,
    width: theme.spacing(20),

    '&:hover': {
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.text.primary,
      color: theme.palette.text.primary,
    }
  },
  image: {
    marginTop: theme.spacing(6),
    display: 'inline-block',
    maxWidth: '100%',
    width: theme.spacing(30)
  }
}));

const EmptyCartCard = memo(({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/products');
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box
            textAlign="center"
            mb={3}
          >
            <img
              alt="Empty Cart"
              className={classes.image}
              src="/static/images/empty-cart.svg"
            />
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            장바구니가 비어있습니다 :(
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            상단의 네비게이션이나 하단의 버튼을 통해 상품 목록 페이지로 이동할 수 있습니다.
          </Typography>
          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              className={classes.checkoutButton}
              onClick={onClick}
            >
              쇼핑하기
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

EmptyCartCard.propTypes = {
  className: PropTypes.string
};

export default EmptyCartCard;
