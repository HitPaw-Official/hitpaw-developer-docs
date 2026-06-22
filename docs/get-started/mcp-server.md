---
sidebar_position: 6
title: MCP Integration
---

# MCP Integration

HitPaw provides an MCP (Model Context Protocol) server for image enhancement, video enhancement, and image segmentation workflows.

This allows LLM clients such as Claude Desktop and Cursor to call HitPaw tools directly instead of integrating the REST API by hand.

Repository:
[HitPaw MCP Server](https://github.com/HitPaw-Official/hitpaw-mcp-server)

## What You Can Do With MCP

With the HitPaw MCP server, an LLM client can:

- select a suitable image or video model based on the input content
- submit an enhancement or segmentation task
- check task status and fetch the result URL
- transfer remote files to OSS before processing (OSS pre-upload)
- list available models and their recommended use cases

## Supported Tools

The current MCP workflow is built around these tools:

### AI Processing Tools
| Tool | Purpose |
| :--- | :--- |
| `photo_enhance` | Submit an image enhancement or super-resolution task |
| `video_enhance` | Submit a video enhancement or super-resolution task |
| `image_segmentation` | Submit an image segmentation or background removal task |

### OSS Tools
| Tool | Purpose |
| :--- | :--- |
| `oss_transfer` | Transfer a single remote file to OSS and get a stable URL (OSS pre-upload) |
| `oss_batch_transfer` | Transfer multiple remote files to OSS (OSS batch pre-upload) |

### Common Tools
| Tool | Purpose |
| :--- | :--- |
| `task_status` | Query task progress and retrieve the result URL |
| `list_photo_models` | List image enhancement models and usage guidance |
| `list_video_models` | List video enhancement models and supported scenarios |

## Why Use MCP Instead of Calling the API Directly

Use MCP when you want an LLM client to orchestrate the workflow for you.

- It reduces integration work for prompt-driven workflows.
- It lets Claude or Cursor choose a model based on the content type.
- It keeps the enhancement flow inside the AI client your team already uses.

Use the REST API directly when you are building a product-side integration, backend service, or custom application logic.

## Quick Start

### 1. Set your API key

The MCP server uses the same HitPaw API key as the standard API.

```bash
export HITPAW_API_KEY=your_api_key_here
```

Optional:

```bash
export HITPAW_API_BASE_URL=https://api-base.hitpaw.com
```

### 2. Run the MCP server

Recommended:

```bash
npx @hitpaw/mcp-server
```

You can also install it globally:

```bash
npm install -g @hitpaw/mcp-server
hitpaw-mcp-server
```

## Claude Desktop Configuration

Edit the Claude Desktop configuration file:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "hitpaw": {
      "command": "npx",
      "args": ["-y", "@hitpaw/mcp-server"],
      "env": {
        "HITPAW_API_KEY": "your_api_key_here",
        "HITPAW_API_BASE_URL": "https://api-base.hitpaw.com"
      }
    }
  }
}
```

Restart Claude Desktop after saving the configuration.

## Cursor Configuration

Edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "hitpaw": {
      "command": "npx",
      "args": ["-y", "@hitpaw/mcp-server"],
      "env": {
        "HITPAW_API_KEY": "your_api_key_here",
        "HITPAW_API_BASE_URL": "https://api-base.hitpaw.com"
      }
    }
  }
}
```

## Example Workflow

Typical prompt flow:

1. The user shares a media URL with Claude or Cursor.
2. The client calls `list_photo_models` or `list_video_models` to determine the best model.
3. The client calls the appropriate enhancement or segmentation tool with the selected model.
4. The client calls `task_status` until the result is ready.
5. The client returns the enhanced media URL.

Example request in natural language:

```text
Please enhance this image and preserve natural facial texture:
https://example.com/photo.jpg

Or segment the main subject in this image:
https://example.com/subject.png
```

## Environment Variables

| Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `HITPAW_API_KEY` | Yes | None | HitPaw API key |
| `HITPAW_API_BASE_URL` | No | `https://api-base.hitpaw.com` | API service base URL |

## When To Use MCP

MCP is a good fit when:

- you want to trigger media enhancement or segmentation from Claude or Cursor
- your workflow is prompt-first rather than app-first
- you want model selection and task polling handled by the AI client

If you are integrating HitPaw into your own product or backend, start with the [Image API Reference](../enhance/image-enhancement.md) or [Video API Reference](../enhance/video-enhancement.md) instead.

## Related Links

- [Image API Reference](../enhance/image-enhancement.md)
- [Video API Reference](../enhance/video-enhancement.md)
- [Image Segmentation](../ai-tools/image-segmentation.md)
- [Available Models](./available-models.md)
- [HitPaw MCP Server on GitHub](https://github.com/HitPaw-Official/hitpaw-mcp-server)

:::tip Ready to Start?
Get started by purchasing and managing your keys on the [HitPaw API Platform](https://platform.hitpaw.com/) to unlock full access to the HitPaw Enhancement API.
:::
