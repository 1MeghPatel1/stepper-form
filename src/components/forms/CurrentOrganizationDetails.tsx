import { Stack, Typography } from "@mui/material";
import { pxToRem } from "../../utils/helper";

const CurrentOrganizationDetails = () => {
	return (
		<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			mt={`${pxToRem(20)}rem`}
		>
			<Typography variant="h6" component="h1">
				Current Organisation Details
			</Typography>
		</Stack>
	);
};

export default CurrentOrganizationDetails;
