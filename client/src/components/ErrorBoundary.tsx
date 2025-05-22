import { Box } from "@mui/material";
import { useRouteError } from "react-router";

const ErrorBoundary = () => {
  const error = useRouteError();
  return <Box>{error instanceof Error && error.message}</Box>;
};

export default ErrorBoundary;
