const apiUrl = "https://api.apilayer.com/image_to_text/upload";

interface OCRResponse {
  all_text: string;
  [key: string]: any; // Allow for other properties in the response
}

/**
 * Performs OCR on an image using the raw image URI
 * Matches the working GeeksForGeeks implementation pattern
 */
export async function performOCR(imageUri: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      console.log("📤 OCR Request Details:");
      console.log("- API URL:", apiUrl);
      console.log("- API Key present:", !!process.env.EXPO_PUBLIC_OCR_API_KEY);
      console.log(
        "- API Key length:",
        process.env.EXPO_PUBLIC_OCR_API_KEY?.length || 0
      );
      console.log("- Image URI:", imageUri);

      // Create the raw image object (matching GeeksForGeeks implementation)
      const raw = {
        uri: imageUri,
        type: "image/jpeg", // Default to JPEG
        name: "journal.jpg",
      };

      const myHeaders = new Headers();
      myHeaders.append("apikey", process.env.EXPO_PUBLIC_OCR_API_KEY as string);
      myHeaders.append("Content-Type", "multipart/form-data");

      const requestOptions: RequestInit = {
        method: "POST",
        redirect: "follow",
        headers: myHeaders,
        body: raw as any,
      };

      // Send request using fetch (matching working implementation)
      fetch(apiUrl, requestOptions)
        .then((response) => {
          console.log("📥 OCR Response:");
          console.log("- Status:", response.status);
          console.log("- Status Text:", response.statusText);

          if (!response.ok) {
            return response.text().then((errorText) => {
              console.log("- Error Response Body:", errorText);
              throw new Error(
                `HTTP error! status: ${response.status}\nDetails: ${errorText}`
              );
            });
          }

          return response.json();
        })
        .then((result: OCRResponse) => {
          console.log(
            "✅ OCR Success - Text length:",
            result["all_text"]?.length || 0
          );
          resolve(result["all_text"]);
        })
        .catch((error) => {
          console.log("❌ OCR Error:", error);
          reject(error);
        });
    } catch (error) {
      console.log("❌ OCR Setup Error:", error);
      reject(error);
    }
  });
}
