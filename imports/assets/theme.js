import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ["Comfortaa", "-apple-system"].join(",")
  },
  palette: {
    primary: {
      light: "#2C2F30",
      main: "#2C2F33",
      dark: "#23272A"
    },
    secondary: {
      main: "#7b1fa2",
      dark: "#482880"
    },
    custom: {
      facebookBlue: "#3b5998",
      accent: "#1de9b6"
    }
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontFamily: "Fredoka One"
      },
      h2: {
        fontFamily: "Fredoka One"
      },
      h3: {
        fontFamily: "Fredoka One"
      },
      h4: {
        fontFamily: "Fredoka One"
      }
    },
    MuiButton: {
      contained: {
        borderRadius: 8
      }
    }
  }
});
