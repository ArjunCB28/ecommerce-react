import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    media: {
        height: 0,
        paddingTop: '50%',
        backgroundSize: 'contain'
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
