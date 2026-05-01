# Election Process Education Assistant

An interactive, AI-powered assistant designed to help first-time voters understand the election process, timelines, and requirements in a simple and engaging way.

## 🚀 Features

- **Smart Election Assistant**: Powered by **Google Gemini API**, providing non-partisan, context-aware answers to voter queries.
- **Interactive Voter Journey**: A visual timeline breaking down the steps from registration to election day.
- **Modern & Accessible UI**: Built with React and Vanilla CSS, ensuring a clean and inclusive experience for all users.
- **Non-Partisan Guidance**: Systematically prompted to provide neutral, educational information.

## 🛠️ Chosen Vertical: First-Time Voter
This project focuses on the "First-Time Voter" persona. The logic and UI are designed to reduce the "intimidation factor" of voting by:
1. Simplifying complex legal terminology.
2. Providing a clear, linear roadmap.
3. Offering a safe space (the chat) to ask "simple" questions about the process.

## 🏗️ Tech Stack
- **Frontend**: React (Vite, TypeScript)
- **AI Engine**: Google Gemini 1.5 Flash
- **Icons**: Lucide React
- **Styling**: Vanilla CSS

## 📋 How It Works
1. **User Interface**: The user sees their "Voter Journey" and can immediately start chatting with the AI assistant.
2. **Gemini Integration**: When a user asks a question, the application sends the message along with a specialized system prompt to the Gemini API.
3. **System Prompting**: The AI is instructed to act as a friendly guide, focusing on registration, voting methods, and requirements while maintaining strict neutrality.
4. **Contextual History**: The chat maintains history, allowing for follow-up questions and a natural conversational flow.

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed
- A Google Gemini API Key (Get one at [aistudio.google.com](https://aistudio.google.com/))

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-link>
   cd election-process-education
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## ☁️ Google Cloud Deployment

This application is containerized and ready to be deployed to **Google Cloud Run**.

### Deployment Steps
1. **Set your Google Cloud Project**:
   ```bash
   gcloud config set project cool-eye-492716-u3
   ```
2. **Build and Deploy**:
   Run the following command in the root directory (replace `YOUR_API_KEY` with your actual Gemini API key):
   ```bash
   gcloud run deploy election-assistant \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars VITE_GEMINI_API_KEY=YOUR_API_KEY
   ```

## 🛡️ Assumptions & Notes
- **Data Source**: The assistant relies on the internal knowledge of the Gemini 1.5 Flash model. Users are always encouraged to verify specifics with official sources like `Vote.org` or their local Secretary of State.
- **Scope**: The current implementation focus is on the US Federal and State election processes.
- **Security**: API keys are handled via environment variables and should never be committed to source control.
