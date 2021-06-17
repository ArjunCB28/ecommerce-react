import { makeStyles } from '@material-ui/core/styles'
import { FullscreenExit } from '@material-ui/icons';

export default makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    media: {
        height: 0,
        paddingTop: '50%'
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));
