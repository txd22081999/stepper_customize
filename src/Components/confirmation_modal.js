import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  btn_primary: {
    margin: "25px 0px 0px 25px"
  },
  btn_secondary: {
    marginTop: "25px"
  }
}));

const ConfirmationPopUp = props => {
  const classes = useStyles();
  const { showConfirmation, handleClose, handleConfirmDeploy } = props;

  return (
    <Dialog
      open={showConfirmation}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <b>Confirmation Required</b>
      </DialogTitle>
      <DialogContent>
        Press <b>Confirm and Deploy</b> to generate and deploy workflows.
        Otherwise, <b>Cancel</b>.
        <DialogActions>
          <div>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleClose}
              className={classes.btn_secondary}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleConfirmDeploy}
              className={classes.btn_primary}
            >
              Confirm and Deploy
            </Button>
          </div>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationPopUp;
