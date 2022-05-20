import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DeploymentStepper from "./deployment_stepper";
import DynamicForm from "./dynamic_form";
// import { deployment_job, CustomFieldTemplate } from "./mock_data";
// import { TextField } from "@material-ui/core";
// import { tasks } from "./mock_tasks";

import "typeface-roboto";

const useStyles = makeStyles((theme, props) => ({
  paper: {
    textAlign: "center",
    margin: theme.spacing(1, 1, 1, 0),
    border: "solid 1px #ccc"
    // minWidth: 100
  },
  paperform: {
    padding: theme.spacing(2),
    margin: props =>
      props.steps && props.activeStep < props.steps.length
        ? theme.spacing(1, 0, 1, 1)
        : "25px auto",
    border: "solid 1px #ccc",
    width: props =>
      props.steps && props.activeStep < props.steps.length ? "100%" : "75%"
  }
}));

/////////////////////////////////////////////////////////////// There was an attempt
// Define a custom component for handling the root position object
// class EnhancedTextField extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { ...formData };
//     console.log(this.state);
//   }

//   onChange(name) {
//     return event => {
//       this.setState(
//         {
//           [name]: parseFloat(event.target.value)
//         },
//         () => this.onChange(this.state)
//       );
//     };
//   }

//   render() {
//     // const {lat, lon} = this.state;
//     console.log("render");
//     return (
//       <TextField
//         id={this.state.id}
//         label={this.statelabel}
//         // type="email"
//         name={this.state.id}
//         margin="normal"
//         variant="outlined"
//       />
//     );
//   }
// }

// // Define the custom field component to use for the root object
// const uiSchema = { "ui:field": "etf" };

// // Define the custom field components to register; here our "geo"
// // custom field component
// const fields = { etf: EnhancedTextField };
///////////////////////////////////////////////////////////////

const Layout = props => {
  const classes = useStyles(props);
  const {
    state,
    setState,
    rows,
    setRows,
    steps,
    setSteps,
    activeStep,
    setActiveStep,
    showErrorList,
    showConfirmation,
    setShowConfirmation,
    success,
    setSuccess,
    loading,
    setLoading
  } = props;

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={true} style={{ paddingRight: 10 }}>
          <Paper className={classes.paperform}>
            <DynamicForm
              schema={
                steps && activeStep < steps.length
                  ? steps[activeStep].job_object.schema
                  : {}
              }
              uiSchema={
                steps && activeStep < steps.length
                  ? steps[activeStep].job_object.uiSchema
                  : {}
              }
              formData={
                steps && activeStep < steps.length
                  ? steps[activeStep].job_object.formData
                  : {}
              }
              // fields={fields}
              // onSubmit={onSubmit}
              displayForm={steps && activeStep < steps.length ? true : false}
              showErrorList={showErrorList}
              steps={steps}
              setSteps={setSteps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              showConfirmation={showConfirmation}
              setShowConfirmation={setShowConfirmation}
              success={success}
              setSuccess={setSuccess}
              loading={loading}
              setLoading={setLoading}
            />
          </Paper>
        </Grid>
        <Grid
          item
          xs={false}
          hidden={steps && activeStep < steps.length ? false : true}
        >
          <Paper className={classes.paper}>
            <DeploymentStepper
              state={steps ? state : {}}
              setState={setState}
              rows={rows ? rows : []}
              setRows={setRows}
              steps={steps ? steps : []}
              setSteps={setSteps}
              activeStep={activeStep ? activeStep : 0}
              setActiveStep={setActiveStep}
              showConfirmation={showConfirmation}
              setShowConfirmation={setShowConfirmation}
              success={success}
              setSuccess={setSuccess}
              loading={loading}
              setLoading={setLoading}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Layout;
