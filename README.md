# Smart Watch Heart Rate Monitor

A desktop menubar application built with Electron that connects to smart watches via Web Bluetooth API to monitor and visualize real-time heart rate data.

[![YoloEye Demo](https://img.youtube.com/vi/RwFYL7D2vWI/maxresdefault.jpg)](https://youtu.be/RwFYL7D2vWI "YoloEye Demo")


## Features

- Real-time heart rate monitoring
- Live graph visualization using Chart.js
- System tray/menubar integration
- Heart rate data logging
- Modern dark UI theme
- BPM (Beats Per Minute) display

## Prerequisites

- Node.js and npm installed
- A Bluetooth-enabled device
- A compatible smart watch device

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

## Development

To run the application in development mode:

```bash
npm start
```

This will launch the Electron app with Web Bluetooth features enabled.

## Technology Stack

- Electron.js - Desktop application framework
- Web Bluetooth API - For smart watch connectivity
- Chart.js - Real-time data visualization
- Bootstrap 5 - UI styling
- menubar - System tray integration
- fs-extra - Enhanced file system operations

## Project Structure

- `index.html` - Main application UI
- `index.js` - Electron main process
- `mySmartWatch.js` - Smart watch connection and data handling
- `preload.js` - Electron preload script for IPC
- `style.css` - Custom styling

## Features

### Smart Watch Connection
The application connects to compatible smart watches using the Web Bluetooth API. It can:
- Search for available devices
- Establish connection
- Read heart rate data
- Handle connection events

### Data Visualization
- Real-time heart rate graph
- BPM display
- Time-stamped data points
- Sliding window of measurements

## Notes

This application requires Electron with experimental Web Platform features enabled for Bluetooth functionality.
