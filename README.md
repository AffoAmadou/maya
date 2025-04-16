[![Downloads](https://img.shields.io/npm/dt/create-r3f-app.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/create-r3f-app) [![Discord Shield](https://img.shields.io/discord/740090768164651008?style=flat&colorA=000000&colorB=000000&label=discord&logo=discord&logoColor=ffffff)](https://discord.gg/ZZjjNvJ)

# :japanese_castle: React-Three-Next starter

A powerful starter for NextJS, @react-three/fiber and Threejs with advanced features and real-time capabilities.

![](https://user-images.githubusercontent.com/2223602/192515435-a3d2c1bb-b79a-428e-92e5-f44c97a54bf7.jpg)

- TTL ~ 100ms
- First load JS ~ 79kb
- Lighthouse score of 100 (Performance, Accessibility, Best Practices, SEO)
- Real-time WebSocket communication
- State management with XState and Zustand
- Advanced animation support with GSAP

This starter allows you to navigate seamlessly between pages with dynamic dom and/or canvas content without reloading or creating a new canvas every time. 3D components are usable anywhere in the dom. The events, dom, viewport, everything is synchronized!

### ⚫ Demo :

[![image](https://user-images.githubusercontent.com/15867665/231395343-fd4770e3-0e39-4f5c-ac30-71d823a9ef1c.png)](https://react-three-next.vercel.app/)

### How to use

#### Installation

_Tailwind is the default style. styled-components (styled) are also available._

```sh
yarn create r3f-app next my-app
# yarn create r3f-app <next> my-app <tailwind|styled>? -ts?
# npx create-r3f-app next my-app
```

### :passport_control: Typescript

For typescript add the parameter `-ts` or `--typescript`:

```sh
yarn create r3f-app next my-app -ts
# npx create-r3f-app next my-app -ts
```

### :mount_fuji: Features

- [x] GLSL imports and shader support
- [x] Canvas is not getting unmounted while navigating between pages
- [x] Canvas components usable in any div of the page
- [x] Based on the App directory architecture
- [x] PWA Support
- [x] Real-time WebSocket communication
- [x] Advanced state management with XState and Zustand
- [x] GSAP animations integration
- [x] Processing.js client integration
- [x] Express server for backend functionality
- [x] WebSocket server for real-time communication
- [x] Advanced GLSL utilities and random functions

### :bullettrain_side: Architecture

The project follows a modern architecture with several key components:

1. **Frontend (Next.js + React Three Fiber)**
   - App directory structure
   - Canvas-based 3D rendering
   - Real-time WebSocket communication
   - State management with XState and Zustand

2. **Backend (Express + WebSocket)**
   - Express server for API endpoints
   - WebSocket server for real-time communication
   - Processing.js integration

3. **3D Components**
   - Uses tunnel-rat for portal components between renderers
   - GLSL shader support
   - Advanced animation capabilities with GSAP

```jsx
<div className='relative'>
  <View orbit className='relative sm:h-48 sm:w-full'>
    <Dog scale={2} />
    // Some 3D components will be rendered here
  </View>
</div>
```

### :control_knobs: Available Scripts

- `yarn dev` - Next dev
- `yarn analyze` - Generate bundle-analyzer
- `yarn lint` - Audit code quality
- `yarn build` - Next build
- `yarn start` - Next start
- `yarn server` - Start the Express and WebSocket server

### ⬛ Stack

- [`create-r3f-app`](https://github.com/utsuboco/create-r3f-app) &ndash; Command line tool to simplify the installation.
- [`threejs`](https://github.com/mrdoob/three.js/) &ndash; A lightweight, 3D library with a default WebGL renderer.
- [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber) &ndash; A React renderer for Threejs on the web and react-native.
- [`@react-three/drei`](https://github.com/pmndrs/drei) &ndash; Useful helpers for react-three-fiber
- [`@react-three/a11y`](https://github.com/pmndrs/react-three-a11y/) &ndash; Accessibility tools for React Three Fiber
- [`r3f-perf`](https://github.com/RenaudRohlinger/r3f-perf) &ndash; Tool to easily monitor react threejs performances.
- [`XState`](https://xstate.js.org/) &ndash; State management and statecharts
- [`Zustand`](https://github.com/pmndrs/zustand) &ndash; Lightweight state management
- [`GSAP`](https://greensock.com/gsap/) &ndash; Professional-grade animation library
- [`Express`](https://expressjs.com/) &ndash; Web server framework
- [`WebSocket`](https://github.com/websockets/ws) &ndash; Real-time communication
- [`Processing.js`](https://processingjs.org/) &ndash; Visual programming language integration

### Project Structure

```
├── app/                 # Next.js app directory
├── src/                 # Source files
├── server/             # Express and WebSocket server
├── processingClient/   # Processing.js client
├── public/             # Static assets
└── build/              # Build output
```

### How to contribute :

```bash
git clone https://github.com/pmndrs/react-three-next
&& cd react-three-next && yarn install
```

### Maintainers :

- [`twitter 🐈‍⬛ @onirenaud`](https://twitter.com/onirenaud)
