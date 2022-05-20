import React from "react";
// import Form from "react-jsonschema-form-bs4";
// import Form from "react-jsonschema-form-mui";
// import SchemaForm from "jsonschema-form-for-material-ui";
// import MaterialJsonSchemaForm from "react-jsonschema-form-material-ui";
// import { MuiForm } from "rjsf-material-ui";
import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import SummaryTable from "./summary_table";
import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@material-ui/icons/Send";
import HomeIcon from "@material-ui/icons/Home";
import ViewListIcon from "@material-ui/icons/ViewList";
import ConfirmationPopUp from "./confirmation_modal";
import { SnackbarProvider, useSnackbar } from "notistack";

const Form = withTheme(MuiTheme);

const useStyles = makeStyles(theme => ({
  formControl: {
    width: "75%",
    margin: "auto"
  },
  buttonDeployLater: {
    margin: "20px 20px 0px 0px"
  },
  buttonDeployNow: {
    margin: "20px 0px 0px 20px",
    float: "right"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  title: {
    margin: 20,
    fontSize: 20,
    fontWeight: "bold"
  }
}));

const DynamicFormPaper = props => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    displayForm,
    showErrorList,
    schema,
    uiSchema,
    formData,
    fields,
    onChange,
    onError,
    activeStep,
    setSteps,
    setActiveStep,
    steps,
    showConfirmation,
    setShowConfirmation,
    loading,
    setLoading,
    success,
    setSuccess
  } = props;

  const timer = React.useRef();

  const cleanLabel = str => {
    // str = str
    //   .toLowerCase()
    //   .split(" ")
    //   .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    //   .join(" ");
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str.replace(/_/g, " ");
  };

  const FieldTemplate = props => {
    const {
      //id, required, label,
      errors,
      children
    } = props;
    return (
      <div className="myfield">
        {/* <label htmlFor={id}>
          {cleanLabel(label)}
          {required ? "*" : null}          
        </label> */}
        {children}
        {errors}
      </div>
    );
  };

  const handleNextStep = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        setActiveStep(prevActiveStep => {
          return prevActiveStep + 1;
        });
      }, 500);
    }
  };

  const handleOnSubmit = (fD, e) => {
    setSteps(prevValues => {
      var tempValues = [];

      prevValues[activeStep].job_object.formData = fD.formData;
      tempValues = prevValues;
      return Object.create(tempValues);
    });
    handleNextStep();
  };

  const handleHome = () => {
    console.log("Deploy later");
  };

  const handleMyJobs = () => {
    console.log("My Jobs");
  };

  const handleDeployNow = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDeploy = () => {
    alert("deploy and redirect to some page");
  };

  const handleReturnToWizard = () => {
    setActiveStep(0);
  };

  const handleClose = () => {
    setShowConfirmation(false);
  };

  const handleResetOnClick = () => {
    //set all field values to null by setting formData to and empty object {}
    setSteps(prevValues => {
      prevValues[activeStep].job_object.formData = {};
      return Object.create(prevValues);
    });
  };

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

  //Define some default actions if nothing is passed via props
  return (
    <React.Fragment>
      {displayForm && (
        <Form
          id="deviceform"
          // liveValidate={true}
          noHtml5Validate={true}
          noValidate={true}
          showErrorList={showErrorList}
          schema={schema ? schema : {}}
          formData={formData ? formData : {}}
          uiSchema={uiSchema ? uiSchema : {}}
          FieldTemplate={FieldTemplate}
          fields={fields}
          onChange={onChange}
          onSubmit={handleOnSubmit}
          onError={onError}
        >
          <Button
            color="default"
            variant="contained"
            onClick={handleResetOnClick}
          >
            Reset
          </Button>
          <Button
            id="DynamicFormsButton"
            color="default"
            variant="contained"
            // onClick={processSubmit}
            type="submit"
            hidden={true}
          >
            Submit
          </Button>
        </Form>
      )}
      {!displayForm && (
        <Paper square elevation={0}>
          <SummaryTable steps={steps} />
          <Button
            onClick={handleReturnToWizard}
            className={classes.buttonDeployLater}
            variant="contained"
            color="primary"
          >
            <EditIcon className={classes.extendedIcon} />
            Edit Job
          </Button>
          <Button
            onClick={handleMyJobs}
            variant="contained"
            color="primary"
            className={classes.buttonDeployLater}
          >
            <ViewListIcon className={classes.extendedIcon} />
            My Jobs
          </Button>
          <Button
            onClick={handleHome}
            variant="contained"
            color="primary"
            className={classes.buttonDeployLater}
          >
            <HomeIcon className={classes.extendedIcon} />
            Home
          </Button>
          <Button
            onClick={handleDeployNow}
            className={classes.buttonDeployNow}
            variant="contained"
            color="primary"
          >
            <SendIcon className={classes.extendedIcon} />
            Deploy Now
          </Button>
          <ConfirmationPopUp
            showConfirmation={showConfirmation}
            setShowConfirmation={showConfirmation}
            handleConfirmDeploy={handleConfirmDeploy}
            handleClose={handleClose}
          />
        </Paper>
      )}
    </React.Fragment>
  );
};

const DynamicForm = props => {
  const {
    displayForm,
    showErrorList,
    schema,
    uiSchema,
    formData,
    fields,
    onChange,
    onError,
    activeStep,
    setSteps,
    setActiveStep,
    steps,
    showConfirmation,
    setShowConfirmation,
    loading,
    setLoading,
    success,
    setSuccess
  } = props;
  return (
    <SnackbarProvider maxSnack={8} style={{ width: 380 }}>
      <DynamicFormPaper
        displayForm={displayForm}
        showErrorList={showErrorList}
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        fields={fields}
        onChange={onChange}
        onError={onError}
        activeStep={activeStep}
        setSteps={setSteps}
        setActiveStep={setActiveStep}
        steps={steps}
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        loading={loading}
        setLoading={setLoading}
        success={success}
        setSuccess={setSuccess}
      />
    </SnackbarProvider>
  );
};

export default DynamicForm;
