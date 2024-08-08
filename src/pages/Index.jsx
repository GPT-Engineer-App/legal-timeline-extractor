import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Timeline } from '../components/Timeline';
import { AnalysisResults } from '../components/AnalysisResults';

const Index = () => {
  const [documents, setDocuments] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleFileUpload = (event) => {
    // TODO: Implement file upload logic
    console.log("File uploaded:", event.target.files[0]);
  };

  const handleTextInput = (event) => {
    // TODO: Implement text input logic
    console.log("Text input:", event.target.value);
  };

  const handleAnalyze = () => {
    // TODO: Implement document analysis logic
    console.log("Analyzing documents...");
    // Placeholder data
    setTimeline([
      { date: '2022-01-01', event: 'Lease signed' },
      { date: '2022-06-15', event: 'Rent increase notice' },
      { date: '2022-07-01', event: 'Rent increase effective' },
    ]);
    setAnalysisResults({
      claims: ['Rent Control Violation', 'Harassment'],
      evidence: ['Rent increase exceeds legal limit', 'Multiple frivolous eviction attempts'],
      suggestions: ['File motion for rent rollback', 'Document all communication with landlord'],
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Legal Document Analysis</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>Upload legal documents or paste text for analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="file" onChange={handleFileUpload} className="mb-4" />
          <Textarea placeholder="Or paste document text here..." onChange={handleTextInput} className="mb-4" />
        </CardContent>
        <CardFooter>
          <Button onClick={handleAnalyze}>Analyze Documents</Button>
        </CardFooter>
      </Card>

      {timeline.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Event Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <Timeline events={timeline} />
          </CardContent>
        </Card>
      )}

      {analysisResults && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <AnalysisResults results={analysisResults} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;
