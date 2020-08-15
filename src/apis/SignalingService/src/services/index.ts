import searchRoutes from "./search/routes";
import healthCheckRoutes from "./health-check/routes";

var routes = searchRoutes.concat(healthCheckRoutes);

export default [...routes];
