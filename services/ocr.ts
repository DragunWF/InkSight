const apiUrl = "https://api.apilayer.com/image_to_text/upload";

interface OCRResponse {
  all_text: string;
  [key: string]: any; // Allow for other properties in the response
}

export async function performOCR(
  image: FormData | File | Blob
): Promise<string> {
  try {
    const myHeaders = new Headers();
    myHeaders.append("apikey", process.env.EXPO_PUBLIC_OCR_API_KEY as string);
    myHeaders.append("Content-Type", "multipart/form-data");

    const requestOptions: RequestInit = {
      method: "POST",
      redirect: "follow",
      headers: myHeaders,
      body: image,
    };

    // Send a POST request to the OCR API
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: OCRResponse = await response.json();
    const extractedText: string = result["all_text"];

    return extractedText;
  } catch (error) {
    console.log("OCR Error:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
}
