# Remotion Best Practices Guide

## Overview

Remotion is a framework for creating videos programmatically using React. It enables developers to build dynamic, data-driven video content with the full power of JavaScript, React components, and web technologies.

**Key Principles:**
- Videos are React components
- Animations are driven by frame numbers, not CSS animations
- Everything is deterministic and reproducible
- Assets are handled through a special `staticFile()` function

---

## Core Concepts

### 1. Compositions

A `<Composition>` defines a renderable video with specific dimensions, frame rate, and duration.

**Location:** Typically defined in `src/Root.tsx`

```tsx
import {Composition} from 'remotion';
import {MyComposition} from './MyComposition';

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyComposition"
      component={MyComposition}
      durationInFrames={100}
      fps={30}
      width={1080}
      height={1080}
    />
  );
};
```

**Default Props:**
- Provide initial values for your composition
- Must be JSON-serializable (Date, Map, Set, and staticFile() are supported)
- Use `type` declarations instead of `interface` for better type safety

```tsx
<Composition
  id="MyComposition"
  component={MyComposition}
  durationInFrames={100}
  fps={30}
  width={1080}
  height={1080}
  defaultProps={{
    title: 'Hello World',
    color: '#ff0000',
  } satisfies MyCompositionProps}
/>
```

**Folders:**
- Organize compositions in the sidebar
- Names can only contain letters, numbers, and hyphens

```tsx
<Folder name="Marketing">
  <Composition id="Promo" /* ... */ />
  <Composition id="Ad" /* ... */ />
</Folder>
```

**Stills:**
- For single-frame images
- No durationInFrames or fps required

```tsx
<Still id="Thumbnail" component={Thumbnail} width={1280} height={720} />
```

**Dynamic Metadata:**
- Use `calculateMetadata` to make dimensions, duration, or props dynamic
- Useful for data-driven videos

```tsx
const calculateMetadata: CalculateMetadataFunction<MyCompositionProps> = async ({props, abortSignal}) => {
  const data = await fetch(`https://api.example.com/video/${props.videoId}`, {
    signal: abortSignal,
  }).then((res) => res.json());

  return {
    durationInFrames: Math.ceil(data.duration * 30),
    props: {
      ...props,
      videoUrl: data.url,
    },
  };
};
```

---

## Animation Fundamentals

### Critical Rule: Frame-Based Animations Only

**✅ REQUIRED:** All animations MUST use `useCurrentFrame()` hook
**❌ FORBIDDEN:** CSS transitions, CSS animations, Tailwind animation classes

```tsx
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const FadeIn = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return <div style={{ opacity }}>Hello World!</div>;
};
```

**Why?** CSS animations are time-based and non-deterministic, while Remotion needs frame-perfect rendering for video export.

---

## Timing & Interpolation

### Linear Interpolation

```tsx
import {interpolate} from 'remotion';

// Go from 0 to 1 over 100 frames
const opacity = interpolate(frame, [0, 100], [0, 1], {
  extrapolateRight: 'clamp',
  extrapolateLeft: 'clamp',
});
```

### Spring Animations

Springs provide natural, organic motion with physics-based easing.

```tsx
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

const frame = useCurrentFrame();
const {fps} = useVideoConfig();

const scale = spring({
  frame,
  fps,
  config: { damping: 200 }, // Smooth, no bounce
});
```

**Common Spring Configurations:**
```tsx
const smooth = {damping: 200}; // Smooth, no bounce (subtle reveals)
const snappy = {damping: 20, stiffness: 200}; // Snappy, minimal bounce (UI elements)
const bouncy = {damping: 8}; // Bouncy entrance (playful animations)
const heavy = {damping: 15, stiffness: 80, mass: 2}; // Heavy, slow, small bounce
```

**Delay & Duration:**
```tsx
const entrance = spring({
  frame: frame - ENTRANCE_DELAY,
  fps,
  delay: 20, // Delay by 20 frames
  durationInFrames: 40, // Force specific duration
});
```

**Combining Spring with Interpolate:**
```tsx
const springProgress = spring({ frame, fps });
const rotation = interpolate(springProgress, [0, 1], [0, 360]);
```

### Easing Functions

```tsx
import {interpolate, Easing} from 'remotion';

const value = interpolate(frame, [0, 100], [0, 1], {
  easing: Easing.inOut(Easing.quad),
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```

**Convexities:** `Easing.in`, `Easing.out`, `Easing.inOut`
**Curves:** `Easing.quad`, `Easing.sin`, `Easing.exp`, `Easing.circle`

**Cubic Bezier:**
```tsx
easing: Easing.bezier(0.8, 0.22, 0.96, 0.65)
```

---

## Sequencing & Timing

### Sequence Component

Delays when elements appear in the timeline.

```tsx
import { Sequence, useVideoConfig } from "remotion";

const {fps} = useVideoConfig();

<Sequence from={1 * fps} durationInFrames={2 * fps} premountFor={1 * fps}>
  <Title />
</Sequence>
<Sequence from={2 * fps} durationInFrames={2 * fps} premountFor={1 * fps}>
  <Subtitle />
</Sequence>
```

**Premounting:** Always premount sequences to allow components to load before they appear.

**Layout Control:**
```tsx
<Sequence layout="none"> {/* Don't wrap in absolute fill */}
  <Title />
</Sequence>
```

### Series Component

Elements play one after another without overlap.

```tsx
import {Series} from 'remotion';

<Series>
  <Series.Sequence durationInFrames={45}>
    <Intro />
  </Series.Sequence>
  <Series.Sequence durationInFrames={60}>
    <MainContent />
  </Series.Sequence>
  <Series.Sequence durationInFrames={30}>
    <Outro />
  </Series.Sequence>
</Series>
```

**Overlapping Sequences:**
```tsx
<Series>
  <Series.Sequence durationInFrames={60}>
    <SceneA />
  </Series.Sequence>
  <Series.Sequence offset={-15} durationInFrames={60}>
    {/* Starts 15 frames before SceneA ends */}
    <SceneB />
  </Series.Sequence>
</Series>
```

**Important:** Inside a Sequence, `useCurrentFrame()` returns the local frame (starting from 0), not the global frame.

---

## Assets Management

### The Public Folder

Place all assets in the `public/` folder at your project root.

### Using staticFile()

**REQUIRED:** Must use `staticFile()` to reference files from `public/`:

```tsx
import {Img, staticFile} from 'remotion';

// Images
<Img src={staticFile('logo.png')} />

// Videos
import {Video} from '@remotion/media';
<Video src={staticFile('clip.mp4')} />

// Audio
import {Audio} from '@remotion/media';
<Audio src={staticFile('music.mp3')} />

// Fonts
const fontFamily = new FontFace('MyFont', `url(${staticFile('font.woff2')})`);
await fontFamily.load();
document.fonts.add(fontFamily);
```

### Remote URLs

Remote URLs can be used directly without `staticFile()`:

```tsx
<Img src="https://example.com/image.png" />
<Video src="https://remotion.media/video.mp4" />
```

---

## Audio

### Prerequisites

```bash
npx remotion add @remotion/media
```

### Basic Audio

```tsx
import { Audio } from "@remotion/media";
import { staticFile } from "remotion";

<Audio src={staticFile("audio.mp3")} />
```

### Trimming

```tsx
const { fps } = useVideoConfig();

<Audio
  src={staticFile("audio.mp3")}
  trimBefore={2 * fps} // Skip first 2 seconds
  trimAfter={10 * fps} // End at 10 second mark
/>
```

### Delaying

```tsx
const { fps } = useVideoConfig();

<Sequence from={1 * fps}>
  <Audio src={staticFile("audio.mp3")} />
</Sequence>
```

### Volume Control

**Static:**
```tsx
<Audio src={staticFile("audio.mp3")} volume={0.5} />
```

**Dynamic (fade in):**
```tsx
<Audio
  src={staticFile("audio.mp3")}
  volume={(f) =>
    interpolate(f, [0, 1 * fps], [0, 1], { extrapolateRight: "clamp" })
  }
/>
```

### Speed & Looping

```tsx
<Audio src={staticFile("audio.mp3")} playbackRate={2} /> {/* 2x speed */}
<Audio src={staticFile("audio.mp3")} loop />
```

### Pitch Adjustment

```tsx
<Audio
  src={staticFile("audio.mp3")}
  toneFrequency={1.5} // Higher pitch
/>
```

**Note:** Pitch shifting only works during server-side rendering, not in preview.

---

## Video Embedding

### Prerequisites

```bash
npx remotion add @remotion/media
```

### Basic Video

```tsx
import { Video } from "@remotion/media";
import { staticFile } from "remotion";

<Video src={staticFile("video.mp4")} />
```

### Sizing & Positioning

```tsx
<Video
  src={staticFile("video.mp4")}
  style={{
    width: 500,
    height: 300,
    position: "absolute",
    top: 100,
    left: 50,
    objectFit: "cover",
  }}
/>
```

### Trimming, Volume, Speed, Looping

Same props as Audio component (see above).

---

## Transitions

### Prerequisites

```bash
npx remotion add @remotion/transitions
```

### TransitionSeries

Supports two enhancement types:
- **Transitions** - crossfade, slide, wipe between scenes (shortens timeline)
- **Overlays** - render effects on top without shortening timeline

### Basic Transition

```tsx
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneA />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: 15 })}
  />
  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneB />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

### Available Transitions

```tsx
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { clockWipe } from "@remotion/transitions/clock-wipe";

// Slide with direction
<TransitionSeries.Transition
  presentation={slide({ direction: "from-left" })}
  timing={linearTiming({ durationInFrames: 20 })}
/>
```

**Directions:** `"from-left"`, `"from-right"`, `"from-top"`, `"from-bottom"`

### Timing Options

```tsx
import { linearTiming, springTiming } from "@remotion/transitions";

// Linear - constant speed
linearTiming({ durationInFrames: 20 });

// Spring - organic motion
springTiming({ config: { damping: 200 }, durationInFrames: 25 });
```

### Overlays

```tsx
import { LightLeak } from "@remotion/light-leaks";

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneA />
  </TransitionSeries.Sequence>
  <TransitionSeries.Overlay durationInFrames={20}>
    <LightLeak />
  </TransitionSeries.Overlay>
  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneB />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

### Duration Calculation

Transitions **overlap** adjacent scenes, so total duration is shorter:
- Without transitions: `60 + 60 = 120` frames
- With 15-frame transition: `60 + 60 - 15 = 105` frames

**Overlays do NOT affect total duration.**

```tsx
const totalDuration =
  scene1Duration +
  scene2Duration +
  scene3Duration -
  transition1Duration -
  transition2Duration;
```

---

## Text Animations

### Typewriter Effect

**Always use string slicing. Never use per-character opacity.**

```tsx
const frame = useCurrentFrame();
const text = "Hello World!";
const charsToShow = Math.floor(interpolate(frame, [0, 60], [0, text.length], {
  extrapolateRight: 'clamp'
}));

<div>{text.slice(0, charsToShow)}</div>
```

---

## Best Practices Summary

### ✅ DO:
- Use `useCurrentFrame()` for all animations
- Write timing in seconds, multiply by `fps`
- Use `staticFile()` for assets in `public/` folder
- Premount sequences with `premountFor`
- Use spring animations for natural motion
- Clamp interpolations with `extrapolateRight: 'clamp'`
- Use `type` instead of `interface` for props

### ❌ DON'T:
- Use CSS transitions or animations
- Use Tailwind animation classes
- Reference public folder files without `staticFile()`
- Forget to premount sequences
- Use time-based animations
- Use per-character opacity for text effects

---

## Additional Resources

The skill includes detailed guides for:
- 3D content (Three.js, React Three Fiber)
- Audio visualization (spectrum bars, waveforms)
- Charts & data visualization
- FFmpeg operations
- Fonts (Google Fonts, local fonts)
- GIFs synchronized with timeline
- Lottie animations
- TailwindCSS integration
- Measuring DOM nodes & text
- Transparent video rendering
- Parametrizable videos with Zod schemas
- Maps with Mapbox

Refer to the individual rule files in `~/.agents/skills/remotion-best-practices/rules/` for detailed examples and code snippets.

---

**Installation:**
```bash
npx skills add https://github.com/remotion-dev/skills --skill remotion-best-practices --yes --global
```

**Version:** Based on Remotion v4+ best practices
**Last Updated:** 2026-02-10
