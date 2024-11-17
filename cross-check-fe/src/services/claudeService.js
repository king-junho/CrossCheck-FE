// src/services/claudeService.js
import { CLAUDE_API_KEY } from '../config/keys';

class ClaudeService {
  constructor() {
    this.baseUrl = 'https://api.anthropic.com/v1/messages';
    this.headers = {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01'
    };
  }

  async sendMessage(userMessage, context = []) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          model: "claude-3-opus-20240229",
          max_tokens: 2000,
          messages: [
            ...context,
            {
              role: "user",
              content: userMessage
            }
          ],
          system: `You are a helpful assistant specialized in providing guidance about real estate lease fraud prevention in Korea.
          Your role is to:
          1. Verify lease documents and information
          2. Identify potential fraud warning signs
          3. Guide users through the proper lease process
          4. Provide relevant legal information and resources
          
          Important guidelines:
          - Always maintain a professional and reassuring tone
          - Provide specific, actionable advice
          - Citation of relevant laws when applicable
          - Ask for clarification when needed
          - Warn users about potential risks
          - Recommend official verification methods`
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('Error calling Claude API:', error);
      throw error;
    }
  }
}

export const claudeService = new ClaudeService();