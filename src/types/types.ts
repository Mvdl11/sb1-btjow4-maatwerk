export interface BuildingData {
  rcValueWall: number;
  rcValueFloor: number;
  rcValueRoof: number;
  roofType: 'flat' | 'sloped';
  hasCavityWall: boolean;
  hasCrawlSpace: boolean;
  boilerAge: number;
  hasSolarPanels: boolean;
  hasMechanicalVentilation: boolean;
  energyLabel: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  projectNumber: string;
  location: string;
}

export interface Measure {
  id: string;
  name: string;
  description: string;
  savings: number;
  cost: number;
  paybackTime: number;
}

export interface Package {
  id: string;
  name: string;
  measures: Measure[];
  totalSavings: number;
  totalCost: number;
  averagePaybackTime: number;
}