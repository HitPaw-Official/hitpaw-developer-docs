---
sidebar_position: 2
---

# Available Models

## Generative & Diffusion

### Generative Portrait Model
*Corresponding to: Generative Portrait Model*

**Overview:**
A Diffusion-based super-resolution interface specifically for human subjects. It supports adjustable upscaling (1x to 4x) and adapts to the portrait to generate high-fidelity details.

**Technical Features:**
Leverages **Diffusion technology** to hallucinate and reconstruct realistic details. It prioritizes natural skin textures and facial features, significantly improving clarity while maintaining a natural look.

**Use Cases:**
Best for extremely low-quality portraits where traditional upscalers fail. It "re-imagines" the details to create a high-quality portrait from a blurry input.

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./img/comparison-gen_portrait.jpg').default} width="80%" />
</div>

### Generative Enhance Model
*Corresponding to: Generative Enhance Model*

**Overview:**
A general-purpose Diffusion super-resolution interface. It supports adjustable upscaling (1x to 4x) and adapts to various content types to enhance low-quality images.

**Technical Features:**
Focuses on **texture generation and sharpening**. It excels at reconstructing fine details and textures in non-human subjects (landscapes, objects, architecture), producing a highly sharp and detailed output.

**Use Cases:**
Ideal for heavily compressed or very low-resolution general images that require significant reconstruction of details to look acceptable at higher resolutions.

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./img/comparison-gen_enhance.png').default} width="80%" />
</div>

## Upscale & Enhancement

### Portrait Model (Clear)
*Corresponding to: Face Clear Model 2x / 4x*

**Overview:**
Provides a dual-model interface ("Face + Background") for 2x and 4x super-resolution. It optimizes portrait quality by combining a soft style for facial features with sharp detail generation for the background, while increasing resolution.

**Technical Features:**
Utilizes a **dual-model pipeline** (Face Enhancement + Background Super-resolution). It elevates low-quality images to high-definition standards, ensuring the skin appears soft and refined, while the background details are sharpened and enhanced simultaneously.

**Use Cases:**
Ideal for improving low-quality portrait photos. It effectively handles images requiring a balance between beautification (soft skin) and clarity (sharp background).

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./img/comparison-face_clear_2x.png').default} width="80%" />
</div>
<br/>
<div style={{ textAlign: 'center' }}>
  <img src={require('./img/comparison-face_clear_4x.png').default} width="80%" />
</div>

### Portrait Model (Natural)
*Corresponding to: Face Natural Model 2x / 4x*

**Overview:**
A specialized V2 model designed to improve low-quality portrait images. Unlike the "Clear" model, this version prioritizes the retention and restoration of realistic skin textures and facial details.

**Technical Features:**
Focuses on **high-fidelity texture recovery**. It restores the natural grain and pores of the skin, providing a result closer to original raw photography rather than a smoothed "beauty filter" look.

**Use Cases:**
Best suited for scenarios where realism is paramount, such as professional photography restoration or instances where preserving the original character of the subject is required.

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./img/comparison-face_natural_2x.jpg').default} width="80%" />
</div>
<br/>
<div style={{ textAlign: 'center' }}>
  <img src={require('./img/comparison-face_natural_4x.jpg').default} width="80%" />
</div>

### General Enhanced Model
*Corresponding to: General Enhance Model 2x / 4x*

**Overview:**
Provides interfaces for 2x and 4x super-resolution enhancement in general scenarios. It supports scaling image resolution by a factor of 2 or 4 while simultaneously optimizing overall image quality.

**Technical Features:**
Built on a specialized **super-resolution architecture**, this model prioritizes the restoration of clarity and the generation of sharp, detailed textures while performing upscaling. It is tuned to improve low-quality images significantly.

**Use Cases:**
Ideal for general-purpose scenarios involving low-resolution inputs. It effectively handles images with blur or missing details, regenerating sharp edges and textures.

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./img/comparison-general_enhance_2x.png').default} width="80%" />
</div>
<br/>
<div style={{ textAlign: 'center' }}>
  <img src={require('./img/comparison-general_enhance_4x.jpg').default} width="80%" />
</div>

### High Fidelity Model
*Corresponding to: High Fidelity Model 2x / 4x*

**Overview:**
A super-resolution model designed for high-quality input images. It focuses on increasing resolution (2x or 4x) while strictly preserving the high-quality details and distinct textures of the original image.

**Technical Features:**
Uses a conservative enhancement algorithm that avoids over-processing. It ensures that fine details in high-quality source materials are retained during the upscaling process without introducing artificial artifacts.

**Use Cases:**
Perfect for professional photography or high-res source material that needs to be upscaled for large-format printing or 4K displays without altering the artistic intent or texture of the original.

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./img/comparison-high_fidelity_2x.jpg').default} width="80%" />
</div>
<br/>
<div style={{ textAlign: 'center' }}>
  <img src={require('./img/comparison-high_fidelity_4x.jpg').default} width="80%" />
</div>

### Sharp Denoise Model
*Corresponding to: Sharp Denoise Model*

**Overview:**
A 1x enhancement interface (no resolution change) designed for general scenarios. It focuses on removing noise while sharpening image details.

**Technical Features:**
Delivers a **clear and sharp output**. It aggressively removes visual noise and grain while simultaneously sharpening edges and textures to make the image pop.

**Use Cases:**
Suitable for grainy photos taken in low light or images with digital noise that need to look crisp and clean.

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./img/comparison-sharp_denoise.jpg').default} width="80%" />
</div>

### Detail Denoise Model
*Corresponding to: Detail Denoise Model*

**Overview:**
A 1x enhancement interface (no resolution change) designed for detail preservation. It removes noise while strictly adhering to the original image's texture and details.

**Technical Features:**
Prioritizes **fidelity and natural restoration**. It removes noise and artifacts but avoids over-sharpening, ensuring the result looks natural and retains the original "feel" of the photo.

**Use Cases:**
Ideal for images where preserving subtle textures is more important than achieving extreme sharpness, such as artistic photos or scanned documents.

**Examples:**
<div style={{ textAlign: 'center' }}>
  <img src={require('./img/comparison-detail_denoise.jpg').default} width="80%" />
</div>

:::tip Ready to Start?
Get started by [Purchasing an API Key Now](https://www.hitpaw.com/hitpaw-api.html) to unlock full access to the HitPaw Enhancement API.
:::