import React from 'react';
import { BuildingData, Measure, Package } from '../types/types';
import { FileText, Download } from 'lucide-react';

interface Props {
  buildingData: BuildingData;
  measures: Measure[];
  packages: Package[];
}

export default function ReportGenerator({ buildingData, measures, packages }: Props) {
  const generateReport = () => {
    // In a real implementation, this would generate a PDF report
    console.log('Generating report for:', buildingData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Maatwerkadviesrapport</h2>
        <button
          onClick={generateReport}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          <Download className="w-5 h-5" />
          <span>Download Rapport</span>
        </button>
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Projectgegevens</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Projectnummer</p>
              <p className="font-medium">{buildingData.projectNumber}</p>
            </div>
            <div>
              <p className="text-gray-600">Locatie</p>
              <p className="font-medium">{buildingData.location}</p>
            </div>
            <div>
              <p className="text-gray-600">Energielabel</p>
              <p className="font-medium">{buildingData.energyLabel}</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Maatregelpakketten</h3>
          {packages.map(pkg => (
            <div key={pkg.id} className="mb-6 border rounded-lg p-4">
              <h4 className="font-medium text-lg mb-2">{pkg.name}</h4>
              <div className="space-y-4">
                {pkg.measures.map(measure => (
                  <div key={measure.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{measure.name}</p>
                      <p className="text-sm text-gray-600">{measure.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{measure.cost.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">
                        Besparing: €{measure.savings.toLocaleString()}/jaar
                      </p>
                    </div>
                  </div>
                ))}
                <div className="pt-4">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Totale investering:</span>
                    <span>€{pkg.totalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Gemiddelde terugverdientijd:</span>
                    <span>{pkg.averagePaybackTime.toFixed(1)} jaar</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}