import React from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Main from '../../components/Main';
import { getBooks } from '../../services/data';

class BooksView extends React.Component {
  state = {
    books: []
  }

  componentWillMount() {
    getBooks().then(books => this.setState({ books }));
  }

  render() {
    return (
      <Main>
        <Grid container justify="center">
          <Grid item xs={11}>
            <GridList cols={2}>
              {this.state.books.map(x => (          
                <GridListTile
                  key={x.id}
                  component={Link}
                  to={`/books/${x.id}/pages`}
                  classes={{ root: this.props.classes.gridTileRoot }}>
                  <GridListTileBar title={x.title} />
                </GridListTile>
              ))};
            </GridList>
          </Grid>
        </Grid>
      </Main>
    );
  }
}

const styles = theme => ({
  gridTileRoot: {
    backgroundColor: '#eee'
  }
});

export default withStyles(styles)(BooksView);