import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Edit, Download, Zap, Shield, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Extraction',
      description: 'Automatically extract information from your documents using advanced AI'
    },
    {
      icon: Shield,
      title: 'Secure Processing',
      description: 'Your documents are processed securely with enterprise-grade encryption'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Reduce manual data entry by up to 90% with automated form filling'
    }
  ];

  const steps = [
    {
      number: '1',
      icon: Upload,
      title: 'Upload Documents',
      description: 'Upload your documents organized by year'
    },
    {
      number: '2',
      icon: FileText,
      title: 'AI Extraction',
      description: 'Our AI extracts relevant information automatically'
    },
    {
      number: '3',
      icon: Edit,
      title: 'Review & Edit',
      description: 'Review and edit the extracted data as needed'
    },
    {
      number: '4',
      icon: Download,
      title: 'Download Form',
      description: 'Download your completed form instantly'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-6">
        <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
          Professional Document Processing
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
          Transform Documents into
          <span className="bg-gradient-hero bg-clip-text text-transparent block">
            Filled Forms
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Upload your documents, let AI extract the information, and download perfectly filled forms. 
          Streamline your document processing workflow with our intelligent automation platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={onGetStarted} variant="hero" size="lg" className="gap-2 text-lg px-8 py-6">
            <Upload className="h-5 w-5" />
            Get Started Now
          </Button>
          <Button variant="outline" size="lg" className="gap-2 text-lg px-8 py-6">
            <FileText className="h-5 w-5" />
            View Demo
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative max-w-5xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={heroImage} 
            alt="Professional document processing interface" 
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          );
        })}
      </div>

      {/* How it Works */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">Simple steps to transform your documents</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg">
                    {step.number}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};