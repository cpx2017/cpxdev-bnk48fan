import { createMuiTheme as createTheme } from '@material-ui/core';

const theme = createTheme({
    typography: {
        fontFamily: ['Anakotmai', 'san-serif'].join(',')
    },
    palette: {
      primary: {
          main: "rgb(203, 150, 194)",
        },
        secondary: {
            main: "#fff",
          },
    },
});

export default theme;