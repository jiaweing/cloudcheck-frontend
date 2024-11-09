"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import ImageClassifierService from "@/services/image-checker-service";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function ImageClassifier() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [classificationResult, setClassificationResult] = useState<
    string | null
  >(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [isTrainingModel, setIsTrainingModel] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setClassificationResult(null);
    }
  };

  const classifyImage = async () => {
    if (selectedImage) {
      setIsClassifying(true);
      try {
        const result = await ImageClassifierService.classify_image(
          selectedImage,
          0
        );
        setClassificationResult(result === 0 ? "Fake" : "Real");
        toast.success(`Image classified as: ${result === 0 ? "Fake" : "Real"}`);
      } catch (error) {
        console.error("Error classifying image:", error);
        setClassificationResult("Error occurred during classification");
        toast.error("Failed to classify image");
      }
      setIsClassifying(false);
    }
  };

  const disputeClassification = async () => {
    setOpenDialog(false);
    setIsTrainingModel(true);

    try {
      if (selectedImage) {
        // Train client side model
        await ImageClassifierService.train_model(
          selectedImage,
          classificationResult === "Real" ? 0 : 1
        );
        // Upload model
        await ImageClassifierService.upload_model();
        setClassificationResult(`${classificationResult} (Disputed)`);
        toast.success("Your feedback has been recorded");
      }
    } catch (error) {
      console.error("Error disputing classification:", error);
      toast.error("Failed to process dispute");
    } finally {
      setIsTrainingModel(false);
    }
  };

  useEffect(() => {
    async function prepareModel() {
      try {
        await ImageClassifierService.prepare_ml();
        toast.success("Image checker is ready");
      } catch (error) {
        console.error("Error loading models", error);
        toast.error("Failed to load image checker model");
      } finally {
        setIsModelLoading(false);
      }
    }

    prepareModel();

    return () => {
      ImageClassifierService.dispose_models();
    };
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Classify Image</CardTitle>
        </CardHeader>
        <CardContent>
          {isModelLoading ? (
            <div className="text-center py-8">
              <Progress value={30} className="w-[60%] mx-auto mb-4" />
              <p className="text-muted-foreground">Loading Image Checker...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={inputRef}
              />
              <div className="flex gap-4">
                <Button
                  onClick={() => inputRef.current?.click()}
                  variant="outline"
                >
                  Choose Image
                </Button>
                {selectedImage && (
                  <Button
                    onClick={classifyImage}
                    disabled={isClassifying || isTrainingModel}
                  >
                    {isClassifying ? "Classifying..." : "Classify Image"}
                  </Button>
                )}
              </div>

              {selectedImage && (
                <div className="mt-4">
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected Image"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              {classificationResult && (
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">
                      Classification Result:
                    </h3>
                    <p>{classificationResult}</p>
                  </div>

                  {(classificationResult === "Real" ||
                    classificationResult === "Fake") && (
                    <Button
                      variant="destructive"
                      onClick={() => setOpenDialog(true)}
                      disabled={isTrainingModel}
                    >
                      {isTrainingModel
                        ? "Processing Dispute..."
                        : "Dispute Classification"}
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dispute Classification</DialogTitle>
            <DialogDescription>
              Our system has detected that the image is{" "}
              {classificationResult?.toLowerCase()}. Do you want to dispute this
              classification?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={disputeClassification}>
              Dispute as {classificationResult === "Real" ? "fake" : "real"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
