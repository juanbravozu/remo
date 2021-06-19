import { createMuiTheme } from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#9E51BF',
            main: '#A65290',
            dark: '#752462',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#FF777B',
            contrastText: '#FFFFFF'
        }
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        htmlFontSize: 10
    }
}, esES);

export default theme;