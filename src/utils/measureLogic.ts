import { BuildingData, Measure, Package } from '../types/types';

export function generateMeasures(data: BuildingData): Measure[] {
  const measures: Measure[] = [];

  // Wall insulation logic
  if (data.rcValueWall < 2.0 && data.hasCavityWall) {
    measures.push({
      id: 'wall-insulation',
      name: 'Spouwmuurisolatie',
      description: 'Isoleren van de spouwmuur voor betere warmteweerstand',
      savings: 500,
      cost: 2000,
      paybackTime: 4
    });
  }

  // Floor insulation logic
  if (data.rcValueFloor < 2.0 && data.hasCrawlSpace) {
    measures.push({
      id: 'floor-insulation',
      name: 'Vloerisolatie',
      description: 'Isoleren van de begane grondvloer via de kruipruimte',
      savings: 300,
      cost: 1800,
      paybackTime: 6
    });
  }

  // Roof insulation logic
  if (data.rcValueRoof < 2.0) {
    measures.push({
      id: 'roof-insulation',
      name: `${data.roofType === 'flat' ? 'Plat' : 'Hellend'} dak isolatie`,
      description: 'Isoleren van het dak voor minimaal warmteverlies',
      savings: 450,
      cost: 3500,
      paybackTime: 7.8
    });
  }

  // Boiler replacement logic
  if (data.boilerAge > 15) {
    measures.push({
      id: 'boiler-replacement',
      name: 'CV-ketel vervangen',
      description: 'Vervangen van de oude CV-ketel voor een energiezuinig exemplaar',
      savings: 300,
      cost: 2200,
      paybackTime: 7.3
    });
  }

  return measures;
}

export function generatePackages(measures: Measure[]): Package[] {
  const packages: Package[] = [];

  // Basic package - All measures with payback time < 5 years
  const basicMeasures = measures.filter(m => m.paybackTime < 5);
  if (basicMeasures.length > 0) {
    packages.push(createPackage('basic', 'Basis pakket', basicMeasures));
  }

  // Complete package - All measures
  if (measures.length > 0) {
    packages.push(createPackage('complete', 'Compleet pakket', measures));
  }

  return packages;
}

function createPackage(id: string, name: string, measures: Measure[]): Package {
  const totalSavings = measures.reduce((sum, m) => sum + m.savings, 0);
  const totalCost = measures.reduce((sum, m) => sum + m.cost, 0);
  const averagePaybackTime = totalCost / totalSavings;

  return {
    id,
    name,
    measures,
    totalSavings,
    totalCost,
    averagePaybackTime
  };
}