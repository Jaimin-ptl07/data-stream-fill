import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { DocumentUpload } from '@/components/DocumentUpload';
import { FormEditor } from '@/components/FormEditor';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'hero' | 'upload' | 'edit'>('hero');

  const handleGetStarted = () => {
    setActiveTab('upload');
  };

  const handleTabChange = (tab: 'upload' | 'edit') => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background">
      {activeTab !== 'hero' && (
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'hero' && (
          <HeroSection onGetStarted={handleGetStarted} />
        )}
        
        {activeTab === 'upload' && (
          <DocumentUpload />
        )}
        
        {activeTab === 'edit' && (
          <FormEditor />
        )}
      </main>
    </div>
  );
};

export default Index;
