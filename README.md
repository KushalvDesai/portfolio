# Kushal Desai | Developer Portfolio

A modern, high-performance developer portfolio built with **Next.js 14**, **React**, **Tailwind CSS**, and **Framer Motion**. It features interactive sections, a macOS style dock, dynamic GitHub project fetching, smooth animations, and a secure contact form.

## 🚀 Features

*   **Responsive Modern UI**: Styled using Tailwind CSS and interactive UI components.
*   **Framer Motion Animations**: Scroll-based reveal (`useInView`), smooth interactive dock, and bento-grid card animations.
*   **Dynamic GitHub Projects**: Uses the GitHub REST API to securely fetch live repositories, stargazers, and language breakdowns on the server-side.
*   **Secure Contact Form**: Submits messages directly to your inbox via `nodemailer` using an authenticated Gmail transporter. 
*   **Spam Protection**: Configured with Google reCAPTCHA v3 and a hidden "honeypot" field for robust bot blocking. IP Rate limiting is built-in preventing duplicate malicious submissions.

## 🛠️ Tech Stack
*   **Framework:** Next.js (App Router)
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **Animations:** Framer Motion
*   **Mailing Service:** Nodemailer

---

## 💻 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/KushalvDesai/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables (`.env.local`)
To run this project, you will need to add the following environment variables to a `.env.local` file in the root directory:

```env
# GitHub Personal Access Token (for fetching repositories without tight rate limits)
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here

# Nodemailer / Gmail SMTP Configuration
EMAIL_USER=your_sending_gmail_account@gmail.com
EMAIL_PASS=your_gmail_app_password

# The final destination where the developer will receive the contact form message.
# If omitted, it will default to EMAIL_USER.
CONTACT_EMAIL=kushal.desaiofficial@gmail.com

# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

### 4. Setting up Google reCAPTCHA v3
The contact form relies on **reCAPTCHA v3** to invisibly verify users on submission without interrupting their experience with image puzzles. 

1. Go to the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin).
2. Register a new site. Choose **reCAPTCHA v3** as the type.
3. In the "Domains" section, add your production domain (e.g., `kushaldesai.com`).
4. **Important for Local Development:** Add `localhost` and `127.0.0.1` to the allowed "Domains" list so it functions when running on your machine.
5. Copy the generated **Site Key** and **Secret Key** into your `.env.local`.

### 5. Start the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the running app.
