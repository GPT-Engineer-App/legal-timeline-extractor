import { Card, CardContent } from "@/components/ui/card"

export const Timeline = ({ events }) => {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <Card key={index}>
          <CardContent className="flex items-center p-4">
            <div className="w-24 font-semibold">{event.date}</div>
            <div className="flex-1">{event.event}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
