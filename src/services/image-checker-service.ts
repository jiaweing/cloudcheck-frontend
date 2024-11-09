import * as tf from "@tensorflow/tfjs";

class ImageClassifierService {
  private model: tf.LayersModel | null = null;
  private clientModel: tf.LayersModel | null = null;

  async prepare_ml(): Promise<void> {
    try {
      // Load the pre-trained model
      this.model = await tf.loadLayersModel("/models/model.json");
      console.log("Model loaded successfully");
    } catch (error) {
      console.error("Error loading model:", error);
      throw error;
    }
  }

  async classify_image(
    imageFile: File,
    threshold: number = 0.5
  ): Promise<number> {
    if (!this.model) {
      throw new Error("Model not loaded");
    }

    try {
      // Create an HTMLImageElement from the File
      const image = await this.createImageElement(imageFile);

      // Preprocess the image
      const tensor = await this.preprocessImage(image);

      // Make prediction
      const prediction = (await this.model.predict(tensor)) as tf.Tensor;
      const result = await prediction.data();

      // Cleanup
      tensor.dispose();
      prediction.dispose();

      // Return classification result (0 for fake, 1 for real)
      return result[0] > threshold ? 1 : 0;
    } catch (error) {
      console.error("Error classifying image:", error);
      throw error;
    }
  }

  async train_model(imageFile: File, label: number): Promise<void> {
    try {
      // Create a new model for client-side training if not exists
      if (!this.clientModel) {
        this.clientModel = await this.createClientModel();
      }

      // Prepare training data
      const image = await this.createImageElement(imageFile);
      const tensor = await this.preprocessImage(image);
      const labelTensor = tf.tensor1d([label]);

      // Train the model
      await this.clientModel.fit(tensor, labelTensor, {
        epochs: 1,
        batchSize: 1,
      });

      // Cleanup
      tensor.dispose();
      labelTensor.dispose();
    } catch (error) {
      console.error("Error training model:", error);
      throw error;
    }
  }

  async upload_model(): Promise<void> {
    if (!this.clientModel) {
      throw new Error("No trained client model available");
    }

    try {
      // Save model weights
      const weights = await this.clientModel.getWeights();
      const weightData = weights.map((w) => w.arraySync());

      // Send to server
      const response = await fetch("/api/model/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weights: weightData }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload model");
      }
    } catch (error) {
      console.error("Error uploading model:", error);
      throw error;
    }
  }

  dispose_models(): void {
    if (this.model) {
      this.model.dispose();
      this.model = null;
    }
    if (this.clientModel) {
      this.clientModel.dispose();
      this.clientModel = null;
    }
  }

  private async createImageElement(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  private async preprocessImage(image: HTMLImageElement): Promise<tf.Tensor> {
    // Convert image to tensor and preprocess
    return tf.tidy(() => {
      const tensor = tf.browser
        .fromPixels(image)
        .resizeNearestNeighbor([224, 224]) // Resize to model input size
        .toFloat()
        .expandDims();
      return tensor.div(255.0); // Normalize pixel values
    });
  }

  private async createClientModel(): Promise<tf.LayersModel> {
    const model = tf.sequential({
      layers: [
        tf.layers.conv2d({
          inputShape: [224, 224, 3],
          kernelSize: 3,
          filters: 16,
          activation: "relu",
        }),
        tf.layers.maxPooling2d({ poolSize: 2 }),
        tf.layers.flatten(),
        tf.layers.dense({ units: 1, activation: "sigmoid" }),
      ],
    });

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: "binaryCrossentropy",
      metrics: ["accuracy"],
    });

    return model;
  }
}

export default new ImageClassifierService();
