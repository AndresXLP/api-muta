import { StatusCodes } from 'http-status-codes';
import {
  BindMaterialData,
  getIDFromParams,
  getLimitSkipSearch,
  getPaginationData,
  getResponse,
  validateNumber,
} from '../../GlobalFunctions/GlobalFunctions';
import {
  CreateMaterial,
  DeleteMaterial,
  GetAllMaterials,
  GetMaterialByID,
  GetMaterialByName,
  UpdateMaterial,
} from '../../Services/materials';

export async function createMaterial(req, res) {
  try {
    const materialData = BindMaterialData(req.body, 0);
    if (materialData.errors.length > 0)
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        errors: materialData.errors,
      });

    const materialExist = await GetMaterialByName(materialData.name);
    if (materialExist)
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        msg: 'THis material name already exist',
      });

    const newMaterial = await CreateMaterial(materialData);
    return getResponse(res, {
      statusCode: StatusCodes.CREATED,
      msg: 'New Material created successfully',
      data: newMaterial,
    });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getMaterial(req, res) {
  try {
    const id = getIDFromParams(req.params);
    if (!validateNumber(id) || !id) {
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        msg: 'The material id are required a number',
      });
    }

    const materialExist = await GetMaterialByID(id);
    if (!materialExist) {
      return getResponse(res, {
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        msg: 'This material id not exist',
      });
    }

    return getResponse(res, {
      statusCode: StatusCodes.OK,
      data: materialExist,
    });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getAllMaterials(req, res) {
  try {
    const pagination = getLimitSkipSearch(req.query);
    const allMaterials = await GetAllMaterials(pagination);
    return getResponse(res, {
      statusCode: StatusCodes.OK,
      data: getPaginationData(allMaterials, pagination.page, pagination.limit),
    });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function updateMaterial(req, res) {
  try {
    const id = getIDFromParams(req.params);
    if (!validateNumber(id) || !id) {
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        msg: 'The material id are required a number',
      });
    }

    const updateData = BindMaterialData(req.body);
    if (updateData.errors.length > 0)
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        errors: updateData.errors,
      });

    const materialExist = await GetMaterialByID(id);
    if (!materialExist) {
      return getResponse(res, {
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        msg: 'This material id not exist',
      });
    }

    await UpdateMaterial(id, updateData);

    return getResponse(res, {
      statusCode: StatusCodes.ACCEPTED,
      msg: 'Material updated successfully',
    });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deleteMaterial(req, res) {
  try {
    const id = getIDFromParams(req.params);
    if (!validateNumber(id) || !id) {
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        msg: 'The material id are required a number',
      });
    }

    const materialExist = await GetMaterialByID(id);
    if (!materialExist) {
      return getResponse(res, {
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        msg: 'This material id not exist',
      });
    }

    await DeleteMaterial(materialExist.id);
    return getResponse(res, {
      statusCode: StatusCodes.ACCEPTED,
      msg: 'Material deleted successfully',
    });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default {
  createMaterial,
  getMaterial,
  getAllMaterials,
  updateMaterial,
};
