# SalaryNegotiator 💰

An AI-powered salary negotiation tool that tells you exactly what to ask for — and gives you the word-for-word script to do it.

## What it does

Enter your job offer details and get instant analysis including:

- **Market Range** — fair salary range for your role and city
- **Counter Offer** — exact number to ask for
- **Verdict** — Accept, Negotiate, or Walk Away
- **Negotiation Script** — word-for-word email you can send right now
- **Red Flags** — warning signs in the offer to watch out for
- **Reasoning** — explanation behind every recommendation

## Tech Stack

**Frontend**
- React + TypeScript
- Vite

**Backend**
- Node.js + Express + TypeScript
- GitHub Model (openai/gpt-4.1-mini)
- Railway (deployment)

## Run locally

**Clone the repo:**
```bash
git clone https://github.com/NeerajLokwani/salary-negotiator.git
cd salary-negotiator
```

**Backend:**
```bash
cd backend
npm install
```

Create `backend/.env`:
```
GITHUB_TOKEN=your_github_token
PORT=5050
```
```bash
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5050
```
```bash
npm run dev
```

Open `http://localhost:5173`

## Live Demo

[salary-negotiator.vercel.app](https://salary-negotiator-pi.vercel.app/)

---

Built by [Neeraj Lokwani](https://www.linkedin.com/in/neeraj-lokwani-a80005154/) — because nobody should leave money on the table.