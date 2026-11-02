import React, { useEffect, useState, useContext } from "react";
import { Paper, withStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, 
            IconButton, TextField } from '@material-ui/core';
import Pagination from './Pagination'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import { Link } from "react-router-dom";
import ConfirmDelete from './ConfirmDelete'
import { BuilderContext } from "../context/BuilderContext";

const styles = theme => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(0)
    },
    row: {
        '& > *': {
          borderBottom: 'unset',
          height: 'unset'
        },
    }
})

const DataTable = ({ classes, ...props }) => {
    const { builders, meta, fetchBuilders, deleteBuilder} = useContext(BuilderContext)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
	let [ name, setName ] = useState("")
    
    useEffect(() => {
        fetchBuilders(1, rowsPerPage)
    }, [])

    const handleChangePage = async (event, newPage) => {
        await setPage(newPage);
        fetchBuilders(newPage + 1, rowsPerPage)
    };

    const handleChangeRowsPerPage = async (event) => {
        if (event.target.value){
            const val = parseInt(event.target.value, 10)
            await setRowsPerPage(val);
            await setPage(0);
            fetchBuilders(1, val)
        }
    };

	const searchChange = async (event) => {
		const { value } = event.target
		name = value
		await setName(value)
		fetchBuilders(1, rowsPerPage,  value, value)
    }
    
    const refresh = async () => {
        await setPage(0);
        fetchBuilders(1, rowsPerPage)
    }

    return (
        <TableContainer component={Paper} className={classes.paper} >
            <div className="table-header" >
                <div className="table-filter" >
                    <TextField
                        name="search"
                        variant="outlined"
                        label="Search"
                        value={name}
                        onChange={searchChange}
                        autoComplete="off"
                    />
                </div>
            </div>

            <Table aria-label="table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight:'600'}}>Name</TableCell>
                        <TableCell style={{fontWeight:'600'}}>Deployed T/F</TableCell>
                        <TableCell align="right" width="250"> 
                            <div className="cell-add">
                                <Link to="/admin/builder-context/add">
                                    <IconButton color="primary">
                                        <AddCircleIcon />
                                    </IconButton>
                                </Link>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody  style={{ height: "150px", overflow: "auto" }} >
                    {builders && builders.map((row, index) => (
                        <TableRow className={classes.row} key={index}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.deployed}
                            </TableCell>
                            <TableCell align="right" width="375">
                                <div className="cell-button">
			    	<Link to={`/admin/builder-context/deploy/${row.id}`}>
                                    <IconButton color="primary">
                                        <CallSplitIcon />
                                    </IconButton>
                                </Link>
                                <Link to={`/admin/builder-context/edit/${row.id}`}>
                                    <IconButton color="primary">
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                <ConfirmDelete
                                    title="Delete Confirmation"
                                    message="Are you sure want to delete this record?"
                                    id={row.id}
                                    deleteBuilder={deleteBuilder} 
                                    refresh={refresh}
                                />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}    
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <Pagination 
                            handleChangePage={handleChangePage} 
                            handleChangeRowsPerPage={handleChangeRowsPerPage} 
                            count={meta.totalDocs || 0}
                            page={page}
                            rowsPerPage={rowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>

        </TableContainer>
    );
}

export default (withStyles(styles)(DataTable));
