import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface ClassificationResultProps {
  prediction: "melanoma" | "benign";
  confidence: number;
}

export const ClassificationResult = ({ prediction, confidence }: ClassificationResultProps) => {
  const isMelanoma = prediction === "melanoma";
  const confidencePercent = Math.round(confidence * 100);

  return (
    <Card className="p-8 shadow-medium bg-gradient-card animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-6">
        <div
          className={`p-4 rounded-full ${
            isMelanoma ? "bg-destructive/10" : "bg-success/10"
          }`}
        >
          {isMelanoma ? (
            <AlertCircle className="h-10 w-10 text-destructive" />
          ) : (
            <CheckCircle2 className="h-10 w-10 text-success" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">
            {isMelanoma ? "Melanoma Detected" : "Benign Lesion"}
          </h3>
          
          <p className="text-muted-foreground mb-6">
            {isMelanoma
              ? "The image shows characteristics consistent with melanoma. Please consult a dermatologist immediately."
              : "The image appears to show a benign lesion. However, regular monitoring is recommended."}
          </p>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Confidence Level</span>
              <span className="text-sm font-bold">{confidencePercent}%</span>
            </div>
            <Progress 
              value={confidencePercent} 
              className={`h-3 ${isMelanoma ? "[&>div]:bg-destructive" : "[&>div]:bg-success"}`}
            />
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Medical Disclaimer:</strong> This tool is for educational and research purposes only. 
              It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek 
              the advice of your physician or other qualified health provider with any questions you may have 
              regarding a medical condition.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
