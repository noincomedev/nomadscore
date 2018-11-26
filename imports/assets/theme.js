import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#673ab7"
    },
    secondary: {
      main: "#651fff"
    },
    custom: {
      facebookBlue: "#3b5998",
      accent: "#1DE9B6"
    }
  },
  overrides: {
    MuiButton: {
      contained: {
        borderRadius: 50
      }
    },
    MuiOutlinedInput: {
      input: {
        color: "#FFFF",
        background: "#333333"
      }
    }
  }
});
