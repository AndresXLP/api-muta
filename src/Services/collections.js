import dayjs from 'dayjs';
import { Collections } from '../Models/collections';

const path = 'Services/collections';

export async function CreateCollection({ materialId, amountCollected, dateCollection }) {
  try {
    return await Collections.create({ materialId, amountCollected, dateCollection });
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/CreateCollection()`);
    throw new Error(e);
  }
}

export async function GetCollectionByName(name) {
  try {
    return await Collections.findOne({ where: { name, deletedAt: null } });
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/GetCollectionByName()`);
    throw new Error(e);
  }
}

export async function GetCollectionByID(id) {
  try {
    return await Collections.findOne({ where: { id, deletedAt: null } });
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/GetCollectionByID()`);
    throw new Error(e);
  }
}

export async function GetAllCollections({ limit, offset }) {
  try {
    return await Collections.findAndCountAll({ where: { deletedAt: null }, limit, offset });
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/GetAllCollections()`);
    throw new Error(e);
  }
}

export async function UpdateCollection(id, { materialId, amountCollected, dateCollection }) {
  try {
    return await Collections.update(
      { materialId, amountCollected, dateCollection },
      { where: { id, deletedAt: null } }
    );
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/UpdateCollection()`);
    throw new Error(e);
  }
}

export async function DeleteCollection(id) {
  try {
    return await Collections.update({ deletedAt: dayjs().toDate() }, { where: { id, deletedAt: null } });
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/DeleteCollection()`);
    throw new Error(e);
  }
}

export default {
  CreateCollection,
  GetCollectionByName,
  GetCollectionByID,
  UpdateCollection,
  DeleteCollection,
};
