import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, File, X, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  size: string;
  type: string;
}

interface YearData {
  year: string;
  documents: Document[];
}

export const DocumentUpload = () => {
  const { toast } = useToast();
  const [yearlyData, setYearlyData] = useState<YearData[]>([
    { year: '2024', documents: [] },
    { year: '2023', documents: [] },
    { year: '2022', documents: [] }
  ]);
  const [selectedYear, setSelectedYear] = useState('2024');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, year: string) => {
    const files = Array.from(event.target.files || []);
    
    const newDocuments: Document[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type
    }));

    setYearlyData(prev => 
      prev.map(yearData => 
        yearData.year === year 
          ? { ...yearData, documents: [...yearData.documents, ...newDocuments] }
          : yearData
      )
    );

    toast({
      title: "Documents uploaded",
      description: `${files.length} document(s) uploaded for ${year}`,
    });
  };

  const removeDocument = (year: string, docId: string) => {
    setYearlyData(prev => 
      prev.map(yearData => 
        yearData.year === year 
          ? { ...yearData, documents: yearData.documents.filter(doc => doc.id !== docId) }
          : yearData
      )
    );
  };

  const addYear = () => {
    const newYear = (parseInt(yearlyData[0].year) + 1).toString();
    setYearlyData(prev => [{ year: newYear, documents: [] }, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Document Upload</h2>
        <Button onClick={addYear} variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Add Year
        </Button>
      </div>

      <div className="grid gap-6">
        {yearlyData.map((yearData) => (
          <Card key={yearData.year} className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-medium text-foreground">{yearData.year}</h3>
                  <Badge variant="secondary">
                    {yearData.documents.length} document{yearData.documents.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, yearData.year)}
                    className="hidden"
                    id={`file-${yearData.year}`}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById(`file-${yearData.year}`)?.click()}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Documents
                  </Button>
                </div>
              </div>

              {yearData.documents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <File className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No documents uploaded for {yearData.year}</p>
                  <p className="text-sm">Upload PDF, DOC, DOCX, JPG, or PNG files</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {yearData.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <File className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium text-sm text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.size}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(yearData.year, doc.id)}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};