---
sidebar_position: 4
title: MCP Integration
---

# MCP Integration

HitPaw now provides an MCP (Model Context Protocol) server for image and video enhancement workflows. This page focuses on the **video** side of the MCP integration.

This allows LLM clients such as Claude Desktop and Cursor to call HitPaw video tools directly instead of integrating the REST API by hand.

Repository:
[HitPaw MCP Server](https://github.com/HitPaw-Official/hitpaw-mcp-server)

## What You Can Do With MCP

With the HitPaw MCP server, an LLM client can:

- select a suitable video model based on the input content
- submit a video enhancement task
- check task status and fetch the result URL
- transfer remote files to OSS before processing
- list available video models and their supported resolutions

The same MCP server also supports image enhancement. See the image documentation section for image-specific guidance.

## Supported Video Tools

The current video MCP workflow is built around these tools:

| Tool | Purpose |
| :--- | :--- |
| `video_enhance` | Submit a video enhancement or super-resolution task |
| `task_status` | Query task progress and retrieve the result URL |
| `oss_transfer` | Transfer a remote file to OSS and get a stable URL |
| `oss_batch_transfer` | Transfer multiple remote files to OSS |
| `list_video_models` | List video enhancement models and supported scenarios |

## Why Use MCP Instead of Calling the API Directly

Use MCP when you want an LLM client to orchestrate the workflow for you.

- It reduces integration work for prompt-driven workflows.
- It lets Claude or Cursor select a model based on the video type.
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

1. The user shares a video URL with Claude or Cursor.
2. The client calls `list_video_models` to determine the best model.
3. The client calls `video_enhance` with the selected model and target resolution.
4. The client calls `task_status` until the result is ready.
5. The client returns the enhanced video URL.

Example request in natural language:

```text
Please enhance this video to 1080p and keep faces stable:
https://example.com/video.mp4
```

## Environment Variables

| Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `HITPAW_API_KEY` | Yes | None | HitPaw API key |
| `HITPAW_API_BASE_URL` | No | `https://api-base.hitpaw.com` | API service base URL |

## When To Use MCP

MCP is a good fit when:

- you want to trigger video enhancement from Claude or Cursor
- your workflow is prompt-first rather than app-first
- you want model selection and task polling handled by the AI client

If you are integrating HitPaw into your own product or backend, start with the [API Reference](./API-reference.md) instead.

## Related Links

- [Video API Reference](./API-reference.md)
- [Available Models](./available-models.md)
- [Image MCP Integration](../image/MCP.md)
- [HitPaw MCP Server on GitHub](https://github.com/HitPaw-Official/hitpaw-mcp-server)

:::tip Ready to Start?
Get started by [Purchasing an API Key Now](https://www.hitpaw.com/hitpaw-api.html) to unlock full access to the HitPaw Enhancement API.
:::

