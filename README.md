# Claude Artifacts

A web application for generating and managing Claude artifacts. This application allows you to:
- Generate new artifacts using Claude-3
- Paste and process existing artifacts
- View both text and JSON artifacts in a formatted way

## Features

- Real-time artifact generation using Claude-3 Opus
- Support for both text and JSON artifacts
- Clean, modern UI with Tailwind CSS
- TypeScript for type safety
- Responsive design for all screen sizes

## Getting Started

### Prerequisites

- Node.js 20 or later
- An Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/artifacts.git
cd artifacts
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Anthropic API key:
```env
ANTHROPIC_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

### Generating New Artifacts
1. Enter your prompt in the left panel
2. Click "Generate Artifact"
3. View the generated artifact below

### Processing Existing Artifacts
1. Paste your artifact in the right panel
2. Click "Process Pasted Artifact"
3. View the processed artifact below

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Built With

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Anthropic SDK](https://www.anthropic.com/) - For Claude integration
- [TypeScript](https://www.typescriptlang.org/) - For type safety

## License

This project is licensed under the MIT License.
