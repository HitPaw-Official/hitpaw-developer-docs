---
sidebar_position: 100
title: FAQ & Troubleshooting
---

# FAQ & Troubleshooting

This guide provides answers to frequently asked questions and troubleshooting steps for common issues encountered when integrating and using the HitPaw Enhancement API.

---

## 1. Account & Billing

<details>
  <summary><b>Q: How are API requests billed?</b></summary>
  <div>
    <p>HitPaw API uses a credit-based billing system. Credits (coins) are deducted based on the specific API you call:</p>
    <ul>
      <li><b>Image Enhancement:</b> Billed per image based on the selected model category and output resolution tier (10 to 480 credits per image).</li>
      <li><b>Video Enhancement:</b> Billed per second of output video, depending on the model, resolution, and frame rate.</li>
      <li><b>Image Segmentation:</b> Flat rate of 20 credits per image.</li>
      <li><b>Image Moderation:</b> Flat rate of 5 credits per image.</li>
    </ul>
    <p>For a detailed breakdown of pricing tiers, please refer to the <a href="./get-started/pricing">API Pricing Guide</a>.</p>
  </div>
</details>

<details>
  <summary><b>Q: I purchased credits, but my API calls still return <code>110402000 (The coins are not enough)</code>. What should I do?</b></summary>
  <div>
    <p>Purchased credits are typically synchronized with your API account within 1 to 3 minutes. If you are still seeing insufficient balance errors after 5 minutes, please perform the following checks:</p>
    <ol>
      <li>Log in to the <a href="https://platform.hitpaw.com/">HitPaw API Platform</a> and verify that your credit balance has updated.</li>
      <li>Double-check the <code>Apikey</code> header in your request to ensure it matches the API Key of the account you recharged.</li>
      <li>If the balance is correct on the platform but API calls still fail, please contact our engineering support at <i>support@hitpaw.com</i>.</li>
    </ol>
  </div>
</details>

---

## 2. API Keys & Authentication

<details>
  <summary><b>Q: Where do I find or create my API key?</b></summary>
  <div>
    <p>You can manage and create your API keys on the <a href="https://platform.hitpaw.com/">HitPaw API Platform</a>. Once logged in, go to the API Keys section to generate a new key or copy your existing key.</p>
  </div>
</details>

<details>
  <summary><b>Q: How should I pass my API key in requests?</b></summary>
  <div>
    <p>You must pass your API key as a custom header named <code>Apikey</code> in all HTTP requests. For example:</p>
    <pre><code>Apikey: YOUR_API_KEY_HERE</code></pre>
    <p>Do not pass the key as a query parameter or inside the request body.</p>
  </div>
</details>

<details>
  <summary><b>Q: What are the API rate limits?</b></summary>
  <div>
    <p>Our APIs implement rate limiting to ensure platform stability. If you exceed the allowed request frequency, the API will return an <code>HTTP 429</code> status code with error code <code>100429000</code>.</p>
    <p><b>Recommended Action:</b> Implement an exponential backoff strategy in your retry mechanism (e.g., waiting 1s, then 2s, 4s, etc.) before retrying the request.</p>
  </div>
</details>

---

## 3. Media Handling & Limits

<details>
  <summary><b>Q: Why does my task fail with a download error or <code>Invalid URL</code>?</b></summary>
  <div>
    <p>This usually occurs when the HitPaw servers fail to fetch the image or video from the URL provided in <code>img_url</code>, <code>video_url</code>, or <code>file_url</code>. Common reasons include:</p>
    <ul>
      <li>The URL is not publicly accessible (e.g., hosted on localhost or behind a private intranet).</li>
      <li>The hosting server has anti-bot protections, hotlinking restrictions, or geo-blocking that blocks requests from our servers.</li>
      <li>The URL requires authentication headers, cookies, or has expired.</li>
    </ul>
    <p><b>Best Practice Solution:</b> We highly recommend using our <a href="./common/oss-storage">OSS Pre-sign Upload API</a>. By uploading your media files directly to our secure storage first and submitting the generated <code>access_url</code>, you bypass external network instability and guarantee a 100% download success rate.</p>
  </div>
</details>

<details>
  <summary><b>Q: My task status remains stuck in <code>CONVERTING</code> (e.g., over 15 minutes) or fails silently. What causes this?</b></summary>
  <div>
    <p>This typically happens when our servers encounter network timeouts or permissions barriers while downloading the source file from your external storage provider (such as <b>Firebase Storage</b>, <b>AWS S3</b>, or <b>Google Cloud Storage</b>).</p>
    <p>Certain cloud storage configurations block automated user-agent downloads or suffer from cross-region routing latency that blocks our download pipeline.</p>
    <p><b>Solution:</b> Use our <a href="./common/oss-storage">OSS Pre-sign Upload API</a> to upload the image or video directly to our local environment before triggering the task. This ensures maximum stability and speed.</p>
    <p><i>Note: Staged source files uploaded to our storage are kept for only <b>7 days</b> before automatic deletion.</i></p>
  </div>
</details>

<details>
  <summary><b>Q: What are the input media file limits?</b></summary>
  <div>
    <p>Please observe the following limits to prevent validation errors:</p>
    <ul>
      <li><b>Image Enhancement:</b> Maximum input resolution is 70 megapixels (MP) for standard models, and 34 megapixels (MP) for generative diffusion models.</li>
      <li><b>Video Enhancement:</b> Maximum output resolution is 36 megapixels (MP). Video duration must be between 0.5 seconds and 1 hour.</li>
    </ul>
    <p>If your media exceeds these limits, please compress or crop the file before submission.</p>
  </div>
</details>

<details>
  <summary><b>Q: Which image and video formats are supported?</b></summary>
  <div>
    <p>We support a wide array of formats:</p>
    <ul>
      <li><b>Images:</b> `.jpg`, `.jpeg`, `.png`, `.webp`, `.bmp`, `.jfif`, `.tga`, `.tiff`, and `.heif`.</li>
      <li><b>Videos:</b> `.mp4`, `.mov`, `.avi`, `.mkv`, `.flv`, `.mpeg`, `.webm`, `.wmv`, and `.gif` (using standard codecs).</li>
    </ul>
  </div>
</details>

---

## 4. Task Status & Webhooks

<details>
  <summary><b>Q: How often should I poll the <code>/api/task-status</code> endpoint?</b></summary>
  <div>
    <p>To avoid hitting rate limits and generating unnecessary server load, we recommend the following polling intervals:</p>
    <ul>
      <li><b>Image Processing Tasks:</b> Poll every 2 to 5 seconds.</li>
      <li><b>Video Processing Tasks:</b> Poll every 5 to 10 seconds (as video processing takes longer).</li>
    </ul>
    <p>Ensure you set a maximum number of polling attempts (e.g., 60 to 120 attempts) to prevent infinite loops in your application.</p>
  </div>
</details>

<details>
  <summary><b>Q: How long are the enhanced files stored on HitPaw servers?</b></summary>
  <div>
    <p>For privacy and resource efficiency, all processed output files (available via <code>res_url</code>) are automatically deleted after <b>8 days</b>. You must download and persist these files to your own storage provider before they expire.</p>
  </div>
</details>

---

## Need More Help?

If you encounter an issue not covered here or require custom enterprise limits, please reach out to our engineering support team at *[support@hitpaw.com](mailto:support@hitpaw.com)*.
