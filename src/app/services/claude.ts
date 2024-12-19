import Anthropic from '@anthropic-ai/sdk';

interface ArtifactContent {
  type: string;
  text?: string;
  value?: any;
}

export class ClaudeService {
  private anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async generateArtifact(prompt: string) {
    try {
      const message = await this.anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = message.content[0];
      return {
        type: content.type,
        value: content
      };
    } catch (error) {
      console.error('Error generating artifact:', error);
      throw error;
    }
  }

  parseArtifact(artifactText: string): ArtifactContent {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(artifactText);
      return {
        type: typeof parsed === 'string' ? 'text' : 'json',
        value: parsed
      };
    } catch {
      // If not JSON, treat as plain text
      return {
        type: 'text',
        value: artifactText
      };
    }
  }
}

export const claudeService = new ClaudeService(); 