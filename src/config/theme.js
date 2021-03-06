import { createMuiTheme } from "@material-ui/core/styles";

export const colors = {
  lightBlue: "#00cccc",
  darkBlue: "#1f1e32",
  orange: "#ff5900",
  lightGrey: "#e6e6e6",
  mediumGrey: "#d1d1d1",
};

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.darkBlue },
    secondary: { main: colors.orange },
  },
});

export default theme;
