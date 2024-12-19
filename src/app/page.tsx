'use client';

import { useState } from 'react';
import { claudeService } from './services/claude';

interface ArtifactContent {
  type: 'text' | 'json';
  value: string | Record<string, unknown>;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [pastedArtifact, setPastedArtifact] = useState('');
  const [artifact, setArtifact] = useState<ArtifactContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await claudeService.generateArtifact(prompt);
      setArtifact(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePastedArtifact = () => {
    try {
      const result = claudeService.parseArtifact(pastedArtifact);
      setArtifact(result);
      setError('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to parse artifact';
      setError(errorMessage);
    }
  };

  const renderArtifact = () => {
    if (!artifact) return null;

    return (
      <div className="p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Artifact Output:</h2>
        <div className="whitespace-pre-wrap">
          {artifact.type === 'text' ? (
            artifact.value as string
          ) : (
            <pre className="bg-gray-800 text-white p-4 rounded overflow-auto">
              {JSON.stringify(artifact.value, null, 2)}
            </pre>
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Claude Artifacts Generator</h1>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Generate New Artifact</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium mb-2">
                  Enter your prompt
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-32 p-2 border rounded-md"
                  placeholder="Describe the artifact you want to generate..."
                />
              </div>
              
              <button
                type="submit"
                disabled={loading || !prompt}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Artifact'}
              </button>
            </form>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Paste Existing Artifact</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="pastedArtifact" className="block text-sm font-medium mb-2">
                  Paste your artifact
                </label>
                <textarea
                  id="pastedArtifact"
                  value={pastedArtifact}
                  onChange={(e) => setPastedArtifact(e.target.value)}
                  className="w-full h-32 p-2 border rounded-md"
                  placeholder="Paste your artifact here..."
                />
              </div>
              
              <button
                onClick={handlePastedArtifact}
                disabled={!pastedArtifact}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                Process Pasted Artifact
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {renderArtifact()}
      </div>
    </main>
  );
}
