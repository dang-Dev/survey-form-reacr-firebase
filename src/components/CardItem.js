import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  lineHeight: "60px",
  padding: "8px",
  background: "#84ffff",
}));
const ItemQ = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const CardItem = (props) => {
  const { result, deleteSurvey } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const newFormatDateTime = new Date(
    result.createdAt && result.createdAt.seconds * 1000
  );

  return (
      <>
    <Grid item xs={12} sm={12} md={4}>
      <Item>
        <Toolbar
          sx={{
            p: { md: 0, sm: 0, lg: 0 },
            minHeight: { md: 0, sm: 0, lg: 0 },
          }}
        >
          <Typography variant="h6" component="div">
            {`${result.firstName} ${result.lastName}`}
          </Typography>
        </Toolbar>
        {/* <Divider variant="fullWidth" /> */}
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          <b>Gender:</b> {result.gender}
        </Typography>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          <b>Age:</b> {result.age}
        </Typography>
        <Accordion
          sx={{ background: "#18ffff", borderRadius: "3px", border: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>View survey result</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={6}>
                  <ItemQ>
                    <Typography>QA1. {result.question_1}</Typography>
                  </ItemQ>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <ItemQ>
                    <Typography>QA2. {result.question_2}</Typography>
                  </ItemQ>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <ItemQ>
                    <Typography>QA3. {result.question_3}</Typography>
                  </ItemQ>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <ItemQ>
                    <Typography>QA4. {result.question_4}</Typography>
                  </ItemQ>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <ItemQ>
                    <Typography>QA5. {result.question_5}</Typography>
                  </ItemQ>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <ItemQ>
                    <Typography>QA6. {result.question_6}</Typography>
                  </ItemQ>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <ItemQ>
                    <Typography>QA7. {result.question_7}</Typography>
                  </ItemQ>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <ItemQ>
                    <Typography>QA8. {result.question_8}</Typography>
                  </ItemQ>
                </Grid>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Toolbar
          sx={{
            p: { md: 0, sm: 0, lg: 0 },
            minHeight: { md: 0, sm: 0, lg: 0 },
            mt: 2,
          }}
        >
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            {newFormatDateTime.toDateString() + " " + newFormatDateTime.toLocaleTimeString()}
          </Typography>
          <IconButton color="inherit" onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </Item>
    </Grid>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Do you want to delete survey with last name ${result.lastName}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Disagree</Button>
          <Button variant="outlined" onClick={()=>(deleteSurvey(result.id))} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardItem;
