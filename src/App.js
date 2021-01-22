import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import ShoppingCartContext from 'src/components/ShoppingCart';
import { getShoppingCart } from 'src/utils/localStorage';
import theme from 'src/theme';
import routes from 'src/routes';

function App() {
  const [shoppingCart, setShoppingCart] = useState(() => getShoppingCart());
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ShoppingCartContext.Provider value={[shoppingCart, setShoppingCart]}>
        {routing}
      </ShoppingCartContext.Provider>
    </ThemeProvider>
  );
}

export default App;
