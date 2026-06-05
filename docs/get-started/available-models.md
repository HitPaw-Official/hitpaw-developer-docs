---
sidebar_position: 4
title: Available Models
---

import compare_face_soft_video_1 from './asset/compare_face_soft_video_1.mp4'; 
import compare_portrait_restore_video_1 from './asset/compare_portrait_restore_video_1.mp4'; 
import compare_general_restore_video_1 from './asset/compare_general_restore_video_1.mp4';
import compare_general_restore_video_2 from './asset/compare_general_restore_video_2.mp4'; 
import compare_ultra_hd_video_1 from './asset/compare_ultra_hd_video_1.mp4'; 
import compare_generative_video_1 from './asset/compare_generative_video_1.mp4';

# Available Models

The HitPaw Enhancement API offers specialized AI models meticulously engineered for both video and image processing workflows. Our models are trained to deliver industrial-grade restoration, focusing on spatial fidelity and temporal stability.

---

## 1. Video Enhancement Models

Video restoration requires a specialized approach. Our video engines ensure smooth transitions between frames, eliminating flickering and jitter while reconstructing fine details.

### Ultra HD Model
*Corresponding to: Ultra HD Model*

**Overview:**
A super-resolution interface designed for high-definition output. It enhances video clarity and restores natural, fine textures to achieve "Ultra HD" quality.

**Technical Features:**
Relies on **Deep Convolution and Feature Learning**. It excavates fine textures from the base image data to improve resolution and overall clarity. It is specifically tuned to handle mid-frequency textures, ensuring that lines are smooth (anti-aliased) and free of jagged edges, resulting in a clean, professional upscale.

**Examples:**
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <video muted controls preload width="80%">
    <source src={compare_ultra_hd_video_1} type="video/mp4" />
  </video>
</div>

### Generative Video Model
*Corresponding to: Generative Model*

**Overview:**
A cutting-edge video generation and repair interface based on advanced Stable Diffusion (SD) technology. It is specifically engineered to salvage extremely low-quality video inputs by hallucinating and reconstructing natural, realistic details that traditional upscalers cannot recover.

**Technical Features:**
*   **Superior Temporal Consistency:** Leverages a multi-frame SD architecture with sophisticated **cross-frame temporal modeling** (including Temporal Attention and Memory Mechanisms).
*   **Enhanced Multi-Frame Reconstruction:** Fuses information across multiple frames to identify and complete missing details unrecoverable from single-frame analysis.

**Examples:**
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <video muted controls preload width="80%">
    <source src={compare_generative_video_1} type="video/mp4" />
  </video>
</div>

### Video Face Soft Model
*Corresponding to: Face Soft Model*

**Overview:**
Provides a video interface for face softening and stylistic enhancement. It supports detecting and optimizing human faces, ensuring stable and beautified results across video frames.

**Technical Features:**
Core technology involves **facial prior knowledge** combined with spatial feature alignment. It efficiently removes degradation without needing complex iterative steps, keeping the person's identity distinct.

**Examples:**
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <video muted controls preload width="80%">
    <source src={compare_face_soft_video_1} type="video/mp4" />
  </video>
</div>

### Video Portrait Restoration
*Corresponding to: Portrait Restore Model*

**Overview:**
A specialized interface for repairing multiple faces in videos. It fixes blur and noise to enhance facial clarity while ensuring temporal stability across the video sequence.

**Examples:**
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <video muted controls preload width="80%">
    <source src={compare_portrait_restore_video_1} type="video/mp4" />
  </video>
</div>

### General Video Restoration
*Corresponding to: General Restore Model*

**Overview:**
A general-purpose interface for restoring fine details in videos. Based on GAN technology, it achieves comprehensive restoration including de-noising, de-blurring, and detail enhancement.

**Examples:**
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <video muted controls preload width="80%">
    <source src={compare_general_restore_video_1} type="video/mp4" />
  </video>
</div>
<br/>
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <video muted controls preload width="80%">
    <source src={compare_general_restore_video_2} type="video/mp4" />
  </video>
</div>

### Video Motion Interpolation
*Corresponding to: Frame Interpolation Model*

**Overview:**
An interface for video motion interpolation that increases and smooths the motion frame rate. It generates intermediate frames to reduce motion blur and make action look extremely fluid.

**Technical Features:**
*   **Target Frame Rate Specification:** Requires specifying the target frame rate via the `frame_rate` parameter (supports up to `120` FPS).
*   **High-Speed Motion Smoothing:** Ideal for sports, high-action footage, or low-fps recordings that need to be upscaled to cinema-grade high frame rates without introducing artificial warping artifacts.

---

## 2. Image Enhancement Models

Our image models are categorized to suit different professional needs: **Standard** (focusing on strict fidelity and accuracy) and **Generative** (focusing on creative reconstruction).

### Portrait Model (Natural)
*Corresponding to: Face Natural Model 2x / 4x*

**Overview:**
A specialized V2 model designed to improve low-quality portrait images. Unlike the "Clear" model, this version prioritizes the retention and restoration of realistic skin textures and facial details.

**Technical Features:**
Focuses on **high-fidelity texture recovery**. It restores the natural grain and pores of the skin, providing a result closer to original raw photography rather than a smoothed "beauty filter" look.

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./asset/comparison-face_natural_4x.jpg').default} width="80%" />
</div>

### Portrait Model (Clear)
*Corresponding to: Face Clear Model 2x / 4x*

**Overview:**
Provides a dual-model interface ("Face + Background") for 2x and 4x super-resolution. It optimizes portrait quality by combining a soft style for facial features with sharp detail generation for the background.

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./asset/comparison-face_clear_4x.png').default} width="80%" />
</div>

### Generative Portrait Model
*Corresponding to: Generative Portrait Model*

**Overview:**
A Diffusion-based super-resolution interface specifically for human subjects. Best for extremely low-quality portraits where traditional upscalers fail.

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./asset/comparison-gen_portrait.jpg').default} width="80%" />
</div>

### Generative Enhance Model
*Corresponding to: Generative Enhance Model*

**Overview:**
A general-purpose Diffusion super-resolution interface. It excels at reconstructing fine details and textures in non-human subjects (landscapes, objects, architecture).

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./asset/comparison-gen_enhance.png').default} width="80%" />
</div>

### General Enhanced Model
*Corresponding to: General Enhance Model 2x / 4x*

**Overview:**
Provides interfaces for 2x and 4x super-resolution enhancement in general scenarios. Built on a specialized super-resolution architecture, this model prioritizes the restoration of clarity and the generation of sharp, detailed textures.

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./asset/comparison-general_enhance_4x.jpg').default} width="80%" />
</div>

### High Fidelity Model
*Corresponding to: High Fidelity Model 2x / 4x*

**Overview:**
A super-resolution model designed for high-quality input images. It focuses on increasing resolution while strictly preserving the high-quality details and distinct textures of the original image.

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./asset/comparison-high_fidelity_4x.jpg').default} width="80%" />
</div>

### Sharp Denoise Model & Detail Denoise Model
*Corresponding to: Sharp Denoise Model & Detail Denoise Model*

**Overview:**
1x enhancement interfaces (no resolution change) designed for removing noise. *Sharp Denoise* aggressively removes noise and sharpens details. *Detail Denoise* strictly adheres to original textures to preserve natural fidelity without over-sharpening.

**Examples:**
<div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
  <img src={require('./asset/comparison-sharp_denoise.jpg').default} width="45%" title="Sharp Denoise" />
  <img src={require('./asset/comparison-detail_denoise.jpg').default} width="45%" title="Detail Denoise" />
</div>

:::tip Ready to Start?
Get started by [Purchasing an API Key Now](https://www.hitpaw.com/hitpaw-api.html) to unlock full access to the HitPaw Enhancement API.
:::
