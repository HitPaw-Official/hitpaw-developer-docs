import LLMPageActions from '@site/src/components/LLMPageActions';

# API Documentation

<LLMPageActions
  llmsPath="/image/API-reference/llms.txt"
  pageTitle="HitPaw Image API Reference"
  publicPageUrl="https://developer.hitpaw.com/image/API-reference"
/>

## Base URL
```
https://api-base.hitpaw.com
```

## Authentication
All API requests require authentication. 
*   **Don't have an API key?** Get started by [Purchasing an API Key Now](https://www.hitpaw.com/hitpaw-api.html).
*   **Already have your API Key?** Skip the local setup and test the API directly in your browser. [Explore Playground →](https://playground.hitpaw.com/)

## Endpoints

**Endpoint:** `POST /api/photo-enhancer`

**Description:** Submit a photo enhancement task for image super-resolution processing.

**Request Body:**
```json
{
    "model_name": "general_2x",
    "img_url": "https://i.ibb.co/TDLJLgVR/face-model-before.jpg",
    "extension": ".jpg",
    "exif": true,
    "DPI": 300
}
```

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| model_name | string | Yes | The model name to use. The suffix (2x/4x) determines the output resolution. |
| img_url | string | Yes | URL of the image to be enhanced |
| extension | string | Yes | File extension of the image (e.g., ".jpg", ".png") |
| exif | boolean | No | Whether to preserve EXIF data (default: false) |
| DPI | integer | No | Target DPI metadata for the output image (default: original). **Note: Supported only for non-Generative models.** Does not affect pixel scaling. |

**Response:**
```json
{
    "code": 200,
    "message": "OK",
    "data": {
        "job_id": "f5007c0b-e902-4070-8c75-f337d896168f",
        "consume_coins": 75
    }
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| job_id | string | Unique identifier for the enhancement job |
| consume_coins | integer | Number of coins consumed for this task |

**Example Request (cURL):**
```bash
curl -X POST https://api-base.hitpaw.com/api/photo-enhancer \
  -H "Content-Type: application/json" \
  -H "Apikey: YOUR_API_KEY" \
  -d '{
    "model_name": "general_2x",
    "img_url": "https://example.com/image.jpg",
    "extension": ".jpg",
    "exif": true,
    "DPI": 300
  }'
```

**Example Request (Python):**
```python
import requests
import json

url = "https://api-base.hitpaw.com/api/photo-enhancer"

headers = {
    "Content-Type": "application/json",
    "Apikey": "YOUR_API_KEY"
}

payload = {
    "model_name": "general_2x",
    "img_url": "https://example.com/image.jpg",
    "extension": ".jpg",
    "exif": True,
    "DPI": 300
}

response = requests.post(url, headers=headers, data=json.dumps(payload))

if response.status_code == 200:
    result = response.json()
    print(f"Job ID: {result['job_id']}")
    print(f"Consume Coins: {result['consume_coins']}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)
```
## Output Resolution Control

The output resolution of your processed image is directly determined by the `model_name` you select. The multiplier suffix (e.g., `2x`, `4x`) indicates how much the image dimensions will be scaled.

*   **Resolution Calculation:** `Output Pixels = Input Pixels × Multiplier`.
    *   **2x Models** (e.g., `general_2x`): Doubles both the width and height (e.g., 1000px → 2000px).
    *   **4x Models** (e.g., `general_4x`): Quadruples both the width and height (e.g., 1000px → 4000px).
    *   **1x Models** (e.g., `sharpen_denoise_1x`): Maintains the original input resolution.

*   **About DPI (Dots Per Inch):**
    The `DPI` parameter in the request body is used to set the **print metadata** of the image. 
    *   Changing the DPI value **does not** change the digital pixel count or the resolution of the image. 
    *   It only affects how the image is scaled when printed on physical paper. 
    *   For digital display, the image quality and size are solely controlled by the **2x/4x** model selection.

**Example Scenarios:**

| Input Resolution | Selected Model | Target DPI | Output Resolution | Metadata DPI |
| :--- | :--- | :--- | :--- | :--- |
| 1024 x 1024 px | `face_2x` | 300 | 2048 x 2048 px | 300 |
| 1024 x 1024 px | `face_4x` | 72 | 4096 x 4096 px | 72 |
| 1024 x 1024 px | `detail_denoise_1x` | 300 | 1024 x 1024 px | 300 |


## Available Models
Use the following values for the `model_name` parameter in your request:

| Display Name | API `model_name` Value |
| :--- | :--- |
| Face Clear Model 2x/4x | `face_2x`/`face_4x` |
| Face Natural Model 2x/4x | `face_v2_2x`/`face_v2_4x` |
| General Enhance Model 2x/4x | `general_2x`/`general_4x` |
| High Fidelity Model 2x/4x | `high_fidelity_2x`/`high_fidelity_4x` |
| Sharp Denoise Model 1x | `sharpen_denoise_1x` |
| Detail Denoise Model 1x | `detail_denoise_1x` |
| Generative Portrait Model 1x/2x/4x | `generative_portrait_1x`/`generative_portrait_2x`/`generative_portrait_4x` |
| Generative Enhance Model 1x/2x/4x | `generative_1x`/`generative_2x`/`generative_4x` |

## Model Specifications

| API `model_name` Category | DPI Support | Max Input Resolution | Max Output Resolution | Supported Formats (In/Out) |
| :--- | :--- | :--- | :--- | :--- |
| **Enhancement & Denoise Models**<br />`face_...`, `general_...`, `high_fidelity_...`, `sharpen_denoise    _1x`, `detail_denoise_1x` | **Yes** | 70 MP | 432 MP | bmp, jpeg, jpg, png, jfif, tga, tiff, webp, heif |
| **Generative Models**<br />`generative_portrait_...`, `generative_...` | **No** | 34 MP | 34 MP | bmp, jpeg, jpg, png, jfif, tga, tiff, webp, heif |

> **Note:** The `DPI` parameter is only functional for Enhancement and Denoise models. For all Generative models, this parameter will be ignored.

## Task Status

**Endpoint:** `POST /api/task-status`

**Description:** Query the status of a submitted enhancement job. Use this endpoint to poll for job completion.

**Request Body:**
```json
{
  "job_id": "string"
}
```

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| job_id | string | Yes | Job ID returned from photo-enhancer or video-enhancer endpoint |

**Response:**
```json
{
    "code": 200,
    "message": "OK",
    "data": {
        "job_id": "string",
        "status": "string",
        "res_url": "string",
        "original_url": "string"
    }
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| job_id | string | Job identifier |
| status | string | Current job status (see status values below) |
| res_url | string | URL of the processed/enhanced file (available when status is "COMPLETED") |
| original_url | string | URL of the original input file |

**Status Values:**

| Status | Description |
|--------|-------------|
| CONVERTING | Job is currently being processed |
| COMPLETED | Job has completed successfully, result is available |
| ERROR | Job failed due to an error |

**Example Request (cURL):**
```bash
curl -X POST https://api-base.hitpaw.com/api/task-status \
  -H "Content-Type: application/json" \
  -H "Apikey: YOUR_API_KEY" \
  -d '{
    "job_id": "abc123def456"
  }'
```

**Example Request (Python):**
```python
import requests
import json
import time

url = "https://api-base.hitpaw.com/api/task-status"

headers = {
    "Content-Type": "application/json",
    "Apikey": "YOUR_API_KEY"
}

payload = {
    "job_id": "abc123def456"
}

# Poll for job completion
max_attempts = 60
attempt = 0

while attempt < max_attempts:
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    
    if response.status_code == 200:
        result = response.json()
        status = result['status']
        
        print(f"Attempt {attempt + 1}: Status = {status}")
        
        if status == "COMPLETED":
            print(f"Job completed successfully!")
            print(f"Result URL: {result['res_url']}")
            print(f"Original URL: {result['original_url']}")
            break
        elif status == "ERROR":
            print(f"Job failed with error")
            break
        elif status == "CONVERTING":
            print(f"Job is still processing, waiting 5 seconds...")
            time.sleep(5)
        
        attempt += 1
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        break

if attempt >= max_attempts:
    print("Max polling attempts reached")
```

## Error Codes

The API uses the following error codes:

### General Errors

| Error Code | HTTP Status | Message |
|------------|-------------|---------|
| 100400000 | 400 | No access |
| 100400001 | 400 | Invalid URL |
| 100400002 | 400 | Bad Request |
| 100401000 | 401 | Token is expired |
| 100403000 | 403 | Invalid request parameters |
| 100403001 | 403 | Access denied |
| 100403002 | 403 | You don't have permission to access this resource |
| 100429000 | 429 | Too many requests, please try again later |
| 100500000 | 500 | Internal error |
| 100500001 | 500 | Database error |
| 100500002 | 500 | Cache error |
| 100500003 | 500 | Failed to create file |
| 100500004 | 500 | Signature verification failed |
| 100500005 | 500 | Configuration error |
| 100500006 | 500 | Unknown error |
| 100500007 | 500 | Operation timeout |

### API-Specific Errors

| Error Code | HTTP Status | Message |
|------------|-------------|---------|
| 110400000 | 400 | api_key is not valid |
| 110400002 | 400 | The task does not exist |
| 110400003 | 400 | The task failed, please try again |
| 110400005 | 400 | The model is not supported, please try again |
| 110400007 | 400 | The extension is not valid |
| 110400008 | 400 | The video URL is not valid |
| 110400009 | 400 | The input resolution is over limit |
| 110400010 | 400 | The target resolution is over limit |
| 110400011 | 400 | The video duration is over limit |
| 110402000 | 402 | The coins are not enough |
| 110402001 | 402 | The coins are not enough |
| 110402004 | 402 | The Demo try times exceeded |

### Error Response Format

```json
{
  "error_code": 110400000,
  "message": "api_key is not valid"
}
```

## Rate Limiting

- The API implements rate limiting to ensure fair usage
- Error code `100429000` will be returned if you exceed the rate limit
- Please implement exponential backoff in your retry logic

## Best Practices

1. **Polling for Job Status**: 
   - Poll the `/api/task-status` endpoint at reasonable intervals (recommended: every 5-10 seconds)
   - Implement exponential backoff for failed requests
   - Set a maximum number of polling attempts to avoid infinite loops
   - Check for status values: `CONVERTING` (continue polling), `COMPLETED` (success), `ERROR` (failed)

2. **Error Handling**:
   - Always check the HTTP status code and error code in the response
   - Implement appropriate retry logic for transient errors (5xx errors)
   - Don't retry for client errors (4xx errors) without fixing the request
   - Log error responses for debugging purposes

3. **Resource Limits**:
   - Verify video duration limits before submission
   - Ensure input and target resolutions are within allowed limits
   - Check file extension validity before uploading

4. **API Key Management**:
   - Store API keys securely using environment variables or secure vaults
   - Never commit API keys to version control
   - Rotate API keys periodically for security

5. **File URL Requirements**:
   - Ensure image and video URLs are publicly accessible
   - Use HTTPS URLs for better security
   - Verify URLs are valid before submitting requests

## Complete Workflow Example (Python)

Here's a complete example showing the entire workflow from submission to result retrieval:

```python
import requests
import json
import time

class HitPawAPIClient:
    def __init__(self, api_key, base_url="https://api-base.hitpaw.com"):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            "Content-Type": "application/json",
            "Apikey": api_key
        }
    
    def enhance_photo(self, img_url, model_name="enhanced_v1", extension=".jpg", exif=True, dpi=300):
        """Submit a photo enhancement job"""
        url = f"{self.base_url}/api/photo-enhancer"
        payload = {
            "model_name": model_name,
            "img_url": img_url,
            "extension": extension,
            "exif": exif,
            "DPI": dpi
        }
        
        response = requests.post(url, headers=self.headers, data=json.dumps(payload))
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error {response.status_code}: {response.text}")
    
    
    def check_status(self, job_id):
        """Check job status"""
        url = f"{self.base_url}/api/task-status"
        payload = {"job_id": job_id}
        
        response = requests.post(url, headers=self.headers, data=json.dumps(payload))
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error {response.status_code}: {response.text}")
    
    def wait_for_completion(self, job_id, max_attempts=120, poll_interval=5):
        """Poll job status until completion or error"""
        attempt = 0
        
        while attempt < max_attempts:
            try:
                result = self.check_status(job_id)
                status = result['status']
                
                print(f"[Attempt {attempt + 1}/{max_attempts}] Status: {status}")
                
                if status == "COMPLETED":
                    print("✓ Job completed successfully!")
                    return result
                elif status == "ERROR":
                    raise Exception("Job failed with ERROR status")
                elif status == "CONVERTING":
                    print(f"  Still processing... waiting {poll_interval} seconds")
                    time.sleep(poll_interval)
                
                attempt += 1
            except Exception as e:
                print(f"Error checking status: {str(e)}")
                raise
        
        raise Exception(f"Job did not complete within {max_attempts * poll_interval} seconds")

# Usage example
if __name__ == "__main__":
    # Initialize client
    client = HitPawAPIClient(api_key="YOUR_API_KEY")
    
    try:
        # Example 1: Photo Enhancement
        print("=== Photo Enhancement ===")
        photo_result = client.enhance_photo(
            img_url="https://example.com/photo.jpg",
            model_name="enhanced_v1",
            extension=".jpg"
        )
        print(f"Job ID: {photo_result['job_id']}")
        print(f"Coins consumed: {photo_result['consume_coins']}")
        
        # Wait for completion
        final_result = client.wait_for_completion(photo_result['job_id'])
        print(f"Result URL: {final_result['res_url']}")
        
        
    except Exception as e:
        print(f"Error: {str(e)}")
```

## Support

For API key requests, billing questions, or technical support, please contact our support team.
