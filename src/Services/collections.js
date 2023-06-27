import dayjs from 'dayjs';
import { Collections } from '../Models/collections';

export async function CreateCollection({ materialId, amountCollected, dateCollection }) {
  try {
    return await Collections.create({ materialId, amountCollected, dateCollection });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function GetCollectionByName(name) {
  try {
    return await Collections.findOne({ where: { name, deletedAt: null } });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function GetCollectionByID(id) {
  try {
    return await Collections.findOne({ where: { id, deletedAt: null } });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function GetAllCollections({ limit, offset }) {
  try {
    return await Collections.findAndCountAll({ where: { deletedAt: null }, limit, offset });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function UpdateCollection(id, { materialId, amountCollected, dateCollection }) {
  try {
    return await Collections.update(
      { materialId, amountCollected, dateCollection },
      { where: { id, deletedAt: null } }
    );
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function DeleteCollection(id) {
  try {
    return await Collections.update({ deletedAt: dayjs().toDate() }, { where: { id, deletedAt: null } });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default {
  CreateCollection,
  GetCollectionByName,
  GetCollectionByID,
  UpdateCollection,
  DeleteCollection,
};
