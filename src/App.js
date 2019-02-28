import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AuthenticatedLayoutView from './modules/authenticated';
import LoginView from './modules/login';
import BookView from './modules/book';
import BooksView from './modules/books';
import PageView from './modules/page';
import ChoicesView from './modules/choices';
import SecureRoute from './components/SecureRoute';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#f05545',
      main: '#b71c1c',
      dark: '#7f0000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  }  
});



class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AuthenticatedLayoutView>
          <Switch>
            <SecureRoute exact path="/books" component={BooksView} />
            <SecureRoute exact path="/books/:bookId/pages" component={BookView} />
            <SecureRoute exact path="/pages/:pageId/choices" component={ChoicesView} />
            <SecureRoute exact path="/pages/:pageId" component={PageView} />
            <SecureRoute component={NoMatch} />
          </Switch>
        </AuthenticatedLayoutView>

        <Route path="/login" component={LoginView} />
      </MuiThemeProvider>
    );
  }
}
const NoMatch = () => <div>None</div>

export default App;
