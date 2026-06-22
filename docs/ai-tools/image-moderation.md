---
sidebar_position: 2
title: Image Moderation
description: API reference for HitPaw Image Moderation. Detect sensitive, adult, or NSFW content in images automatically.
---

import LLMPageActions from '@site/src/components/LLMPageActions';

# Image Moderation API

<LLMPageActions
  llmsPath="/ai-tools/image-moderation/llms.txt"
  pageTitle="HitPaw Image Moderation API"
  publicPageUrl="https://developer.hitpaw.com/ai-tools/image-moderation"
/>

## Base URL
```
https://api-base.hitpaw.com
```

## Authentication
All API requests require authentication. 
*   **Don't have an API key?** Get started by purchasing and managing your keys on our [API Platform](https://platform.hitpaw.com/).

## Billing & Credits
HitPaw API uses a credit-based billing system.
* **Credits per Task:** Each image moderation task consumes **5 credits**, regardless of the image resolution.
* For more details, refer to the [API Pricing Guide](../get-started/pricing.md).

## Endpoints

### Initialize Task

**Endpoint:** `POST /api/image-nsfw`

**Description:** Submit an image moderation (NSFW detection) task to automatically detect sensitive, adult, or pornography content.

**Request Body:**
```json
{
    "file_url": "https://example.com/image.jpg"
}
```

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| file_url | string | Yes | URL of the image to be processed. Must be publicly accessible. |

**Response:**
```json
{
    "code": 200,
    "message": "OK",
    "data": {
        "job_id": "8f3c1d9a-4b2e-4f6c-9a1b-2a7b6c5d4e3f",
        "consume_coins": 5
    }
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| job_id | string | Unique identifier for the moderation job |
| consume_coins | integer | Number of credits (coins) consumed for this task (5 credits) |

**Example Request (cURL):**
```bash
curl -X POST https://api-base.hitpaw.com/api/image-nsfw \
  -H "Content-Type: application/json" \
  -H "Apikey: YOUR_API_KEY" \
  -d '{
    "file_url": "https://example.com/image.jpg"
  }'
```

---

### Task Status

**Endpoint:** `POST /api/task-status`

**Description:** Query the status of a submitted image moderation job. Use this endpoint to poll for job completion.

**Request Body:**
```json
{
  "job_id": "string"
}
```

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| job_id | string | Yes | Job ID returned from the image-nsfw endpoint |

**Response:**
```json
{
    "code": 200,
    "message": "OK",
    "data": {
        "job_id": "8f3c1d9a-4b2e-4f6c-9a1b-2a7b6c5d4e3f",
        "status": "string",
        "res_data": {
            "check_result": "string"
        }
    }
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| job_id | string | Job identifier |
| status | string | Current job status (`CONVERTING`, `COMPLETED`, or `ERROR`) |
| res_data | object | Object containing the moderation results |
| res_data.check_result | string | NSFW risk detection level. Only populated when `status` is `COMPLETED`. Returns `""` (empty string) otherwise. |

:::note No Image Output
Unlike other image APIs, the Image Moderation API does not return any output image URLs (`res_url` or `mask_url`). The result is represented strictly by the safety check assessment value (`check_result`).
:::

#### Status Values (`status`)

| Status | Description |
|--------|-------------|
| `CONVERTING` | Job is currently being processed (including queueing and execution) |
| `COMPLETED` | Job has completed successfully, safety assessment result is available |
| `ERROR` | Job failed due to a processing error |

#### Detection Results (`check_result`)

| Value | Meaning | Recommended Action |
|-------|---------|--------------------|
| `low` | Low Risk / Safe | Pass / Allow |
| `mid` | Medium Risk / Suspected | Review manually / Apply business policies |
| `high` | High Risk / NSFW | Block / Intercept |

**Example Request (cURL):**
```bash
curl -X POST https://api-base.hitpaw.com/api/task-status \
  -H "Content-Type: application/json" \
  -H "Apikey: YOUR_API_KEY" \
  -d '{
    "job_id": "8f3c1d9a-4b2e-4f6c-9a1b-2a7b6c5d4e3f"
  }'
```

**Example Responses:**

<details>
<summary>Processing (status = CONVERTING)</summary>

```json
{
    "code": 200,
    "message": "OK",
    "data": {
        "job_id": "8f3c1d9a-4b2e-4f6c-9a1b-2a7b6c5d4e3f",
        "status": "CONVERTING",
        "res_data": {
            "check_result": ""
        }
    }
}
```

</details>

<details>
<summary>Completed - Low Risk (status = COMPLETED)</summary>

```json
{
    "code": 200,
    "message": "OK",
    "data": {
        "job_id": "8f3c1d9a-4b2e-4f6c-9a1b-2a7b6c5d4e3f",
        "status": "COMPLETED",
        "res_data": {
            "check_result": "low"
        }
    }
}
```

</details>

<details>
<summary>Completed - High Risk (status = COMPLETED)</summary>

```json
{
    "code": 200,
    "message": "OK",
    "data": {
        "job_id": "8f3c1d9a-4b2e-4f6c-9a1b-2a7b6c5d4e3f",
        "status": "COMPLETED",
        "res_data": {
            "check_result": "high"
        }
    }
}
```

</details>

<details>
<summary>Failed (status = ERROR)</summary>

```json
{
    "code": 200,
    "message": "OK",
    "data": {
        "job_id": "8f3c1d9a-4b2e-4f6c-9a1b-2a7b6c5d4e3f",
        "status": "ERROR",
        "res_data": {
            "check_result": ""
        }
    }
}
```

</details>

---

## Error Codes

### General Errors

| Error Code | HTTP Status | Message |
|------------|-------------|---------|
| 100400000 | 400 | No access |
| 100400001 | 400 | Invalid URL |
| 100400002 | 400 | Bad Request |
| 100401000 | 401 | Token is expired |
| 100500000 | 500 | Internal error |

### API-Specific Errors

| Error Code | HTTP Status | Message |
|------------|-------------|---------|
| 110400000 | 400 | api_key is not valid |
| 110400002 | 400 | The task is not exist |
| 110400007 | 400 | The extension is not valid |
| 110400009 | 400 | The input resolution is over limit |
| 110400012 | 400 | Get The image resolution is failed,please try a new image |
| 110402001 | 402 | The coins is not enough |

:::note Response for Synchronous Errors
Synchronous errors (during initialization, parameter validation, authentication, or insufficient credits) are returned in the following format with the corresponding HTTP status code:
```json
{
  "code": 110402001,
  "message": "The coins is not enough"
}
```
Failures during task execution are only expressed via `status = ERROR` in the status query response, without any error code.
:::

---

## Python Complete Example

```python
import requests
import time
import json

class HitPawAIClient:
    def __init__(self, api_key, base_url="https://api-base.hitpaw.com"):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            "Content-Type": "application/json",
            "Apikey": api_key
        }
    
    def moderate_image(self, file_url):
        """Submit an image moderation job"""
        url = f"{self.base_url}/api/image-nsfw"
        payload = {"file_url": file_url}
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

    def wait_for_completion(self, job_id, max_attempts=60, poll_interval=2):
        """Poll job status until completion or error"""
        attempt = 0
        while attempt < max_attempts:
            result = self.check_status(job_id)
            # Docusaurus standard wraps results in 'data'
            data = result.get('data', {})
            status = data.get('status')
            print(f"[Attempt {attempt + 1}] Status: {status}")
            
            if status == "COMPLETED":
                return data
            elif status == "ERROR":
                raise Exception("Job failed with ERROR status")
            
            time.sleep(poll_interval)
            attempt += 1
            
        raise Exception("Polling timeout")

if __name__ == "__main__":
    client = HitPawAIClient(api_key="YOUR_API_KEY")
    
    try:
        print("Submitting Image Moderation Task...")
        job = client.moderate_image("https://example.com/input.jpg")
        job_data = job.get('data', {})
        job_id = job_data.get('job_id')
        print(f"Job ID: {job_id}")
        
        print("Polling for results...")
        result = client.wait_for_completion(job_id)
        
        print("Task Completed Successfully!")
        check_result = result.get('res_data', {}).get('check_result')
        print(f"Moderation Result (Risk Level): {check_result}")
            
    except Exception as e:
        print(f"Task Failed: {e}")
```

---

## Best Practices

1. **Format Capabilities**: The API supports `.jpg`, `.jpeg`, `.png`, and `.webp` formats. File extensions are validated upon submission.
2. **Access Rights**: Ensure your input `file_url` is publicly accessible so our moderation service can retrieve and analyze the image.
3. **No Image Storage**: For security and privacy compliance, the Image Moderation API never stores or returns any processed images (e.g., `res_url`). It only returns the risk assessment value.
4. **Polling Intervals**: After submitting a job, interval status polls using the `/task-status` endpoint at a ~1-3s cadence for the quickest real-time response capture.

:::tip Ready to Start?
Get started by purchasing and managing your keys on the [HitPaw API Platform](https://platform.hitpaw.com/) to unlock full access to the HitPaw API.
:::
