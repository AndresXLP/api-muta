import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

const flag = ['Create', 'Update'];

export function getResponse(res, dataResponse) {
  const { statusCode, data, token, msg, errors, err } = dataResponse;

  return res.status(statusCode).json({
    data,
    token,
    msg,
    errors,
    err,
  });
}

export function getPaginationData(data, page, limit) {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPage = Math.ceil(totalItems / limit);

  return { totalItems, items, currentPage, totalPage };
}

export function BindUserData(req) {
  const { user_name: userName, password } = req.body;
  const errors = [];
  if (!userName) {
    errors.push('User Name are required');
  }
  if (!password) {
    errors.push('Password are required');
  }
  return { userName, password, errors };
}

export function validateNumber(num) {
  if (num < 0) return false;
  return typeof num === 'number';
}

export function validateString(str) {
  return typeof str === 'string';
}

export function getIDFromParams(params) {
  const { id } = params;
  return Number.parseInt(id.toString(), 10);
}

export function getLimitSkipSearch(data) {
  const { limit, page } = data;
  let retLimit = 10;
  let retSkip = 0;
  const ret = {
    limit: undefined,
    offset: undefined,
    page,
  };
  // limit
  if (/[0-9]/.test(`${limit}`)) {
    const x = Number.parseInt(limit.toString(), 10);
    if (x > 0) retLimit = x;
  }
  ret.limit = retLimit;

  if (/[0-9]/.test(`${page}`)) {
    const y = Number.parseInt(page.toString(), 10);
    if (y >= 1) retSkip = (y - 1) * retLimit;
  }
  ret.offset = retSkip;

  return ret;
}

export function BindMaterialData(body, indexFlag = -1) {
  const { material_name: name, material_weight: weight, material_price: price } = body;
  const ret = {
    name: undefined,
    weight: undefined,
    price: undefined,
    errors: [],
  };

  if ((flag[indexFlag] === 'Create' && !name) || (name && !validateString(name)))
    ret.errors.push('Material name are required text');
  else ret.name = name && name.toUpperCase();

  if ((flag[indexFlag] === 'Create' && !weight) || (weight && !validateNumber(weight)))
    ret.errors.push('Material weight are required float number');
  else ret.weight = weight && parseFloat(weight);

  if ((flag[indexFlag] === 'Create' && !price) || (price && !validateNumber(price)))
    ret.errors.push('Material price are required float number');
  else ret.price = price && parseFloat(price);

  return ret;
}

export function validateDate(date) {
  return dayjs(date).isValid();
}

export function BindCollectionData(body, indexFlag = -1) {
  const { material_id: materialId, amount_collected: amountCollected, date_collection: dateCollection } = body;
  const ret = {
    materialId: undefined,
    amountCollected: undefined,
    dateCollection: undefined,
    errors: [],
  };

  if ((flag[indexFlag] === 'Create' && !materialId) || (materialId && !validateNumber(materialId)))
    ret.errors.push('Material ID are required number');
  else ret.materialId = materialId;

  if ((flag[indexFlag] === 'Create' && !amountCollected) || (amountCollected && !validateNumber(amountCollected)))
    ret.errors.push('Amount collected are required number');
  else ret.amountCollected = amountCollected;

  if ((flag[indexFlag] === 'Create' && !dateCollection) || (dateCollection && !validateDate(dateCollection)))
    ret.errors.push('Date collection are required date e.j: 2020-01-01T20:15:23Z');
  else ret.dateCollection = dateCollection && dayjs(dateCollection).format('YYYY-MM-DD HH:mm:ss');

  return ret;
}

export async function ComparePassword(dbPassword, clientPassword) {
  const isMatch = await bcrypt.compare(dbPassword, clientPassword);
  return isMatch;
}

export function generateJWT(payload) {
  return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
}

export function BindRouteData(body) {
  const { material_list: materialList, limit_weight: limitWeight } = body;
  const ret = {
    materialList: [],
    limitWeight: undefined,
    errors: [],
  }

  if (!materialList || !materialList.length) {
    ret.errors.push('Material list are required');
  }

  if (!limitWeight || !validateNumber(limitWeight)) {
    ret.errors.push('Limit weight are required number');
  }
  ret.limitWeight = parseFloat(limitWeight)

  if (materialList && materialList.length > 0) {
    materialList.forEach((material, idx)=> {
      const { name, weight, price } = material;
      if (!name || !validateString(name)) {
        ret.errors.push(`Material in pos[${idx}], name are required valid text`);
      }

      if (!weight || !validateNumber(weight)) {
        ret.errors.push(`Material [${name.toUpperCase()}] weight are required decimal number`);
      }
      if (!price || !validateNumber(price)) {
        ret.errors.push(`Material [${name.toUpperCase()}] price are required decimal number`);
      }
      if (name && weight && price)
        ret.materialList.push({
          name: name.toUpperCase(),
          weight: parseFloat(weight),
          price: parseFloat(price),
        });
    })
  }
  return ret;
}

export default {
  BindUserData,
  validateString,
  getResponse,
  BindMaterialData,
  generateJWT,
  ComparePassword,
  validateNumber,
  BindCollectionData,
  BindRouteData,
};
