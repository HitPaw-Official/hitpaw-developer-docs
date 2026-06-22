---
sidebar_position: 2
title: Quick Start
---

# Quick Start

This guide will help you integrate the HitPaw Enhancement API into your workflow. The API allows you to programmatically access our professional-grade video and image enhancement models.

## Authentication

You will need an API key in order to make requests to this API. Make sure you never share your API key with anyone, and never commit it to a public repository.

Once you have your API key, set it as the `Apikey` header of your HTTP requests.

*   **Don't have an API key?** Get started by purchasing and managing your keys on our [API Platform](https://platform.hitpaw.com/), or apply for free trial credits via our [Request API Test Key Form](https://forms.gle/Kh8DVXjk8bs9SNoY7).
*   **Already have your API Key?** Skip the local setup and test the API directly in your browser. [Explore Playground →](https://playground.hitpaw.com/)

### Example Request

```bash
curl -X POST "https://api-base.hitpaw.com/api/video-enhancer" \
  -H "Apikey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "video_url": "https://example.com/video.mp4",
    "model_name": "general_restore_2x",
    "resolution": [1920, 1080],
    "extension": ".mp4",
    "original_resolution": [1280, 720]
  }'
```

## API Restrictions

*   **Rate Limits:** The API has access rate limits depending on the current load on the servers. If you receive an `HTTP 429` response, please try again soon. We recommend using an exponential backoff strategy for requests to avoid hitting the limit again.
*   **Protocol:** The API only responds to HTTPS-secured communications. Any requests sent via HTTP will return an `HTTP 301` redirect.

## Next Steps

Now that you're authenticated, you can start building:

1. **Review Available Models:** Check out our [Available Models](./available-models.md) to choose the right AI model for your specific video or image restoration task.
2. **Read the API Reference:** See the detailed [Video Enhancement API](../enhance/video-enhancement.md) or [Image Enhancement API](../enhance/image-enhancement.md) documentation to understand parameters and webhooks.
3. **Try MCP:** If you want to use our APIs within Claude Desktop or Cursor, learn how to set up the [MCP Server](./mcp-server.md).

## Contact Support

If you encounter any issues or have enterprise inquiries, please reach out to our engineering team at *[support@hitpaw.com](mailto:support@hitpaw.com)*.
