import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  review: {
    // width: "100%"
  }
}));

const Review = props => {
  const classes = useStyles();

  useEffect(() => {
    var job_details_url = "https://localhost:5000/dbase/tasks";
    axios.fetch(job_details_url).then(({ data }) => {
      console.log(data);
      console.log("testing");
    });
  }, []);

  return (
    <React.Fragment>
      <Paper square elevation={0} className={classes.formControl} />
    </React.Fragment>
  );
};

export default Review;
