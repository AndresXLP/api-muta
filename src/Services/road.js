export function getOptimumRoad({ materialList, limitWeight }) {
  const materialsAccepted = [
    'PLÁSTICO', 'CARTÓN', 'VIDRIO', 'METALES'
  ]


  return materialList
    .filter(material => materialsAccepted.includes(material.name) && material.weight <= limitWeight)
    .sort((a, b) => b.weight - a.weight)
    .map(material => {
      material.price = material.price * material.weight
      return material
    })
}

export default {
  getOptimumRoad
}
