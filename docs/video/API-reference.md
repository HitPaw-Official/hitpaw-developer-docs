---
sidebar_position: 3
---

import LLMPageActions from '@site/src/components/LLMPageActions';

# API Documentation

<LLMPageActions
  llmsPath="/video/API-reference/llms.txt"
  pageTitle="HitPaw Video API Reference"
  publicPageUrl="https://developer.hitpaw.com/video/API-reference"
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

**Endpoint:** `POST /api/video-enhancer`

**Description:** Submit a video enhancement task for video super-resolution processing.

**Request Body:**
```json
{
  "video_url": "string",
  "model_name": "string",
  "resolution": [1920, 1080],
  "extension": "string",
  "original_resolution": [1280, 720]
}
```

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| video_url | string | Yes | URL of the video to be enhanced |
| model_name | string | Yes | Model name to use for enhancement |
| resolution | array[integer] | Yes | Target resolution [width, height] |
| extension | string | No | File extension (default: ".mp4") |
| original_resolution | array[integer] | No | Original video resolution [width, height] |

:::tip Use Pre-sign Upload for Better Reliability
If you encounter download failures or network instability when our servers attempt to fetch your resources via `video_url`, we highly recommend using our [OSS Pre-sign Upload API](../common/oss-presign-put-api.md) to securely upload your files first. Provide the generated `access_url` as your `video_url` to guarantee a 100% success rate for resource retrieval.
:::

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
curl -X POST https://api-base.hitpaw.com/api/video-enhancer \
  -H "Content-Type: application/json" \
  -H "Apikey: YOUR_API_KEY" \
  -d '{
    "video_url": "https://example.com/video.mp4",
    "model_name": "video_enhance_v2",
    "resolution": [1920, 1080],
    "extension": ".mp4",
    "original_resolution": [1280, 720]
  }'
```

**Example Request (Python):**
```python
import requests
import json

url = "https://api-base.hitpaw.com/api/video-enhancer"

headers = {
    "Content-Type": "application/json",
    "Apikey": "YOUR_API_KEY"
}

payload = {
    "video_url": "https://example.com/video.mp4",
    "model_name": "video_enhance_v2",
    "resolution": [1920, 1080],
    "extension": ".mp4",
    "original_resolution": [1280, 720]
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

## Available Models
Use the following values for the `model_name` parameter:

| Display Name | API `model_name` Value |
| :--- | :--- |
| Face Soft Model 2x | `face_soft_2x` |
| Portrait Restore Model 1x/2x | `portrait_restore_1x` / `portrait_restore_2x` |
| General Restore Model 1x/2x/4x | `general_restore_1x` / `general_restore_2x` / `general_restore_4x` |
| Ultra HD Model 2x | `ultrahd_restore_2x` |
| Generative Model 1x | `generative_1x` |

## Model Specifications

| API `model_name` | Supported Input Formats | Max Input Resolution | Supported Output Formats | Max Output Resolution | Duration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **All Video Models** | dv,mlv,m2ts,m2t,m2v,nut,ser,3g2,3gp,asf,avi,divx,f4v,flv,h261,h263,m4v,mkv,mov,mp4,mpeg,mpeg4,mpg,mxf,ogv,rm,rmvb,webm,wmv,3gp2,dmsm,dvdmedia,dvr-ms,trp,vob,vro,gif,xvid | No limit | mp4, mov, mkv, m4v, avi, gif | 36 MP (Total Pixels) | 0.5s to 1 hour |

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

---

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
    
    def enhance_video(self, video_url, model_name, resolution, extension=".mp4", 
                     original_resolution=None):
        """Submit a video enhancement job"""
        url = f"{self.base_url}/api/video-enhancer"
        payload = {
            "video_url": video_url,
            "model_name": model_name,
            "resolution": resolution,
            "extension": extension
        }
        
        if original_resolution:
            payload["original_resolution"] = original_resolution
        
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

        # Example : Video Enhancement
        print("=== Video Enhancement ===")
        video_result = client.enhance_video(
            video_url="https://example.com/video.mp4",
            model_name="video_enhance_v2",
            resolution=[1920, 1080],
            original_resolution=[1280, 720]
        )
        print(f"Job ID: {video_result['job_id']}")
        print(f"Coins consumed: {video_result['consume_coins']}")
        
        # Wait for completion
        final_result = client.wait_for_completion(video_result['job_id'])
        print(f"Result URL: {final_result['res_url']}")
        
    except Exception as e:
        print(f"Error: {str(e)}")
```

## Support

For API key requests, billing questions, or technical support, please contact our support team.
