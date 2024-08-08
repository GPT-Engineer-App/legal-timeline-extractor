import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const AnalysisResults = ({ results }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Potential Legal Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {results.claims.map((claim, index) => (
              <li key={index}>{claim}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Supporting Evidence</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {results.evidence.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Suggested Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {results.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
