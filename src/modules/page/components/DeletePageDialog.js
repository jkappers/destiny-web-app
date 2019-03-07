import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconedButton from '../../../components/IconedButton';
import { deletePage } from '../../../services/data';

class DeletePageDialog extends Component {
  state = {
    redirect: false
  }

  handleDelete = () => {
    deletePage(this.props.page.id).then(() => {
      this.props.onClose();
      this.setState({ redirect: true });  
    })
  }
  
  render = () => {
    if (this.state.redirect) {
      return <Redirect to={`/books/${this.props.page.bookId}/pages`} />;
    }

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete this page?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is permanent and can not be reversed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>
            Cancel
          </Button>
          <IconedButton
            color="primary"
            onClick={this.handleDelete}
            icon={<Icon>delete_forever</Icon>}>
            Delete
          </IconedButton>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = theme => ({
  grow: {
    flexGrow: 1
  }
})

export default withStyles(styles)(DeletePageDialog);
