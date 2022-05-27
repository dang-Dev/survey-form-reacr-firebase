import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Link from "@mui/material/Link";

const genders = [
  {
    value: "MALE",
    label: "Male",
  },
  {
    value: "FEMALE",
    label: "Female",
  },
];

const Home = () => {
  const [gender, setGender] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleNewSurvey = () => {
    setIsAdd(!isAdd);
    setFname("");
    setLname("");
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  // CREATE OR ADD NEW SURVEY
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addDoc(collection(db, "surveys"), {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      age: data.get("age"),
      gender: data.get("gender"),
      question_1: data.get("radio-buttons-q1"),
      question_2: data.get("radio-buttons-q2"),
      question_3: data.get("radio-buttons-q3"),
      question_4: data.get("radio-buttons-q4"),
      question_5: data.get("radio-buttons-q5"),
      question_6: data.get("radio-buttons-q6"),
      question_7: data.get("radio-buttons-q7"),
      question_8: data.get("radio-buttons-q8"),
      createdAt: serverTimestamp(),
    });
    setIsAdd(!isAdd);
    setFname(data.get("firstName"));
    setLname(data.get("lastName"));
    console.log("SUBMIT");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        { isAdd ? (
          <>
            <Box sx={{ p: 4 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" component="div" gutterBottom>
                  {"THANK YOU"}
                </Typography>
                <Typography variant="h2" component="div" gutterBottom>{`${fname} ${lname}`}</Typography>
                <Typography variant="h6" component="div" gutterBottom>
                  {"Survey Completed! Click "}
                  <Link onClick={handleNewSurvey} sx={{ cursor: "pointer" }}>
                    here
                  </Link>
                  {" to home page."}
                </Typography>
                <Typography>
                  <CheckCircleIcon sx={{ fontSize: "100px", color:"green" }} />
                </Typography>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ bgcolor: "#e3f2fd", p: 4 }}>
              <Typography
                sx={{ textAlign: "center" }}
                variant="h4"
                component="div"
                gutterBottom
              >
                STUDENT COVID-19 SURVEY
              </Typography>
              <Divider variant="middle" />
              <Box
                sx={{ mt: 4, p: 2 }}
                component="form"
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2} rowSpacing={4}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="age"
                      label="Age"
                      name="age"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-select-gender"
                      select
                      label="Select Gender"
                      value={gender}
                      name="gender"
                      onChange={handleChangeGender}
                      fullWidth
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Have you been satisfied with the school's response to the
                      corona virus crisis?
                    </Typography>
                    <FormControl>
                      <RadioGroup name="radio-buttons-q1">
                        <FormControlLabel
                          value="yes"
                          control={<Radio required />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio required />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Are you concerned about contracting COVID-19 by attending
                      class?
                    </Typography>
                    <FormControl>
                      <RadioGroup name="radio-buttons-q2">
                        <FormControlLabel
                          value="yes"
                          control={<Radio required />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio required />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Are you concerned about exposing an elderly or
                      immunocompromised family member to the virus by bringing
                      it from class?
                    </Typography>
                    <FormControl>
                      <RadioGroup name="radio-buttons-q3">
                        <FormControlLabel
                          value="yes"
                          control={<Radio required />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio required />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Do you think that COVID-19 concerns impact your ability to
                      learn/study?
                    </Typography>
                    <FormControl>
                      <RadioGroup name="radio-buttons-q4">
                        <FormControlLabel
                          value="yes"
                          control={<Radio required />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio required />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Did you fill you had the necessary support and resources
                      you needed to effectively study from home during the
                      corona virus crisis last school year?
                    </Typography>
                    <FormControl>
                      <RadioGroup name="radio-buttons-q5">
                        <FormControlLabel
                          value="yes"
                          control={<Radio required />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio required />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Do you think you peers were engaged during virtual
                      classroom sessions?
                    </Typography>
                    <FormControl>
                      <RadioGroup name="radio-buttons-q6">
                        <FormControlLabel
                          value="yes"
                          control={<Radio required />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio required />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Has distance learning made you less excited for college?
                    </Typography>
                    <FormControl>
                      <RadioGroup name="radio-buttons-q7">
                        <FormControlLabel
                          value="yes"
                          control={<Radio required />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio required />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Do you think the grading scale should be adjusting for
                      students engaging in virtual learning?
                    </Typography>
                    <FormControl required={true}>
                      <RadioGroup name="radio-buttons-q8" required={true}>
                        <FormControlLabel
                          value="yes"
                          control={<Radio required />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio required />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  Submit Survey
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Home;
