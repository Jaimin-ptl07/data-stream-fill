import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Edit, FileText, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeTab: 'upload' | 'edit';
  onTabChange: (tab: 'upload' | 'edit') => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'upload' as const,
      label: 'Upload Documents',
      icon: Upload,
      description: 'Upload and organize your documents by year'
    },
    {
      id: 'edit' as const,
      label: 'Edit Form',
      icon: Edit,
      description: 'Review and edit extracted information'
    }
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-hero rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">FormFill Pro</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">Document Processing & Form Automation</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  onClick={() => onTabChange(item.id)}
                  className="gap-2 h-auto p-3"
                >
                  <Icon className="h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-80">{item.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    onClick={() => {
                      onTabChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start gap-3 h-auto p-3"
                  >
                    <Icon className="h-4 w-4" />
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-80">{item.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};