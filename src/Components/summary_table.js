import React, { Component, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { SnackbarProvider, useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { TextField } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  rowExpand: {
    backgroundColor: "#f7f7f7"
  },
  table: {
    boxShadow: "0px 0px 0px 0px",
    border: "1px solid #e3e3e3",
    borderRadius: "5px"
  }
}));

const Summary = props => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { steps } = props;

  const columns = [
    {
      name: "job_object.hostname",
      label: "Hostname",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "external_tool",
      label: "Tool",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "timestamp",
      label: "Timestamp",
      options: {
        filter: true,
        sort: true
      }
    }
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "stacked",
    selectableRows: "none",
    rowsPerPage: 10,
    print: false,
    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      var formData = steps[rowMeta.dataIndex].job_object.formData;

      return (
        <TableRow className={classes.rowExpand} boxShadow={5}>
          <TableCell colSpan={colSpan}>
            <Grid container>
              {Object.keys(formData).map((key, index) => {
                return (
                  <Grid item xs={3} key={index}>
                    <List key={index}>
                      <ListItem key={index}>
                        <TextField
                          name={key}
                          label={key}
                          value={
                            steps[rowMeta.dataIndex].job_object.formData[key]
                          }
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                );
              })}
            </Grid>
          </TableCell>
        </TableRow>
      ); //end of return
    }
  };

  useEffect(() => {
    // axios.get(`${LOCAL_URL}/dbase/inventory`)
    //     .then(( data ) => {
    //         const rows = data.data.data;
    //         setData(rows);
    //     }).catch(error => {
    //         handleClickVariant("There was an error contacting the database. Please contact administrator.", 'error');
    //     });
    handleClickVariant(
      "Job saved successfully. You can review and deploy this job now or you can locate the job at a later time in 'My Jobs'.",
      "info"
    );
  }, []);

  const action = key => (
    <React.Fragment>
      <Button
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        {"Dismiss"}
      </Button>
    </React.Fragment>
  );

  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right"
      },
      action,
      persist: true
    });
  };

  return (
    <MUIDataTable
      className={classes.table}
      title={"Review Workflows"}
      data={steps}
      columns={columns}
      options={options}
    />
  );
};

const SummaryTable = props => {
  const { steps } = props;
  return (
    <SnackbarProvider maxSnack={8} style={{ width: 380 }}>
      <Summary steps={steps} />
    </SnackbarProvider>
  );
};

export default SummaryTable;
