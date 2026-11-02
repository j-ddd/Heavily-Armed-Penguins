import React, { useState, useContext } from 'react'
import { TextField, MenuItem, withStyles, Button, Paper, Grid } from "@material-ui/core";
import { toast } from 'react-toastify';
import PageTitle from "../../../components/PageTitle/PageTitle";
import { BuilderContext } from "../context/BuilderContext";
import '../style.css';

let flagString = "";
const flagsLength = 12;

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
	deployed: "False",
	content: "N/A",
	flags: Array.from({length: flagsLength}, (v, i) => 'Disabled')
}

const AddBuilderForm = ({ classes, ...props }) => {
	const { createBuilder} = useContext(BuilderContext)
	const [ builder, setBuilder ] = useState(initialFormState)
	const [ errors, setErrors ] = useState({})
	let tempErrors = {};
	let flagsPlusNew = builder.flags;
	
	const handleInputChange = event => {
		const { name, value } = event.target

		if(name === "name")
		{	
			setBuilder({ ...builder, [name]: value })
		}
		else
		{
			setBuilder({ 
				...builder, flags:{...builder.flags, [name]:value}
			})
		}
	}

	const validate = () => {
        let formIsValid = true;

        	if(!builder.name || builder.name.trim() ===  ""){
			formIsValid = false;
			tempErrors["name"] = "Name cannot be empty";
		}
	
		setErrors(tempErrors);
		return formIsValid;
    }
	
	const handleSubmit = (e) => {
		const onSuccess = () => {
			props.history.push("/admin/builder-context")
			toast.success('Data succesfully created');
		}
        	e.preventDefault();

        if(validate()){
		createBuilder(builder, onSuccess)
        }
    }

	return (
		<React.Fragment>
            <PageTitle title="Add Template Builder" />
            <Grid container spacing={4} >

				<Paper className={classes.paper}>

				<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
					onSubmit={handleSubmit} component={Paper} >

					<TextField
						name="name"
						variant="outlined"
						label="Name"
						fullWidth
						value={builder.name}
						onChange={handleInputChange}
						{...(errors.name && { error: true, helperText: errors.name })}
					/>
					<TextField 
		  				select
		  				name = "0"
		  				label="Disable Empty Password SSH" 
		  				value={builder.flags[0]}
		  				variant="outlined"
		 				fullWidth
		  				onChange={handleInputChange}
		  				>
		  				<MenuItem value={"Disabled"}>Disabled</MenuItem>
		  				<MenuItem value={"CONNECTION SSH noEmptyPass"}>Enabled</MenuItem>
					</TextField>
					<TextField 
		  				select
		  				name = "1"
		  				label="Enable Priveleged Access Management PAM* SSH" 
		  				value={builder.flags[1]}
		  				variant="outlined"
		 				fullWidth
		  				onChange={handleInputChange}
		  				>
		  				<MenuItem value={"Disabled"}>Disabled</MenuItem>
		  				<MenuItem value={"CONNECTION SSH EnablePAM"}>Enabled</MenuItem>
					</TextField>
					<TextField 
		  				select
		  				name = "2"
		  				label="Securely Encrypt TLS" 
		  				value={builder.flags[2]}
		  				variant="outlined"
		 				fullWidth
		  				onChange={handleInputChange}
		  				>
		  				<MenuItem value={"Disabled"}>Disabled</MenuItem>
		  				<MenuItem value={"CONNECTION TLS secureEncrypt"}>Enabled</MenuItem>
					</TextField>
					<TextField 
		  				select
		  				name = "3"
		  				label="Disable ICMP" 
		  				value={builder.flags[3]}
		  				variant="outlined"
		 				fullWidth
		  				onChange={handleInputChange}
		  				>
		  				<MenuItem value={"Disabled"}>Disabled</MenuItem>
		  				<MenuItem value={"CONNECTION ICMP UP"}>Enabled</MenuItem>
					</TextField>
					<TextField 
		  				select
		  				name = "4"
		  				label="Block USB" 
		  				value={builder.flags[4]}
		  				variant="outlined"
		 				fullWidth
		  				onChange={handleInputChange}
		  				>
		  				<MenuItem value={"Disabled"}>Disabled</MenuItem>
		  				<MenuItem value={"USB Guard Block"}>Enabled</MenuItem>
					</TextField>
					<TextField 
		  				select
		  				name = "5"
		  				label="Reject USB" 
		  				value={builder.flags[5]}
		  				variant="outlined"
		 				fullWidth
		  				onChange={handleInputChange}
		  				>
		  				<MenuItem value={"Disabled"}>Disabled</MenuItem>
		  				<MenuItem value={"USB Guard Reject"}>Enabled</MenuItem>
					</TextField>
					<TextField 
		  				select
		  				name = "6"
		  				label="Targeted SELinux Policy (Enable)" 
		  				value={builder.flags[6]}
		  				variant="outlined"
		 				fullWidth
		  				onChange={handleInputChange}
		  				>
		  				<MenuItem value={"Disabled"}>Disabled</MenuItem>
		  				<MenuItem value={"KERNEL SELINUX TARGETED"}>Enabled</MenuItem>
					</TextField>
					<TextField 
		  				select
		  				name = "7"
		  				label="Disable Keyboard Bursts" 
		  				value={builder.flags[7]}
		  				variant="outlined"
		 				fullWidth
		  				onChange={handleInputChange}
		  				>
		  				<MenuItem value={"Disabled"}>Disabled</MenuItem>
		  				<MenuItem value={"KERNEL KEYBOARD --disablectrlaltdel"}>Enabled</MenuItem>
					</TextField>
					<TextField 
		  				select
		  				name = "8"
		  				label="Enable Auditing Scripts" 
		  				value={builder.flags[8]}
		  				variant="outlined"
		 				fullWidth
		  				onChange={handleInputChange}
		  				>
		  				<MenuItem value={"Disabled"}>Disabled</MenuItem>
		  				<MenuItem value={"KERNEL AUDIT SUDOERS"}>Enabled</MenuItem>
					</TextField>
					<TextField 
		  				select
		  				name = "9"
		  				label="Disable Coredumps" 
		  				value={builder.flags[9]}
		  				variant="outlined"
		 				fullWidth
		  				onChange={handleInputChange}
		  				>
		  				<MenuItem value={"Disabled"}>Disabled</MenuItem>
		  				<MenuItem value={"KERNEL COREDUMP OFF"}>Enabled</MenuItem>
					</TextField>
					<TextField 
		  				select
		  				name = "10"
		  				label="Protect /var/log" 
		  				value={builder.flags[10]}
		  				variant="outlined"
		 				fullWidth
		  				onChange={handleInputChange}
		  				>
		  				<MenuItem value={"Disabled"}>Disabled</MenuItem>
		  				<MenuItem value={"KERNEL MESG NONPERM"}>Enabled</MenuItem>
					</TextField>
					<TextField 
		  				select
		  				name = "11"
		  				label="GPG Signature Verification" 
		  				value={builder.flags[11]}
		  				variant="outlined"
		 				fullWidth
		  				onChange={handleInputChange}
		  				>
		  				<MenuItem value={"Disabled"}>Disabled</MenuItem>
		  				<MenuItem value={"KERNEL GPG VERIFY"}>Enabled</MenuItem>
					</TextField>
					<div className="form-button-container">
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => props.history.push("/admin/builder-context")}
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

export default (withStyles(styles)(AddBuilderForm));
