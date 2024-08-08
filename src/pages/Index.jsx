import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Timeline } from '../components/Timeline';
import { AnalysisResults } from '../components/AnalysisResults';
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [documents, setDocuments] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [timeline, setTimeline] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setDocuments([...documents, file]);
      setError('');
    } else {
      setError('Please upload a valid PDF file.');
    }
  };

  const handleTextInput = (event) => {
    setTextInput(event.target.value);
  };

  const handleAnalyze = () => {
    if (documents.length === 0 && !textInput.trim()) {
      setError('Please upload a PDF or enter text before analyzing.');
      return;
    }

    // TODO: Implement actual document analysis logic
    console.log("Analyzing documents:", documents);
    console.log("Analyzing text input:", textInput);

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
    setError('');
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
          <Input type="file" accept=".pdf" onChange={handleFileUpload} className="mb-4" />
          {documents.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold">Uploaded Files:</h3>
              <ul className="list-disc pl-5">
                {documents.map((doc, index) => (
                  <li key={index}>{doc.name}</li>
                ))}
              </ul>
            </div>
          )}
          <Textarea 
            placeholder="Or paste document text here..." 
            onChange={handleTextInput}
            value={textInput}
            className="mb-4" 
          />
          {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}
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
