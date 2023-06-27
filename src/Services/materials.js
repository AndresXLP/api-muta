import dayjs from 'dayjs';
import { Materials } from '../Models/materials';

const path = 'Services/materials';

export async function CreateMaterial({ name, weight, price }) {
  try {
    return await Materials.create({ name, weight, price });
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/CreateMaterial()`);
    throw new Error(e);
  }
}

export async function GetMaterialByName(name) {
  try {
    return await Materials.findOne({ where: { name, deletedAt: null } });
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/GetMaterialByName()`);
    throw new Error(e);
  }
}

export async function GetMaterialByID(id) {
  try {
    return await Materials.findOne({ where: { id, deletedAt: null } });
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/GetMaterialByID()`);
    throw new Error(e);
  }
}

export async function GetAllMaterials({ limit, offset }) {
  try {
    return await Materials.findAndCountAll({ where: { deletedAt: null }, limit, offset });
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/GetAllMaterials()`);
    throw new Error(e);
  }
}

export async function UpdateMaterial(id, { name, weight, price }) {
  try {
    return await Materials.update({ name, weight, price }, { where: { id, deletedAt: null } });
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/UpdateMaterial()`);
    throw new Error(e);
  }
}

export async function DeleteMaterial(id) {
  try {
    return await Materials.update({ deletedAt: dayjs().toDate() }, { where: { id, deletedAt: null } });
  } catch (e) {
    console.error(`${dayjs().toISOString()} - ${path}/DeleteMaterial()`);
    throw new Error(e);
  }
}

export default {
  CreateMaterial,
  GetMaterialByName,
  GetMaterialByID,
  UpdateMaterial,
  DeleteMaterial,
};
