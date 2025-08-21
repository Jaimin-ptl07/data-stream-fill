import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'textarea' | 'number' | 'email';
  extractedFrom?: string;
}

export const FormEditor = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: '1',
      label: 'Company Name',
      value: 'Acme Corporation',
      type: 'text',
      extractedFrom: '2024-invoice-001.pdf'
    },
    {
      id: '2',
      label: 'Total Revenue',
      value: '1,250,000',
      type: 'number',
      extractedFrom: '2024-financial-report.pdf'
    },
    {
      id: '3',
      label: 'Business Address',
      value: '123 Business Ave, Suite 100, New York, NY 10001',
      type: 'textarea',
      extractedFrom: '2024-registration.pdf'
    },
    {
      id: '4',
      label: 'Contact Email',
      value: 'contact@acme.com',
      type: 'email',
      extractedFrom: '2024-contact-info.pdf'
    },
    {
      id: '5',
      label: 'Number of Employees',
      value: '50',
      type: 'number',
      extractedFrom: '2024-hr-report.pdf'
    },
    {
      id: '6',
      label: 'Business Description',
      value: 'Leading provider of innovative technology solutions for small and medium businesses.',
      type: 'textarea',
      extractedFrom: '2024-profile.pdf'
    }
  ]);

  const updateField = (id: string, value: string) => {
    setFormFields(prev => 
      prev.map(field => 
        field.id === id ? { ...field, value } : field
      )
    );
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Form saved",
      description: "All changes have been saved successfully",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your filled form is being prepared for download",
    });
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      value: field.value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        updateField(field.id, e.target.value),
      disabled: !isEditing,
      className: isEditing ? "border-primary/50" : "border-muted"
    };

    switch (field.type) {
      case 'textarea':
        return <Textarea {...commonProps} rows={3} />;
      case 'number':
        return <Input {...commonProps} type="number" />;
      case 'email':
        return <Input {...commonProps} type="email" />;
      default:
        return <Input {...commonProps} type="text" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Form Editor</h2>
          <p className="text-muted-foreground mt-1">Review and edit extracted information</p>
        </div>
        
        <div className="flex gap-3">
          {isEditing ? (
            <Button onClick={handleSave} variant="success" className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Form
            </Button>
          )}
          <Button onClick={handleDownload} variant="hero" className="gap-2">
            <Download className="h-4 w-4" />
            Download Form
          </Button>
        </div>
      </div>

      <Card className="p-6 shadow-md">
        <div className="grid gap-6 md:grid-cols-2">
          {formFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={field.id} className="font-medium text-foreground">
                  {field.label}
                </Label>
                {field.extractedFrom && (
                  <Badge variant="outline" className="text-xs gap-1">
                    <FileText className="h-3 w-3" />
                    {field.extractedFrom}
                  </Badge>
                )}
              </div>
              {renderField(field)}
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Tip:</strong> Review all extracted information carefully before downloading your form. 
              You can modify any field as needed.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};