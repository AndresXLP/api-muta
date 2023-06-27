import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export function getIDFromParams(req) {
  const { id } = req.params;
  return Number.parseInt(id.toString(), 10);
}

export function getLimitSkipSearch(data) {
  const { limit, page } = data;
  console.log(limit, page);
  let retLimit = 10;
  let retSkip = 0;

  // limit
  if (/[0-9]/.test(`${limit}`)) {
    const x = Number.parseInt(limit.toString(), 10);
    if (x > 0) retLimit = x;
  }

  if (/[0-9]/.test(`${page}`)) {
    const y = Number.parseInt(page.toString(), 10);
    if (y >= 1) retSkip = (y - 1) * retLimit;
  }

  return { limit: retLimit, offset: retSkip, page };
}

export function BindMaterialData(req) {
  const { material_name: name, material_weight: weight, material_price: price } = req.body;
  const errors = [];

  if (!name || !validateString(name)) {
    errors.push('Material name are required text');
  }

  if (!weight || !validateNumber(weight)) {
    errors.push('Material weight are required float number');
  }

  if (!price || !validateNumber(price)) {
    errors.push('Material price are required float number');
  }

  return { name: name.toUpperCase(), weight: parseFloat(weight), price: parseFloat(price), errors };
}

export function BindUpdateMaterialData(req) {
  const { material_name: name, material_weight: weight, material_price: price } = req.body;
  const ret = {
    name: undefined,
    weight: undefined,
    price: undefined,
    errors: [],
  };
  if (name) {
    if (!validateString(name)) {
      ret.errors.push('Material name are required text');
    }
    ret.name = name.toUpperCase();
  }

  if (weight) {
    if (!validateNumber(weight)) {
      ret.errors.push('Material weight are required float number');
    }
    ret.weight = parseFloat(weight);
  }

  if (price) {
    if (!validateNumber(price)) {
      ret.errors.push('Material price are required float number');
    }
    ret.price = parseFloat(price);
  }
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

export default {
  BindUserData,
  validateString,
  getResponse,
  BindMaterialData,
  generateJWT,
  ComparePassword,
  validateNumber,
  BindUpdateMaterialData,
};
