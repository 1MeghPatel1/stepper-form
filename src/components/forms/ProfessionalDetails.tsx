import { Stack, Typography } from "@mui/material";
import { pxToRem } from "../../utils/helper";

const ProfessionalDetails = () => {
	return (
		<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			mt={`${pxToRem(20)}rem`}
		>
			<Typography variant="h6" component="h1">
				Professional Details
			</Typography>
		</Stack>
	);
};

export default ProfessionalDetails;
