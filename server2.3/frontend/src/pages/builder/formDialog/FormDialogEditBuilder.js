import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { toast } from 'react-toastify';
import Grow from '@material-ui/core/Grow';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const initialFormState = { 
	id: null, 
	name: "",
	deployed: "",
	content: ""
}

const FormDialogEditBuilder = (props) => {
  const [open, setOpen] = useState(false);
  const [builder, setBuilder] = useState(initialFormState);
  const [errors, setErrors ] = useState({})

  const handleClickOpen = () => {
      setErrors({});
      setBuilder({
        id : props.dataBuilder[0],
        name : props.dataBuilder[1],
	deployed : props.dataBuilder[2],
        content : props.dataBuilder[3]
      })
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  const handleInputChange = event => {
		const { name, value } = event.target
    setBuilder({ ...builder, [name]: value })
  }
  
  const validate = () => {
      let tempErrors = {};
      let formIsValid = true;

      if(!builder.name || builder.name.trim() ===  ""){
        formIsValid = false;
        tempErrors["name"] = "Cannot be empty";
      }

      if(!builder.content){
	formIsValid = false;
	tempErrors["category"] = "Not selected yet";
      }
	  
      if(!builder.deployed){
	formIsValid = false;
	tempErrors["deployed"] = "Not selected yet";
      }

      setErrors(tempErrors);
      return formIsValid;
  }

  const handleSubmit = (e) => {
      const onSuccess = () => {
          setOpen(false);
          toast.success('Data succesfully updated');
      }
      e.preventDefault();

      if(validate()){
        props.update(builder.id, builder, onSuccess)
      }
  }

  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen} >
          <AddCircleIcon style={{ fontSize: "40px" }} />
      </IconButton>
      <Dialog  
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
            <DialogTitle id="form-dialog-title" style={{padding: "30px 30px 0px 30px"}}>Edit Builder</DialogTitle>

            <DialogContent style={{padding: "30px 30px 10px 30px"}}>
                
                <TextField
                  autoFocus
                  name="name"
                  label="Name"
                  value={builder.name}
                  fullWidth
                  onChange={handleInputChange}
                  {...(errors.name && { error: true, helperText: errors.name })}
                />

                <br /><br />

                <TextField 
		  select
		  name="content"
		  label="Content" 
		  value={builder.content}
		  variant="outlined"
		  fullWidth
		  onChange={handleInputChange}
		  {...(errors.category && { error: true, helperText: errors.content })}
		  >
		  <MenuItem value={"option_1"}>Option_1</MenuItem>
		  <MenuItem value={"option_2"}>Option_2</MenuItem>
		</TextField>

		<br /><br />

                <TextField 
		  select
		  name="deployed"
		  label="Deployed" 
		  value={builder.deployed}
		  variant="outlined"
		  fullWidth
		  onChange={handleInputChange}
		  {...(errors.category && { error: true, helperText: errors.deployed })}
		  >
		  <MenuItem value={"option_1"}>Option_1</MenuItem>
		  <MenuItem value={"option_2"}>Option_2</MenuItem>
		</TextField>

            </DialogContent>

            <DialogActions style={{padding: 30}}>
                <Button variant="contained" onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit} color="secondary">
                    Save
                </Button>
            </DialogActions>

      </Dialog>
    </div>
  );
}

export default FormDialogEditBuilder;
