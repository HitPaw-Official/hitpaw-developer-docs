---
sidebar_position: 2
---

import compare_face_soft_video_1 from './asset/compare_face_soft_video_1.mp4'; 
import compare_portrait_restore_video_1 from './asset/compare_portrait_restore_video_1.mp4'; 
import compare_general_restore_video_1 from './asset/compare_general_restore_video_1.mp4';
import compare_general_restore_video_2 from './asset/compare_general_restore_video_2.mp4'; 
import compare_ultra_hd_video_1 from './asset/compare_ultra_hd_video_1.mp4'; 
import compare_generative_video_1 from './asset/compare_generative_video_1.mp4';

# Available Models

## Video Restoration & Upscale

### Ultra HD Model
*Corresponding to: Ultra HD Model*

**Overview:**
A super-resolution interface designed for high-definition output. It enhances video clarity and restores natural, fine textures to achieve "Ultra HD" quality.

**Technical Features:**
Relies on **Deep Convolution and Feature Learning**. It excavates fine textures from the base image data to improve resolution and overall clarity. It is specifically tuned to handle mid-frequency textures, ensuring that lines are smooth (anti-aliased) and free of jagged edges, resulting in a clean, professional upscale.

**Use Cases:**
Ideal for upscaling 1080p content to 4K, ensuring that the resulting video looks natural and free of the artificial "digital" look common in basic upscalers.

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
*   **Superior Temporal Consistency:** Leverages a multi-frame SD architecture with sophisticated **cross-frame temporal modeling** (including Temporal Attention and Memory Mechanisms). This significantly eliminates flickering and "pixel drift," ensuring that video details remain stable and consistent throughout the entire time dimension.
*   **Enhanced Multi-Frame Reconstruction:** By **fusing information across multiple frames**, the model can identify and complete missing details that are unrecoverable from single-frame analysis. This leads to higher quality, more credible texture reconstruction and authentic surface rendering.
*   **Robustness to Complex Degradation:** The multi-frame modeling approach provides exceptional resilience against severe information loss. It effectively mitigates artifacts caused by heavy compression, high-ISO sensor noise, and complex motion blur, bridging the gap between restoration and cinematic creation.
*   **Logic-Based Synthesis:** Beyond simple sharpening, it understands the visual logic of the content to rebuild textures with high fidelity to the original scene's intent.

**Use Cases:**
Best for "impossible" restoration tasks involving extremely low-quality video sources. Ideal for remastering heavily compressed legacy media, fixing high-speed motion blur, and salvaging footage with very little original detail to create a modern, high-definition viewing experience.

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
Core technology involves **facial prior knowledge** combined with spatial feature alignment. It efficiently removes degradation (noise, blur, compression artifacts) without needing complex iterative steps. It uses keypoint detection to ensure identity consistency while applying a soft, optimizing loss function to skin textures.

**Use Cases:**
Ideal for video post-processing where facial beautification is required, such as vlogs, interviews, or livestreams. It smooths skin while keeping the person's identity distinct.

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

**Technical Features:**
Uses **multi-frame fusion and deep learning** to align spatial-temporal features. It targets continuous frames to extract valid details, effectively removing motion blur and noise. It enhances the clarity of facial features (eyes, nose, mouth) while ensuring smooth transitions between frames to prevent flickering/jitter.

**Use Cases:**
Best for restoring videos with moving subjects, such as old home movies or low-light footage where faces are blurry or noisy.

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

**Technical Features:**
Uses an **Adaptive End-to-End** approach with a Generative Adversarial Network (GAN). It is designed to handle complex inputs by removing compression artifacts, boosting clarity, and reconstructing fine details. It balances high-frequency detail regeneration with smoothing to avoid artifacts like over-sharpening or ghosting.

**Use Cases:**
Suitable for general video content improvement, such as remastering old clips, fixing compressed internet videos, or enhancing footage from lower-quality cameras.

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

:::tip Ready to Start?
Get started by [Purchasing an API Key Now](https://www.hitpaw.com/hitpaw-api.html) to unlock full access to the HitPaw Enhancement API.
:::