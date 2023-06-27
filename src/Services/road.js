export function getOptimumRoad({ materialList, limitWeight }) {
  const materialsAccepted = ['PLÁSTICO', 'CARTÓN', 'VIDRIO', 'METALES'];

  return materialList
    .filter((material) => materialsAccepted.includes(material.name) && material.weight <= limitWeight)
    .sort((a, b) => b.weight - a.weight)
    .map((material) => {
      const mat = material;
      mat.price *= mat.weight;

      return mat;
    });
}

export default {
  getOptimumRoad,
};
