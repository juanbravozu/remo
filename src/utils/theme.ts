import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#D981C0',
            main: '#A65290',
            dark: '#752462',
            contrastText: '#FCF8FB'
        },
        secondary: {
            main: '#FEBE9A',
            contrastText: '#44223C'
        }
    },
    typography: {
        fontFamily: "'Montserrat', sans-serif",
        htmlFontSize: 10
    }
});

export default theme;