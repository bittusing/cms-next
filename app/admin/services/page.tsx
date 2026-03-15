'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaGripVertical } from 'react-icons/fa';

interface Service {
  _id: string;
  title: string;
  description: string;
  features: string[];
  order: number;
  isActive: boolean;
  createdAt: string;
}

interface ProcessStep {
  _id: string;
  stepNumber: number;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
}

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showStepForm, setShowStepForm] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    description: '',
    features: [''],
    order: 0,
    isActive: true
  });
  const [stepFormData, setStepFormData] = useState({
    stepNumber: 1,
    title: '',
    description: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchServices();
    fetchProcessSteps();
  }, []);
  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProcessSteps = async () => {
    try {
      const response = await fetch('/api/process-steps');
      if (response.ok) {
        const data = await response.json();
        setProcessSteps(data);
      }
    } catch (error) {
      console.error('Failed to fetch process steps:', error);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingServiceId ? `/api/services/${editingServiceId}` : '/api/services';
      const method = editingServiceId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...serviceFormData,
          features: serviceFormData.features.filter(f => f.trim() !== '')
        })
      });

      if (response.ok) {
        await fetchServices();
        resetServiceForm();
        alert(editingServiceId ? 'Service updated successfully!' : 'Service created successfully!');
      }
    } catch (error) {
      console.error('Failed to save service:', error);
      alert('Failed to save service');
    }
  };

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingStepId ? `/api/process-steps/${editingStepId}` : '/api/process-steps';
      const method = editingStepId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stepFormData)
      });

      if (response.ok) {
        await fetchProcessSteps();
        resetStepForm();
        alert(editingStepId ? 'Process step updated successfully!' : 'Process step created successfully!');
      }
    } catch (error) {
      console.error('Failed to save process step:', error);
      alert('Failed to save process step');
    }
  };
  const handleEditService = (service: Service) => {
    setServiceFormData({
      title: service.title,
      description: service.description,
      features: service.features,
      order: service.order,
      isActive: service.isActive
    });
    setEditingServiceId(service._id);
    setShowServiceForm(true);
  };

  const handleEditStep = (step: ProcessStep) => {
    setStepFormData({
      stepNumber: step.stepNumber,
      title: step.title,
      description: step.description,
      order: step.order,
      isActive: step.isActive
    });
    setEditingStepId(step._id);
    setShowStepForm(true);
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchServices();
        alert('Service deleted successfully!');
      }
    } catch (error) {
      console.error('Failed to delete service:', error);
      alert('Failed to delete service');
    }
  };

  const handleDeleteStep = async (id: string) => {
    if (!confirm('Are you sure you want to delete this process step?')) return;
    
    try {
      const response = await fetch(`/api/process-steps/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchProcessSteps();
        alert('Process step deleted successfully!');
      }
    } catch (error) {
      console.error('Failed to delete process step:', error);
      alert('Failed to delete process step');
    }
  };
  const resetServiceForm = () => {
    setServiceFormData({
      title: '',
      description: '',
      features: [''],
      order: 0,
      isActive: true
    });
    setEditingServiceId(null);
    setShowServiceForm(false);
  };

  const resetStepForm = () => {
    setStepFormData({
      stepNumber: 1,
      title: '',
      description: '',
      order: 0,
      isActive: true
    });
    setEditingStepId(null);
    setShowStepForm(false);
  };

  const addFeature = () => {
    setServiceFormData({
      ...serviceFormData,
      features: [...serviceFormData.features, '']
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = serviceFormData.features.filter((_, i) => i !== index);
    setServiceFormData({
      ...serviceFormData,
      features: newFeatures.length > 0 ? newFeatures : ['']
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...serviceFormData.features];
    newFeatures[index] = value;
    setServiceFormData({
      ...serviceFormData,
      features: newFeatures
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Services Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
            <button
              onClick={() => setShowServiceForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FaPlus /> Add New Service
            </button>
          </div>

          {showServiceForm && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                {editingServiceId ? 'Edit Service' : 'Add New Service'}
              </h2>
              <form onSubmit={handleServiceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceFormData.title}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={serviceFormData.description}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features
                  </label>
                  {serviceFormData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter feature"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add Feature
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    {editingServiceId ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={resetServiceForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        {/* Services List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service._id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{service.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {service.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {service.features.length} features
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditService(service)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found. Create your first one!</p>
          </div>
        )}
        {/* Process Steps Section */}
        <div className="space-y-6 border-t pt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Process Steps</h2>
            <button
              onClick={() => setShowStepForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <FaPlus /> Add Process Step
            </button>
          </div>

          {showStepForm && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {editingStepId ? 'Edit Process Step' : 'Add New Process Step'}
              </h3>
              <form onSubmit={handleStepSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Step Number *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={stepFormData.stepNumber}
                      onChange={(e) => setStepFormData({ ...stepFormData, stepNumber: parseInt(e.target.value) })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order
                    </label>
                    <input
                      type="number"
                      value={stepFormData.order}
                      onChange={(e) => setStepFormData({ ...stepFormData, order: parseInt(e.target.value) })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={stepFormData.title}
                    onChange={(e) => setStepFormData({ ...stepFormData, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={stepFormData.description}
                    onChange={(e) => setStepFormData({ ...stepFormData, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    {editingStepId ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={resetStepForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        {/* Process Steps List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Step #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processSteps.map((step) => (
                  <tr key={step._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-2xl font-bold text-blue-600">{step.stepNumber.toString().padStart(2, '0')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{step.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {step.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditStep(step)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteStep(step._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {processSteps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No process steps found. Create your first one!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}