import React, { useState, Fragment } from "react";
import { TableCell, TableRow, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import { Link } from "react-router-dom";
import '../style.css';
import ConfirmDelete from './ConfirmDelete'

const useStyles = makeStyles({
    row: {
        '& > *': {
          borderBottom: 'unset',
          height: 'unset'
        },
    }
});

const Row = (props) => {
    const { row } = props;
    const [ openConfirmDelete, setOpenConfirmDelete ] = useState(false);
    const classes = useStyles();

    const onDelete = () => {
      props.onDelete(row.id)
    }

    return (
      <Fragment>
        <TableRow className={classes.row}>
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
                onDelete={onDelete} 
                {...{ openConfirmDelete, setOpenConfirmDelete }} 
              />
            </div>
          </TableCell>
        </TableRow>
      </Fragment>
    );
}

export default Row;
