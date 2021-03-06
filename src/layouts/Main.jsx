import React, { useState } from "react";
import { Nav } from "../components/layout";
import "../assets/css/global.css";
import theme from "../config/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  spacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const MainLayout = ({ children }) => {
  const [searchTerms, setSearchTerms] = useState([]);
  const handleSearch = (val) => {
    setSearchTerms(val);
  };

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Nav handleSearch={handleSearch} />
        <main className={classes.content}>
          <div className={classes.spacer} />
          {React.cloneElement(children, { searchTerms })}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
