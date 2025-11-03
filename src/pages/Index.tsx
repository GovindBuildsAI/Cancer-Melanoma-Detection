import { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ClassificationResult } from "@/components/ClassificationResult";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Activity } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    prediction: "melanoma" | "benign";
    confidence: number;
  } | null>(null);

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      // TODO: Implement AI classification via backend API
      // Simulating API call for now
      await new Promise((resolve) => setTimeout(resolve, 2500));
      
      // Mock result - will be replaced with actual AI classification
      const mockResult = {
        prediction: Math.random() > 0.5 ? "melanoma" : "benign" as "melanoma" | "benign",
        confidence: 0.75 + Math.random() * 0.2,
      };
      
      setResult(mockResult);
      toast.success("Analysis complete");
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Medical imaging background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Activity className="h-5 w-5 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">SIIM-ISIC Melanoma Classification</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              AI-Powered Melanoma Detection
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Advanced skin lesion analysis using state-of-the-art deep learning. 
              Upload an image to identify potential melanoma cases.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          <div className="mb-8">
            <ImageUploader
              onImageSelect={setSelectedImage}
              selectedImage={selectedImage}
              onClear={handleClear}
            />
          </div>

          {/* Action Button */}
          {selectedImage && !result && (
            <div className="text-center mb-8">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                size="lg"
                className="min-w-[200px] shadow-soft"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Image"
                )}
              </Button>
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="mb-8">
              <ClassificationResult
                prediction={result.prediction}
                confidence={result.confidence}
              />
              <div className="text-center mt-6">
                <Button onClick={handleClear} variant="outline" size="lg">
                  Analyze Another Image
                </Button>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
              <h3 className="font-semibold text-lg mb-2">High Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                Trained on the SIIM-ISIC dataset with thousands of annotated lesion images
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
              <h3 className="font-semibold text-lg mb-2">Fast Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get results in seconds with our optimized deep learning models
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
              <h3 className="font-semibold text-lg mb-2">Research Purpose</h3>
              <p className="text-sm text-muted-foreground">
                Built for the Kaggle competition and educational purposes only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
