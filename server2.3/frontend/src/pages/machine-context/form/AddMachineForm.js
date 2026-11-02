import React, { useState, useContext } from 'react'
import { TextField, withStyles, Button, Paper, Grid } from "@material-ui/core";
import { toast } from 'react-toastify';
import PageTitle from "../../../components/PageTitle/PageTitle";
import { MachineContext } from "../context/MachineContext";
import '../style.css';

const styles = theme => ({
	paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(3)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
		justifyContent: 'center',
    },
    postBtn: {
        width: "200px",
        marginTop: "30px",
        marginBottom: "20px"
    }
})

const initialFormState = { 
	id: null,
	name: "",
	ip: "",
	host: "",
	os: "",
	credits: ""
}

const AddMachineForm = ({ classes, ...props }) => {
	const { createMachine} = useContext(MachineContext)
	const [ machine, setMachine ] = useState(initialFormState)
	const [ errors, setErrors ] = useState({})
	
	const handleInputChange = event => {
		const { name, value } = event.target
		setMachine({ ...machine, [name]: value })
	}

	const validate = () => {
        let tempErrors = {};
        let formIsValid = true;

        if(!machine.name || machine.name.trim() ===  ""){
			formIsValid = false;
			tempErrors["name"] = "Name cannot be empty";
		}
	
		if(!machine.host || machine.host.trim() ===  ""){
			formIsValid = false;
			tempErrors["host"] = "Host not valid";
		}

		if(!machine.ip || machine.ip.trim() ===  ""){
			formIsValid = false;
			tempErrors["ip"] = "IP not valid";
		}
	
		setErrors(tempErrors);
		return formIsValid;
    }
	
	const handleSubmit = (e) => {
		const onSuccess = () => {
			props.history.push("/admin/machine-context")
			toast.success('Data succesfully created');
		}
        	e.preventDefault();

        if(validate()){
		createMachine(machine, onSuccess)
        }
    }

	return (
		<React.Fragment>
            <PageTitle title="Add Machine" />
            <Grid container spacing={4} >

				<Paper className={classes.paper}>

				<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
					onSubmit={handleSubmit} component={Paper} >

					<TextField
						name="name"
						variant="outlined"
						label="Name"
						fullWidth
						value={machine.name}
						onChange={handleInputChange}
						{...(errors.name && { error: true, helperText: errors.name })}
					/>
					<TextField
						name="host"
						variant="outlined"
						label="Host"
						fullWidth
						value={machine.host}
						onChange={handleInputChange}
						{...(errors.host && { error: true, helperText: errors.host })}
					/>
					<TextField
						name="ip"
						variant="outlined"
						label="IP"
						fullWidth
						value={machine.ip}
						onChange={handleInputChange}
						{...(errors.ip && { error: true, helperText: errors.ip })}
					/>
					<div className="form-button-container">
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => props.history.push("/admin/machine-context")}
						>Cancel</Button>

						<Button
							variant="contained"
							color="secondary"
							size="large"
							type="submit"
						>Save</Button>
					</div>
				</form>

				</Paper>
			</Grid>
		</React.Fragment>
    );
}

export default (withStyles(styles)(AddMachineForm));
