import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
// FiStar add kiya GenXCode ke liye
import { FiFileText, FiAward, FiUserCheck, FiLogOut, FiStar } from 'react-icons/fi';
import cosmolixLogo from "@/logo/cosmolix-logo.png";

export default function AdminHub() {
  const navigate = useNavigate();
  const { logout, authDisabled } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const modules = [
    {
      id: 'offers',
      title: 'Offer Letters',
      description: 'Generate, verify, and issue official internship offer letters.',
      icon: <FiFileText size={32} />,
      color: '#D35C18',
      bg: '#FFF2EB',
      route: '/offer-letters'
    },
    {
      id: 'onboarding',
      title: 'Onboarding Passes',
      description: 'Create welcome passes and personalized portals for new candidates.',
      icon: <FiUserCheck size={32} />,
      color: '#2563EB',
      bg: '#EFF6FF',
      route: '/onboarding-pass'
    },
    {
      id: 'certificates',
      title: 'Certificates',
      description: 'Issue verified completion certificates for interns and employees.',
      icon: <FiAward size={32} />,
      color: '#059669',
      bg: '#F0FDF4',
      route: '/certificates'
    },
    // Naya GenXCode Module
    {
      id: 'genxcode',
      title: 'GenXCode Certs',
      description: 'Issue specialized GenXCode program completion certificates.',
      icon: <FiStar size={32} />,
      color: '#6828a2',
      bg: '#F3E8FF',
      route: '/genxcode-certificates'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC', fontFamily: '"Google Sans Flex", sans-serif' }}>
      
      {/* Premium Header */}
      <header className="border-b" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', borderColor: '#E2E8F0' }}>
        <div className="max-w-[1200px] mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={cosmolixLogo} alt="Cosmolix" className="w-12 h-12 object-contain" />
            <div>
              <p className="uppercase tracking-[0.2em] text-[10px] font-bold" style={{ color: '#D35C18' }}>
                Cosmolix HRMS
              </p>
              <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Times New Roman, serif' }}>
                Administration Hub
              </h1>
            </div>
          </div>

          {!authDisabled && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={{ color: '#64748B', backgroundColor: '#F1F5F9' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FEE2E2'; e.currentTarget.style.color = '#EF4444'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#F1F5F9'; e.currentTarget.style.color = '#64748B'; }}
            >
              <FiLogOut /> Logout
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Times New Roman, serif' }}>
            Welcome to the Workspace
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Select a module below to manage HR operations, generate documents, and streamline the candidate journey.
          </p>
        </div>

        {/* Module Cards Grid - Adjusted to lg:grid-cols-4 so 4 items fit nicely */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modules.map((mod) => (
            <div 
              key={mod.id}
              onClick={() => navigate(mod.route)}
              className="group cursor-pointer bg-white rounded-3xl p-6 border border-gray-100 transition-all duration-300 flex flex-col"
              style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = mod.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.borderColor = '#F3F4F6';
              }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                style={{ backgroundColor: mod.bg, color: mod.color }}
              >
                {mod.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Times New Roman, serif' }}>
                {mod.title}
              </h3>
              <p className="text-gray-500 leading-relaxed font-medium flex-grow text-sm">
                {mod.description}
              </p>
              <div className="mt-6 flex items-center font-bold text-sm transition-colors" style={{ color: mod.color }}>
                Open Module &rarr;
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}