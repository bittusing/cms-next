'use client';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Theme Test Page</h1>
        
        {/* Theme Color Test */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-primary text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Primary Color</h3>
            <p>Admin panel se set hoga</p>
          </div>
          <div className="bg-secondary text-primary p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Secondary Color</h3>
            <p>Admin panel se set hoga</p>
          </div>
          <div className="bg-accent text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Accent Color</h3>
            <p>Admin panel se set hoga</p>
          </div>
        </div>
        
        {/* Mobile Responsive Test */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-accent">
            Mobile Responsive Test
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6">
            Ye text mobile pe properly scale hoga
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-accent text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:opacity-90 transition-all w-full sm:w-auto">
              Mobile Button
            </button>
            <button className="border-2 border-accent text-accent px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-accent hover:text-white transition-all w-full sm:w-auto">
              Outline Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}