# Playwright Advanced Automation & Bug Hunting Framework 🚀

This repository showcases a professional-grade E2E testing framework built with **Playwright** and **TypeScript**. It's designed not just to verify UI flows, but to act as a "network radar" that catches silent backend failures.

## 🌟 Key Features

- **Page Object Model (POM):** Clean, scalable, and maintainable architecture.
- **Security-First:** Environment variable management using `.env` (local) and GitHub Secrets (CI/CD) to protect sensitive credentials.
- **Advanced Network Interception:** A custom listener that monitors all HTTP traffic (4xx/5xx errors). It successfully detected silent `401 Unauthorized` errors from background services (`backtrace.io`) that traditional UI tests would miss.
- **CI/CD Integration:** Automated test execution via GitHub Actions on every push, ensuring regression-free deployments.
- **Professional Reporting:** Detailed HTML reports with full Trace Viewer, screenshots, and video evidence of test runs.

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Framework:** Playwright
- **CI/CD:** GitHub Actions
- **Infrastructure:** Node.js

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/DaMoNBVR/playwright-advanced-automation.git](https://github.com/DaMoNBVR/playwright-advanced-automation.git)
   cd playwright-advanced-automation