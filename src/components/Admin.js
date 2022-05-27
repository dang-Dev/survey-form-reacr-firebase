import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserAuth } from "../context/UserAuthContext";
import Grid from "@mui/material/Grid";
import CardItem from "./CardItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";


function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Admin = (props) => {
  const { logOut } = useUserAuth();
  const [results, setResults] = useState([]);

  // fetch result list from firebase
  useEffect(() => {
    let isMounted = true;
    const q = query(collection(db, "surveys"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      if (isMounted) {
        setResults(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  /* DELETE */
  const deleteSurvey = (id) => {
    const surveyDoc = doc(db, "surveys", id);
    deleteDoc(surveyDoc);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar sx={{ p: { md: 0, sm: 0, lg: 0 } }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              STUDENT SURVEY RESULTS LIST
            </Typography>
            <Button
              onClick={logOut}
              color="inherit"
              variant="outlined"
              endIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container maxWidth="lg">
        <Box sx={{ my: 2 }}>
          <Box sx={{ flexGrow: 1, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>View Survey Questionnaire</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Q1. Have you been satisfied with the school's response to
                      the corona virus crisis?
                    </Typography>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Q2. Are you concerned about contracting COVID-19 by
                      attending class?
                    </Typography>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Q3. Are you concerned about exposing an elderly or
                      immunocompromised family member to the virus by bringing
                      it from class?
                    </Typography>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Q4. Do you think that COVID-19 concerns impact your
                      ability to learn/study?
                    </Typography>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Q5. Did you fill you had the necessary support and
                      resources you needed to effectively study from home during
                      the corona virus crisis last school year?
                    </Typography>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Q6. Do you think you peers were engaged during virtual
                      classroom sessions?
                    </Typography>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Q7. Has distance learning made you less excited for
                      college?
                    </Typography>
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body1"
                      component="div"
                      gutterBottom
                    >
                      Q8. Do you think the grading scale should be adjusting for
                      students engaging in virtual learning?
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="h5">TOTAL RESULT: {results.length}</Typography>
                <Typography>Student survey result</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {results.length > 0 ? (
                results.map((value) => (
                  <CardItem key={value.id} result={value} deleteSurvey={deleteSurvey} />
                ))
              ): <Typography sx={{textAlign:"center"}} component="div" gutterBottom>{"No records found!"}</Typography>}
            </Grid>
          </Box>
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};

export default Admin;
