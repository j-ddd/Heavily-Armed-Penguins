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

const Builders = ({ classes, ...props }) => {
    return (
        <React.Fragment>
            <PageTitle title="Builders" />
            <Grid container spacing={4}>
                <DataTable />
            </Grid>
        </React.Fragment>
    );
}

export default (withStyles(styles)(Builders));
