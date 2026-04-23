---
sidebar_position: 1
---

import compare_general_restore_video_2 from './asset/compare_general_restore_video_2.mp4'; 

# Introduction
Video restoration and super-resolution powered by AI.

## Overview
Welcome to our Video Enhancement API!

Our video processing services provide industrial-grade solutions for restoring and upscaling video content:

*   **Video Upscale:** Convert SD or HD footage to 4K Ultra HD clarity using deep convolution and feature learning technologies.
*   **Portrait Restoration:** specialized models to detect, stabilize, and enhance faces in video streams, removing motion blur and noise while maintaining identity.
*   **General Restoration:** A comprehensive solution based on GAN technology to de-noise, de-blur, and enhance details in general video content.
*   **Generative Reconstruction:** Utilizing Stable Diffusion for video to reconstruct textures and details in extremely low-quality footage.

Our video models focus on three core pillars:

*   **Temporal Stability:** Unlike image-only models, our video engines ensure smooth transitions between frames, eliminating flickering and jitter.
*   **Clarity:** Recovering fine details and removing compression artifacts common in streaming or legacy media.
*   **Performance:** Optimized inference times to handle heavy video processing workloads efficiently.

## Model Classes
Our Video API classifies models based on the restoration approach:

1.  **Restoration & Upscale (Standard):** Models like *Ultra HD* and *General Restore* focus on cleaning up the footage and increasing resolution without altering the fundamental content. They rely on pixel-perfect accuracy and temporal consistency.
2.  **Generative Video:** The *Generative Model* uses advanced logic-based reconstruction. It is designed for "impossible" restoration tasks where the source video lacks sufficient data, generating realistic textures and details to fill the gaps.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <video muted controls preload width="80%">
    <source src={compare_general_restore_video_2} type="video/mp4" />
  </video>
</div>

## MCP Integration

If you want to use HitPaw video enhancement directly from AI clients such as Claude Desktop or Cursor, you can also connect through MCP (Model Context Protocol).

The HitPaw MCP server lets an LLM client choose a video model, submit enhancement tasks, and poll for results using your HitPaw API key.

See [MCP Integration](./MCP.md) for setup instructions and example configuration.

## Authentication

You will need an API key in order to make requests to this API. Make sure you never share your API key with anyone, and never commit it to a public repository.

Once you have your API key, set it as the `APIKEY` header of your requests.

*   **Don't have an API key?** Get started by [Purchasing an API Key Now](https://www.hitpaw.com/hitpaw-api.html).
*   **Already have your API Key?** Skip the local setup and test the API directly in your browser. [Explore Playground →](https://playground.hitpaw.com/)

## API Restrictions
*   **Rate Limits:** The API has access rate limits depending on the current load on the servers. If you receive an `HTTP 429` response, please try again soon. We recommend using an exponential backoff strategy for requests to avoid hitting the limit again.
*   **Protocol:** The API only responds to HTTPS-secured communications. Any requests sent via HTTP will return an `HTTP 301` redirect.

## Contact
Please reach out to *[support@hitpaw.com](mailto:support@hitpaw.com)*. with any questions or for enterprise inquiries.

:::tip Ready to Start?
Get started by [Purchasing an API Key Now](https://www.hitpaw.com/hitpaw-api.html) to unlock full access to the HitPaw Enhancement API.
:::

