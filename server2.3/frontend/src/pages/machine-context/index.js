import React from "react";
import { Grid, withStyles } from '@material-ui/core';

import DataTable from './table/DataTable'
import PageTitle from "../../components/PageTitle/PageTitle";

const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    }
})

const Machines = ({ classes, ...props }) => {
    return (
        <React.Fragment>
            <PageTitle title="Machines" />
            <Grid container spacing={4}>
                <DataTable />
            </Grid>
        </React.Fragment>
    );
}

export default (withStyles(styles)(Machines));
