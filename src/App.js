import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import uuid from 'uuid/v4';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import LoginView from './modules/login';
import BooksView from './modules/books';
import SecureRoute from './components/SecureRoute';
import store from './services/store';
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
});

const NoWrapFormControlLabel = withStyles({
  label: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
})(FormControlLabel);

const styles = theme => ({
  grow: {
    flexGrow: 1
  }  
});

let initialPage = null;
let initialContent = '';
let initialBook = localStorage.getItem('book');

if (initialBook) {
  initialBook = JSON.parse(initialBook);
  initialPage = initialBook.pages[0];
  initialContent = initialPage.content;
}


class App extends Component {

  state = {
    book: initialBook,
    content: initialContent,
    page: initialPage,
    menu: null,
    isFileDialogOpen: false,
    isDestDialogOpen: false,
    editingDestination: {
      id: '',
      description: '',
      page_id: null,
      query: ''
    }
  }

  /* Query Methods */
  pageOrigins = page => {
    const { book } = this.state;

    if (!book || !page) {
      return [];
    }

    const origins = [];

    book.pages.forEach(x => {
      (x.choices || [])
       .filter(({ page_id }) => page_id === page.id)
       .forEach(y => {
         origins.push({
           page: x,
           choice: y
         })
       })
    });
    
    return origins;
  }

  pageDestinations = page => {
    const { book } = this.state;

    return (page.choices || []).map(choice => ({
      choice,
      page: book.pages.find(x => x.id === choice.page_id)
    }));
  }

  /* Event Handlers */
  
  onMenuOpened = e =>
    this.setState({ menu: e.currentTarget })

  onMenuClosed = e =>
    this.setState({ menu: null })

  onFileDialogOpened = () =>
    this.setState({ isFileDialogOpen: true })

  onFileDialogClosed = () =>
    this.setState({ isFileDialogOpen: false })

  onContentChanged = ({ target }) => {
    const { page } = this.state;
    page.content = target.value
    this.setState({ 
      page,
      content: page.content
    });
  }

  onNewPageClicked = () => {
    const { book } = this.state;    
    const page = {
      content: 'TODO: Add content or delete me...',
      choices: []
    }
    
    book.pages.push(page);

    this.setState({ 
      book,
      page,
      content: page.content
    });
  }

  onFileSubmitted = event => {
    event.preventDefault();
    const file = this._fileInputRef.files[0];
    const reader = new FileReader();

    reader.onload = e => {
      localStorage.setItem('book', e.target.result);

      const book = JSON.parse(e.target.result);
      const page = book.pages[0];

      this.setState({
        book,
        page,
        content: page.content
      });

      this.onFileDialogClosed();
    };

    reader.readAsText(file);

    return false;
  }

  onPageClicked = page =>
    this.setState({
      content: page.content,
      page
    });
  
  onDestinationDialogOpened = destination => {
    this.setState({
      isDestDialogOpen: true,
      editingDestination: destination,
    })
  }

  onDeleteChoice = () => {
    const { page, editingDestination } = this.state;
    const choice = page.choices.find(x => x.id === editingDestination.id);
    const index = page.choices.indexOf(choice);
    page.choices.splice(index, 1)
    this.setState({ page });
    this.onDestDialogClosed();
  }
  
  onDestinationDescChanged = e => {
    const { editingDestination } = this.state;
    editingDestination.description = e.target.value;
    this.setState({ editingDestination })
  }

  onDestinationPageQueryChanged = e => {
    const { editingDestination } = this.state;
    editingDestination.query = e.target.value;
    this.setState({ editingDestination })
  }
  
  onDestinationPageChanged = e => {
    const { editingDestination } = this.state;
    editingDestination.page_id = e.target.value;
    this.setState({ editingDestination })
  }

  destinationFilteredPages = () => {
    const { editingDestination, book, page } = this.state;
    
    if (!book) {
      return [];
    }

    if (!editingDestination.query) {
      return book.pages.slice(0, 5);
    }
    
    const result = [];

    if (editingDestination.page_id) {
      result.push(
        book.pages.find(x => x.id === editingDestination.page_id)
      );
    }

    const limit = 5 - result.length;
    const wordsToMatch = editingDestination.query.toLowerCase().split(' ');
    book.pages.filter(x => (
      wordsToMatch.every(word => x.content.toLowerCase().indexOf(word) >= 0 && x.id !== editingDestination.page_id && page.id !== x.page_id)
    )).forEach(x => result.push(x));

    return result.slice(0, limit);
  }

  onDestinationSubmitted = e => {
    e.preventDefault();

    const { page, editingDestination } = this.state;

    if (!editingDestination.page_id) {
      return false;
    }

    if (editingDestination.id) {
      let choice = page.choices.find(x => x.id === editingDestination.id);
      choice.description = editingDestination.description;
      choice.page_id = editingDestination.page_id;
      this.setState({
        page,
        editingDestination: {
          id: '',
          description: '',
          page_id: null,
          query: ''
        },
        isDestDialogOpen: false
      });
    } else {
      let choice = {
        id: uuid(),
        description: editingDestination.description,
        page_id: editingDestination.page_id
      }

      page.choices.push(choice);

      this.setState({
        page,
        editingDestination: {
          id: '',
          description: '',
          page_id: null,
          query: ''
        },
        isDestDialogOpen: false
      })
    }
  }

  onDestDialogClosed = () =>
    this.setState({ isDestDialogOpen: false });

  onSave = () =>
    localStorage.setItem('book', JSON.stringify(this.state.book));

  onExport = () => {
    var element = document.createElement('a');
    var content = localStorage.getItem('book');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', 'book.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  render() {
    const { classes } = this.props;
    const { menu, book, page } = this.state;

    return (
        <Router>
          <MuiThemeProvider theme={theme}>
            <Switch>
              <SecureRoute exact path="/" component={BooksView} />
              <Route path="/login" component={LoginView} />
              <Route component={NoMatch} />
            </Switch>
          </MuiThemeProvider>
        </Router>
    );
  }
}

const Another = () => <div>Another</div>
const About = () => <div>About</div>
const NoMatch = () => <div>None</div>

export default withStyles(styles)(App);
