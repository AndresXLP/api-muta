import { StatusCodes } from 'http-status-codes';
import {
  BindCollectionData,
  getIDFromParams,
  getLimitSkipSearch,
  getPaginationData,
  getResponse,
  getResponseError,
  validateNumber,
} from '../../GlobalFunctions/GlobalFunctions';
import { GetMaterialByID } from '../../Services/materials';
import {
  CreateCollection,
  DeleteCollection,
  GetAllCollections,
  GetCollectionByID,
  UpdateCollection,
} from '../../Services/collections';

const path = 'src/Controllers/Collections/CollectionController';
export async function createCollection(req, res) {
  try {
    const newCollectionData = BindCollectionData(req.body, 0);
    if (newCollectionData.errors.length > 0) {
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        errors: newCollectionData.errors,
      });
    }

    const materialExist = await GetMaterialByID(newCollectionData.materialId);
    if (!materialExist) {
      return getResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        msg: 'Material id not exist',
      });
    }

    const newCollection = await CreateCollection(newCollectionData);
    return getResponse(res, {
      statusCode: StatusCodes.CREATED,
      data: newCollection,
    });
  } catch (e) {
    return getResponseError(res, e, `${path}/createCollection()`);
  }
}

export async function getCollection(req, res) {
  try {
    const id = getIDFromParams(req.params);
    if (!validateNumber(id) || !id) {
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        msg: 'The collection id are required a number',
      });
    }

    const collectionExist = await GetCollectionByID(id);
    if (!collectionExist) {
      return getResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        msg: 'This Collection id not exist',
      });
    }

    return getResponse(res, {
      statusCode: StatusCodes.OK,
      data: collectionExist,
    });
  } catch (e) {
    return getResponseError(res, e, `${path}/getCollection()`);
  }
}

export async function getAllCollections(req, res) {
  try {
    const pagination = getLimitSkipSearch(req.query);
    const allCollections = await GetAllCollections(pagination);

    return getResponse(res, {
      statusCode: StatusCodes.OK,
      data: getPaginationData(allCollections, pagination.page, pagination.limit),
    });
  } catch (e) {
    return getResponseError(res, e, `${path}/getAllCollections()`);
  }
}

export async function updateCollection(req, res) {
  try {
    const id = getIDFromParams(req.params);
    if (!validateNumber(id) || !id) {
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        msg: 'The collection id are required a number',
      });
    }

    const updateData = BindCollectionData(req.body, 1);
    if (updateData.errors.length > 0) {
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        errors: updateData.errors,
      });
    }

    const collectionExist = await GetCollectionByID(id);
    if (!collectionExist) {
      return getResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        msg: 'This Collection id not exist',
      });
    }

    await UpdateCollection(id, updateData);
    return getResponse(res, {
      statusCode: StatusCodes.OK,
      msg: 'Collection updated successfully',
    });
  } catch (e) {
    return getResponseError(res, e, `${path}/updateCollection()`);
  }
}

export async function deleteCollection(req, res) {
  try {
    const id = getIDFromParams(req.params);
    if (!validateNumber(id) || !id) {
      return getResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        msg: 'The collection id are required a number',
      });
    }

    const collectionExist = await GetCollectionByID(id);
    if (!collectionExist) {
      return getResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        msg: 'This Collection id not exist',
      });
    }

    await DeleteCollection(id);
    return getResponse(res, {
      statusCode: StatusCodes.OK,
      msg: 'Collection deleted successfully',
    });
  } catch (e) {
    return getResponseError(res, e, `${path}/deleteCollection()`);
  }
}
export default {
  createCollection,
  getCollection,
  getAllCollections,
  updateCollection,
};
