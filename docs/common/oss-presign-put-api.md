---
sidebar_position: 1
title: OSS Pre-sign Upload
description: API documentation for HitPaw OSS Pre-sign Upload, enabling secure and direct file uploads to cloud storage.
---

import LLMPageActions from '@site/src/components/LLMPageActions';

<LLMPageActions
  llmsPath="/common/oss-presign-put-api/llms.txt"
  pageTitle="HitPaw OSS Pre-sign Upload API"
  publicPageUrl="https://developer.hitpaw.com/common/oss-presign-put-api"
/>

# OSS Pre-sign Upload API

## Overview

The pre-sign upload mechanism allows clients (Web, Mobile, Desktop) to upload files directly to Alibaba Cloud OSS using a signed URL. This eliminates the need for clients to hold AccessKeys or manually set signature headers, ensuring a secure and streamlined upload process.

**Workflow:**

1. [Step 1](#step-1-get-pre-signed-upload-url): The client requests a pre-signed PUT URL from the server.
2. The server responds with an `upload_url` (signed PUT address) and an `access_url` (the public or CDN address to access the file after upload).
3. [Step 2](#step-2-upload-file-to-oss): The client directly uploads the file body to the `upload_url` using an HTTP PUT request.
4. Once the upload is complete, the file becomes available via the `access_url`.

---

## Step 1: Get Pre-Signed Upload URL

### Request

```http
POST /api/oss/presign-put
Content-Type: application/json
Apikey: YOUR_API_KEY
```

#### Request Body

| Field              | Type   | Required | Description                                                                                                                             |
| ------------------ | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `filename`       | string | Yes      | The filename (including extension), used to infer Content-Type and generate the storage path. Examples:`"photo.jpg"`, `"video.mp4"` |
| `content_type`   | string | Yes      | The Content-Type of the file. Supported values are listed in the [Supported File Types](#supported-file-types) section. |
| `expire_seconds` | int    | No       | The validity period of the pre-signed URL in seconds. Range: 60-7200. Default: 3600.                                                    |

#### Example Request

```json
{
  "filename": "my-photo.jpg",
  "content_type": "image/jpeg",
  "expire_seconds": 3600
}
```

### Response

#### Response Body

| Field            | Type   | Description                                                                                                              |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| `upload_url`   | string | The pre-signed PUT URL. The client must PUT the file content directly to this address.                                   |
| `access_url`   | string | The URL through which the file can be accessed after upload (via CDN or custom domain).                                  |
| `object_key`   | string | The OSS object path.                                                                                                     |
| `content_type` | string | The Content-Type the client**must** set during the PUT request. This must match the actual request header exactly. |
| `expire_at`    | int    | The expiration timestamp of the pre-signed URL (Unix timestamp, in seconds).                                             |

#### Example Response

```json
{
  "code": 0,
  "data": {
    "upload_url": "https://bucket.oss-us-west-1.aliyuncs.com/uploads/2026/03/25/a1b2c3d4.jpg?OSSAccessKeyId=xxx&Expires=1742954400&Signature=yyy",
    "access_url": "https://cdn.example.com/uploads/2026/03/25/a1b2c3d4.jpg",
    "object_key": "uploads/2026/03/25/a1b2c3d4.jpg",
    "content_type": "image/jpeg",
    "expire_at": 1742954400
  }
}
```

---

## Step 1 (Batch): Batch Get Pre-Signed Upload URLs

### Request

```http
POST /api/oss/presign-put/batch
Content-Type: application/json
Apikey: YOUR_API_KEY
```

#### Request Body

| Field                    | Type   | Required | Description                                                                       |
| ------------------------ | ------ | -------- | --------------------------------------------------------------------------------- |
| `files`                | array  | Yes      | A list of files to upload (1-20 items).                                           |
| `files[].filename`     | string | Yes      | The filename (including extension).                                               |
| `files[].content_type` | string | Yes      | The Content-Type of the file. Supported values are listed in the [Supported File Types](#supported-file-types) section. |
| `expire_seconds`       | int    | No       | A unified validity period for all URLs in seconds. Range: 60-7200. Default: 3600. |

#### Example Request

```json
{
  "files": [
    { "filename": "cover.png", "content_type": "image/png" },
    { "filename": "trailer.mp4", "content_type": "video/mp4" },
    { "filename": "song.mp3", "content_type": "audio/mpeg" }
  ],
  "expire_seconds": 1800
}
```

### Response

#### Response Body

| Field                    | Type   | Description                                                                         |
| ------------------------ | ------ | ----------------------------------------------------------------------------------- |
| `total`                | int    | Total number of files requested.                                                    |
| `success`              | int    | Number of successfully generated pre-signed URLs.                                   |
| `failed`               | int    | Number of failed generations.                                                       |
| `items`                | array  | A list of pre-signed results, corresponding 1:1 with the requested `files` array. |
| `items[].upload_url`   | string | The pre-signed PUT URL.                                                             |
| `items[].access_url`   | string | The URL through which the file can be accessed after upload.                        |
| `items[].object_key`   | string | The OSS object path.                                                                |
| `items[].content_type` | string | The Content-Type the client must use during the PUT request.                        |
| `items[].expire_at`    | int    | Expire time (Unix timestamp, in seconds).                                           |

#### Example Response

```json
{
  "code": 0,
  "data": {
    "total": 3,
    "success": 3,
    "failed": 0,
    "items": [
      {
        "upload_url": "https://bucket.oss-us-west-1.aliyuncs.com/uploads/2026/03/25/e5f6a7b8.png?...",
        "access_url": "https://cdn.example.com/uploads/2026/03/25/e5f6a7b8.png",
        "object_key": "uploads/2026/03/25/e5f6a7b8.png",
        "content_type": "image/png",
        "expire_at": 1742952600
      },
      {
        "upload_url": "https://bucket.oss-us-west-1.aliyuncs.com/uploads/2026/03/25/c9d0e1f2.mp4?...",
        "access_url": "https://cdn.example.com/uploads/2026/03/25/c9d0e1f2.mp4",
        "object_key": "uploads/2026/03/25/c9d0e1f2.mp4",
        "content_type": "video/mp4",
        "expire_at": 1742952600
      },
      {
        "upload_url": "https://bucket.oss-us-west-1.aliyuncs.com/uploads/2026/03/25/a3b4c5d6.mp3?...",
        "access_url": "https://cdn.example.com/uploads/2026/03/25/a3b4c5d6.mp3",
        "object_key": "uploads/2026/03/25/a3b4c5d6.mp3",
        "content_type": "audio/mpeg",
        "expire_at": 1742952600
      }
    ]
  }
}
```

---

## Step 2: Upload File to OSS

After obtaining the pre-signed URL (Step 1), the client must perform a direct upload to OSS.

### Request

```http
PUT {upload_url}
Content-Type: {content_type}
```

#### Request Headers

| Header         | Type   | Required | Description                                                                                                                             |
| -------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `Content-Type` | string | Yes      | Must strictly match the `content_type` returned in the response from Step 1.                                                            |

#### Request Body

*   **Binary Data**: The actual file content to be uploaded (the raw byte stream).

#### Example Request

```bash
# Replace {upload_url} and {content_type} with the values returned in Step 1
curl -X PUT \
  -H "Content-Type: image/jpeg" \
  --data-binary @photo.jpg \
  "https://bucket.oss-us-west-1.aliyuncs.com/uploads/..."
```

### Response

#### Response Status

*   **200 OK**: Upload successful.
*   **403 Forbidden**: Signature mismatch or expired URL. Usually caused by an incorrect `Content-Type` header or the URL exceeding its `expire_seconds`.

#### Example Response

```http
HTTP/1.1 200 OK
Content-Length: 0
Connection: keep-alive
x-oss-request-id: 56345880014522
Date: Wed, 25 Mar 2026 12:00:00 GMT
```
(Note: A successful OSS PUT response usually contains an empty body.)

---

## Supported File Types

| Type     | Extension            | Content-Type         |
| -------- | -------------------- | -------------------- |
| Image    | `.jpg` / `.jpeg` | `image/jpeg`       |
| Image    | `.png`             | `image/png`        |
| Image    | `.gif`             | `image/gif`        |
| Image    | `.webp`            | `image/webp`       |
| Image    | `.bmp`             | `image/bmp`        |
| Video    | `.mp4`             | `video/mp4`        |
| Video    | `.mov`             | `video/quicktime`  |
| Video    | `.avi`             | `video/x-msvideo`  |
| Video    | `.mkv`             | `video/x-matroska` |
| Video    | `.webm`            | `video/webm`       |
| Audio    | `.mp3`             | `audio/mpeg`       |
| Audio    | `.wav`             | `audio/wav`        |
| Audio    | `.aac`             | `audio/aac`        |
| Audio    | `.m4a`             | `audio/mp4`        |
| Document | `.pdf`             | `application/pdf`  |

File extensions that are not in the whitelist will return a 400 error.

---

## Client Upload Examples

### cURL

```bash
# 1. Get the pre-signed URL
curl -X POST https://api.example.com/api/oss/presign-put \
   -H "Content-Type: application/json" \
   -H "Apikey: YOUR_API_KEY" \
   -d '{"filename": "photo.jpg", "content_type": "image/jpeg"}'

# 2. Upload the file directly using the returned upload_url (ensure Content-Type strictly matches)
curl -X PUT \
  -H "Content-Type: image/jpeg" \
  -T ./photo.jpg \
  "<upload_url>"
```

### JavaScript (Web Frontend)

```javascript
// 1. Get the pre-signed URL
const presignResp = await fetch('/api/oss/presign-put', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
     'Apikey': 'YOUR_API_KEY',
   },
   body: JSON.stringify({
     filename: file.name,
     content_type: file.type,
     expire_seconds: 3600,
   }),
});
const { data } = await presignResp.json();

// 2. Direct PUT upload
const uploadResp = await fetch(data.upload_url, {
  method: 'PUT',
  headers: {
    'Content-Type': data.content_type,
  },
  body: file, // File Object
});

if (uploadResp.ok) {
  console.log('Upload successful. Access URL:', data.access_url);
}
```

### JavaScript (XMLHttpRequest with Progress)

```javascript
async function uploadWithProgress(file, onProgress) {
  // 1. Get the pre-signed URL
  const presignResp = await fetch('/api/oss/presign-put', {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
       'Apikey': 'YOUR_API_KEY',
     },
     body: JSON.stringify({ filename: file.name, content_type: file.type }),
  });
  const { data } = await presignResp.json();

  // 2. Upload via XMLHttpRequest (supports progress callback)
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', data.upload_url);
    xhr.setRequestHeader('Content-Type', data.content_type);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ accessUrl: data.access_url, objectKey: data.object_key });
      } else {
        reject(new Error(`Upload failed: ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error'));
    xhr.send(file);
  });
}

// Usage
uploadWithProgress(fileInput.files[0], (pct) => {
  console.log(`Upload progress: ${pct}%`);
}).then((result) => {
  console.log('Access URL:', result.accessUrl);
});
```

### Swift (iOS)

```swift
func presignUpload(file: Data, filename: String) async throws -> String {
    // 1. Get the pre-signed URL
    var presignReq = URLRequest(url: URL(string: "\(baseURL)/api/oss/presign-put")!)
    presignReq.httpMethod = "POST"
    presignReq.setValue("application/json", forHTTPHeaderField: "Content-Type")
     presignReq.setValue("YOUR_API_KEY", forHTTPHeaderField: "Apikey")
     presignReq.httpBody = try JSONEncoder().encode([
         "filename": filename,
         "content_type": "image/jpeg"
     ])

    let (data, _) = try await URLSession.shared.data(for: presignReq)
    let resp = try JSONDecoder().decode(PresignResponse.self, from: data)

    // 2. Direct PUT upload
    var uploadReq = URLRequest(url: URL(string: resp.data.uploadURL)!)
    uploadReq.httpMethod = "PUT"
    uploadReq.setValue(resp.data.contentType, forHTTPHeaderField: "Content-Type")
    uploadReq.httpBody = file

    let (_, uploadResp) = try await URLSession.shared.data(for: uploadReq)
    guard let httpResp = uploadResp as? HTTPURLResponse,
          (200..<300).contains(httpResp.statusCode) else {
        throw URLError(.badServerResponse)
    }

    return resp.data.accessURL
}
```

### Kotlin (Android)

```kotlin
suspend fun presignUpload(file: File): String {
    val client = OkHttpClient()

    // 1. Get the pre-signed URL
     val presignBody = """{"filename": "${file.name}", "content_type": "image/jpeg"}"""
         .toRequestBody("application/json".toMediaType())

    val presignReq = Request.Builder()
         .url("$baseUrl/api/oss/presign-put")
         .header("Apikey", "YOUR_API_KEY")
         .post(presignBody)
         .build()

    val presignResp = client.newCall(presignReq).await()
    val data = JSONObject(presignResp.body!!.string())
        .getJSONObject("data")

    val uploadUrl = data.getString("upload_url")
    val contentType = data.getString("content_type")
    val accessUrl = data.getString("access_url")

    // 2. Direct PUT upload
    val fileBody = file.asRequestBody(contentType.toMediaType())
    val uploadReq = Request.Builder()
        .url(uploadUrl)
        .put(fileBody)
        .build()

    val uploadResp = client.newCall(uploadReq).await()
    if (!uploadResp.isSuccessful) {
        throw IOException("Upload failed: ${uploadResp.code}")
    }

    return accessUrl
}
```

---

## Error Codes

| HTTP Status Code | Description                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| 400              | Parameter error: missing filename, extension not in whitelist, etc.         |
| 401              | Authentication failed                                                       |
| 500              | Server error: OSS client not initialized, signature generation failed, etc. |

:::tip Ready to Start?
Get started by [Purchasing an API Key Now](https://www.hitpaw.com/hitpaw-api.html) to unlock full access to the HitPaw Enhancement API.
:::

