# ffprobe-binary

Node.js module providing path of [FFprobe](https://ffmpeg.org/) binary for various platforms.

This project install binary dependencies for the current platform using the optionalDependencies, cpu, and os fields of the package.json file.

The project is currently using the ffprobe 7.0 release, and the list of supported platforms is as follows.

- Windows x64
- Linux x64
- Linux ARM64
- macOS x64
- macOS ARM64

## Installation

```bash
npm install @ffprobe-binary/ffprobe
```

## Usage

```javascript
import ffprobe from '@ffprobe-binary/ffprobe';
console.log(ffprobe); // [Project]/node_modules/@ffprobe-binary/[Platform]-[Architecture]/ffprobe
```

## Sources of the binaries

- Windows x64 / Linux x64 / Linux ARM64: https://github.com/BtbN/FFmpeg-Builds
- macOS x64 / macOS ARM64: https://www.osxexperts.net
