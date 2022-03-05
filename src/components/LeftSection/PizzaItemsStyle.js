import { makeStyles } from "@mui/material/styles";

export default makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
		// marginLeft: "15px",
	},
	root: {
		flexGrow: 1,
	},
}));
