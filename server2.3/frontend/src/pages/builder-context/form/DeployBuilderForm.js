import React, { useState, useEffect, useContext } from 'react'
import { TextField, MenuItem, withStyles, Button, Paper, Grid, Card, CardContent, Typography, FormControlLabel, Checkbox, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter} from "@material-ui/core";
import { toast } from 'react-toastify';
import PageTitle from "../../../components/PageTitle/PageTitle";
import { BuilderContext } from "../context/BuilderContext";
import { MachineContext } from "../../machine-context/context/MachineContext";
import Pagination from '../../machine-context/table/Pagination'
import { Link } from "react-router-dom";
import axios from 'axios';
//import '../style.css';

const http = axios.create({
  baseURL: 'https://172.20.10.4:3000',
  headers: {
    "Content-type": "application/json"
  }
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function wait1sec() {
	await sleep(5000);
}

let flagString = "";
const flagsLength = 12;

const styles = theme => ({
	paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
	paddingBottom: theme.spacing(0)
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
    row: {
        '& > *': {
          borderBottom: 'unset',
          height: 'unset'
        },
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

const DeployBuilderForm = ({ classes, ...props }) => {
	const [ builder, setBuilder ] = useState(initialFormState)
	const [ errors, setErrors ] = useState({})
	const { fetchById, updateBuilder} = useContext(BuilderContext)
	const [checked, setChecked] = useState({})
	const { machines, meta, fetchMachines, deleteMachine} = useContext(MachineContext)
	const [page, setPage] = useState(0);

	let machinesLength = meta.totalDocs
	meta.limit = machinesLength
	
	useEffect(() => {

	   fetchMachines(1, machinesLength)
		
	    const onSuccess = (builder) => {
            setBuilder(builder)
		}
		const id = props.match.params.id
		fetchById(id, onSuccess)

	   wait1sec();
	   meta.limit = machinesLength

	   fetchMachines(1, (meta.totalDocs))
	}, [])

	meta.limit = machinesLength

	machinesLength = meta.totalDocs
	let machineIds = Array.from({length: machinesLength}, (v, i) => false)
	const machineObjects = []
    	for (const key in machines) {
            machineObjects.push({
            	id: machines[key].id,
            	name: machines[key].name,
		ip: machines[key].ip,
		username: machines[key].username
            })
    	}

	const refresh = async () => {
        await setPage(0);
        fetchMachines(1, machinesLength)
    	}

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

	const handleChecked = id => e => {
   	 const { checked } = e.target;
      	  setChecked((values) => ({
            ...values,
            [id]: checked
     	   }));
	}

	const validate = () => {
        let tempErrors = {};
        let formIsValid = true;

    		if(!builder.name || builder.name.trim() ===  ""){
			formIsValid = false;
			tempErrors["name"] = "Cannot be empty";
		}
	
		setErrors(tempErrors);
		return formIsValid;
    }
	
	const handleSubmit = async (e) => {
		const onSuccess = () => {
			props.history.push("/admin/builder-context")
			toast.success('Data succesfully updated');
		}
		
        e.preventDefault();

        if(validate()){
			builder.deployed = 'True';

			//let flagInput = builder.flags[0].join("\n");
			//console.log(flagInput);
			//console.log(builder.flags[0]);
			//flagInput.replaceAll("Disabled\n", "");
			//console.log(flagInput);
			//const copiedArray = [...builder.flags[0]];
			//console.log(copiedArray);
		
			console.log(builder.flags[0]);
			let inputData = "";

			for(let i = 0; i < flagsLength; i++)
			{
				if(!(builder.flags[0][i] === "Disabled"))
				{
					inputData = inputData + '' + builder.flags[0][i] + '\n';
				}
			}

			try {
        		    // Send HTTP POST request to backend API endpoint
        		    const response = await http.post('/writeToTemplate', { data: inputData });
        		    console.log(response.data);
        		} catch (error) {
        		    console.error(error);
        		}

			console.log(checked);
			console.log(machineObjects.checked);

			inputData = "";

			for (let i = 0; i < machinesLength; i++)
			{
				let currMachine = machineObjects[i];
				console.log(currMachine.id);
				if(checked[currMachine.id] === true)
				{
					inputData = inputData + currMachine.ip + ' --ask-pass ' + currMachine.username + '\n';
					console.log(inputData);
				}
			}

			try {
        		    // Send HTTP POST request to backend API endpoint
			    // WRITE DEPLOY LIST MUST GO LAST!!!
        		    const response = await http.post('/writeDeployList', { data: inputData });
        		    console.log(response.data);
        		} catch (error) {
        		    console.error(error);
        		}
		
			updateBuilder(builder.id, builder, onSuccess)
        }
    }

	return (
		<React.Fragment>
            <PageTitle title="Deploy Builder" />
            <Grid container spacing={4} >

				<Paper className={classes.paper}>

				<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
					onSubmit={handleSubmit} component={Paper} >

					<div className="form-checkbox-container">
      					  <machineObjects
        				    completed={Object.values(checked).filter(Boolean).length}
      					  />
      					  <Card>
        				    {machineObjects.map(({ id, name }) => {
          				      return (
            				       <CardContent key={id}>
              					 <Typography variant="body1">
                				   <FormControlLabel
                 				     control={
                    				       <Checkbox
                      					 color="primary"
                      					 checked={checked[id]}
                      					 onClick={handleChecked(id)}
                    					/>
                  				      }
						      label={name}
						      labelPlacement="end"
                				   />
              					 </Typography>
            				       </CardContent>
          				      )
        				    })}
      					  </Card>
    					</div >
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
						>Deploy</Button>
					</div>
					
				</form>
				</Paper>
			</Grid>
		</React.Fragment>
    );
}

export default (withStyles(styles)(DeployBuilderForm));
