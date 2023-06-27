import {BindRouteData, getResponse} from "../../GlobalFunctions/GlobalFunctions";
import {StatusCodes} from "http-status-codes";
import {getOptimumRoad} from "../../Services/road";

export async function generateOptimumRoute(req, res) {
  const routeData = BindRouteData(req.body);
  if (routeData.errors.length > 0) {
    return getResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      errors: routeData.errors
    })
  }

  const optimumRoute = getOptimumRoad(routeData)

  return getResponse(res, {
    statusCode: StatusCodes.OK,
    msg: 'Optimum route generated successfully',
    data: optimumRoute
  })
}

export default {
  generateOptimumRoute,
}
