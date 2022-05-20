import React, { useEffect, useState } from "react";
import Layout from "./Components/layout";
// import { deployment_job } from "./Components/mock_data";
// import { tasks } from "./Components/mock_tasks";
import { tasks } from "./MockData/mock_tasks";

const Wizard = () => {
  const [state, setState] = useState();
  const [rows, setRows] = useState();
  const [steps, setSteps] = useState();
  const [activeStep, setActiveStep] = useState();
  const [review, setReview] = useState();
  const [jobId, setJobId] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // console.log(rows);
  const cleanLabel = str => {
    // str = str
    //   .toLowerCase()
    //   .split(" ")
    //   .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    //   .join(" ");

    //str = str.charAt(0).toUpperCase() + str.slice(1);
    return str.replace(/_/g, " ");
  };

  useEffect(() => {
    setJobId(tasks.job_id);
    setState(tasks);
    setRows(tasks.rows);
    setActiveStep(0);
    const userInputSteps = () => {
      var userinput_required_tasks = [];
      for (var task in tasks.rows) {
        if (tasks.rows[task].userinput_required) {
          userinput_required_tasks.push(tasks.rows[task]);
        }
      }
      for (var config in userinput_required_tasks) {
        for (var currTask in userinput_required_tasks[config].job_object.schema
          .properties) {
          var fieldLabel =
            userinput_required_tasks[config].job_object.schema.properties[
              currTask
            ].title;
          var cleanTitle = cleanLabel(fieldLabel);
          var cleanConfigTitle = cleanLabel(
            userinput_required_tasks[config].job_object.schema.title
          );
          userinput_required_tasks[
            config
          ].job_object.schema.title = cleanConfigTitle;
          userinput_required_tasks[config].job_object.schema.properties[
            currTask
          ].title = cleanTitle;
        }
      }
      // console.log(userinput_required_tasks);
      return userinput_required_tasks;
    };
    var theSteps = userInputSteps();
    setSteps(theSteps ? theSteps : []);

    // axios.get(LOCAL_URL + `/dbase/job/${}`)

    // setRows(...rows, { formData: })
  }, []);

  return (
    <Layout
      state={state}
      setState={setState}
      rows={rows}
      setRows={setRows}
      steps={steps}
      setSteps={setSteps}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      review={review}
      setReview={setReview}
      showErrorList={false}
      showConfirmation={showConfirmation}
      setShowConfirmation={setShowConfirmation}
      jobId={jobId}
      success={success}
      setSuccess={setSuccess}
      loading={loading}
      setLoading={setLoading}
    />
  );
};

export default Wizard;
