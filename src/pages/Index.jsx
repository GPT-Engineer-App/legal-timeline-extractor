import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useQuery } from '@tanstack/react-query';
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
  const [driveLink, setDriveLink] = useState('');

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

  const handleDriveLinkInput = (event) => {
    setDriveLink(event.target.value);
  };

  const fetchDriveFile = async (fileId) => {
    // This is a placeholder function. In a real implementation, you would need to set up
    // Google Drive API authentication and use their API to fetch the file.
    const response = await fetch(`https://drive.google.com/uc?export=download&id=${fileId}`);
    if (!response.ok) throw new Error('Failed to fetch file from Google Drive');
    return await response.blob();
  };

  const { data: driveFile, isLoading: isLoadingDriveFile, error: driveFileError } = useQuery({
    queryKey: ['driveFile', driveLink],
    queryFn: () => {
      if (!driveLink) return null;
      const fileId = driveLink.match(/[-\w]{25,}/);
      if (!fileId) throw new Error('Invalid Google Drive link');
      return fetchDriveFile(fileId[0]);
    },
    enabled: !!driveLink,
  });

  const handleAnalyze = () => {
    if (documents.length === 0 && !textInput.trim() && !driveFile) {
      setError('Please upload a PDF, enter text, or provide a valid Google Drive link before analyzing.');
      return;
    }

    // TODO: Implement actual document analysis logic
    console.log("Analyzing documents:", documents);
    console.log("Analyzing text input:", textInput);
    console.log("Analyzing Google Drive file:", driveFile);

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
          <Input
            type="text"
            placeholder="Or enter Google Drive link..."
            onChange={handleDriveLinkInput}
            value={driveLink}
            className="mb-4"
          />
          {isLoadingDriveFile && <p>Loading file from Google Drive...</p>}
          {driveFileError && <Alert variant="destructive" className="mb-4"><AlertDescription>Error loading file from Google Drive: {driveFileError.message}</AlertDescription></Alert>}
          {driveFile && <p>Google Drive file loaded successfully!</p>}
          {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}
        </CardContent>
        <CardFooter>
          <Button onClick={handleAnalyze} disabled={isLoadingDriveFile}>Analyze Documents</Button>
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
