import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import BuildingForm from './components/BuildingForm';
import ReportGenerator from './components/ReportGenerator';
import { BuildingData, Measure, Package } from './types/types';
import { generateMeasures, generatePackages } from './utils/measureLogic';

function App() {
  const [buildingData, setBuildingData] = useState<BuildingData | null>(null);
  const [measures, setMeasures] = useState<Measure[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  const handleFormSubmit = (data: BuildingData) => {
    setBuildingData(data);
    const generatedMeasures = generateMeasures(data);
    const generatedPackages = generatePackages(generatedMeasures);
    setMeasures(generatedMeasures);
    setPackages(generatedPackages);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Rabobank Maatwerkadvies Generator
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!buildingData ? (
          <BuildingForm onSubmit={handleFormSubmit} />
        ) : (
          <ReportGenerator
            buildingData={buildingData}
            measures={measures}
            packages={packages}
          />
        )}
      </main>
    </div>
  );
}

export default App;