import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button";


export default function DialogCustom(props) {

    const { saveFunction, titleDialog, componentContent,
            dialogContentText, isOpen, closeFunction, isEditionDialog } = props;

    return (
      <Dialog open={isOpen} onClose={closeFunction} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"> {titleDialog} </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {dialogContentText}
            </DialogContentText>
            {componentContent}
          </DialogContent>
          <DialogActions>
            {
              (isEditionDialog) 
              ?
                (<>
                <Button onClick={saveFunction} color="primary">
                  Guardar
                </Button>
                <Button onClick={closeFunction} color="primary">
                  Cancelar
                </Button>
                </>)
              : (<>
                <Button onClick={closeFunction} color="primary">
                  OK
                </Button>
                </>)
            }
          </DialogActions>
      </Dialog>
    );
}