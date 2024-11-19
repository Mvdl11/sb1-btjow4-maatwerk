import React from 'react';
import { BuildingData } from '../types/types';
import { AlertCircle } from 'lucide-react';

interface Props {
  onSubmit: (data: BuildingData) => void;
}

export default function BuildingForm({ onSubmit }: Props) {
  const [formData, setFormData] = React.useState<BuildingData>({
    rcValueWall: 0,
    rcValueFloor: 0,
    rcValueRoof: 0,
    roofType: 'flat',
    hasCavityWall: false,
    hasCrawlSpace: false,
    boilerAge: 0,
    hasSolarPanels: false,
    hasMechanicalVentilation: false,
    energyLabel: 'G',
    projectNumber: '',
    location: ''
  });

  const [errors, setErrors] = React.useState<Partial<Record<keyof BuildingData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof BuildingData, string>> = {};
    
    if (formData.rcValueWall <= 0) newErrors.rcValueWall = 'Rc-waarde moet groter zijn dan 0';
    if (formData.rcValueFloor <= 0) newErrors.rcValueFloor = 'Rc-waarde moet groter zijn dan 0';
    if (formData.rcValueRoof <= 0) newErrors.rcValueRoof = 'Rc-waarde moet groter zijn dan 0';
    if (formData.boilerAge < 0) newErrors.boilerAge = 'Leeftijd moet 0 of hoger zijn';
    if (!formData.projectNumber) newErrors.projectNumber = 'Projectnummer is verplicht';
    if (!formData.location) newErrors.location = 'Locatie is verplicht';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Woninggegevens</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Isolatiewaarden</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rc-waarde gevel
              <input
                type="number"
                name="rcValueWall"
                value={formData.rcValueWall}
                onChange={handleChange}
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
            {errors.rcValueWall && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.rcValueWall}
              </p>
            )}
          </div>

          {/* Similar fields for floor and roof Rc values */}
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type dak
              <select
                name="roofType"
                value={formData.roofType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="flat">Plat</option>
                <option value="sloped">Hellend</option>
              </select>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Installaties</h3>
          
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasCavityWall"
                checked={formData.hasCavityWall}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Spouwmuur aanwezig</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasCrawlSpace"
                checked={formData.hasCrawlSpace}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Kruipruimte aanwezig</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leeftijd CV-ketel (jaren)
              <input
                type="number"
                name="boilerAge"
                value={formData.boilerAge}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Projectgegevens</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Energielabel
              <select
                name="energyLabel"
                value={formData.energyLabel}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(label => (
                  <option key={label} value={label}>{label}</option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Projectnummer
              <input
                type="text"
                name="projectNumber"
                value={formData.projectNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
            {errors.projectNumber && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.projectNumber}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Genereer Adviesrapport
        </button>
      </div>
    </form>
  );
}