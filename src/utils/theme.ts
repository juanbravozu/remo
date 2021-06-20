import { createMuiTheme } from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#E787AB',
            main: '#9E51BF',
            dark: '#7E3A8B',
            contrastText: '#FFFFFF'
        },
        secondary: {
            light: '#FFF5F5',
            dark: '#e26468',
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