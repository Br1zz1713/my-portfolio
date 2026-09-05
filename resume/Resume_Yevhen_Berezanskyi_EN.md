# YEVHEN BEREZANSKYI
**Systems Architect & Full-Stack Engineer**  
Odessa, Ukraine | Remote / Relocation  
Email: berezanskyi09@gmail.com | Phone: +40 750 266 672 | Telegram: @eugene_br1zz  
Portfolio: https://br1zz1713.github.io/my-portfolio/ | GitHub: https://github.com/Br1zz1713 | Freelancehunt: https://freelancehunt.com/freelancer/berezanskyi09.html

---

## PROFESSIONAL SUMMARY
High-performance Systems Architect and Full-Stack Engineer with proven expertise in building low-latency distributed systems in **Rust**, production **TypeScript / Next.js** SaaS platforms, and reverse-engineered enterprise networking infrastructure. Track record of delivering mission-critical commercial solutions: from an on-chain **Arbitrum One cross-DEX arbitrage engine** processing market ticks in sub-microsecond latency (0–1 µs), to high-concurrency **session-sharing reverse proxies** and scalable full-stack applications. Strong advocate of zero-allocation architectures, deterministic state machines, kernel-level sandboxing, and test-driven reliability.

---

## TECHNICAL SKILLS

* **Languages:** Rust (Edition 2021), TypeScript, JavaScript (ES6+), Solidity (0.8.24), Python, SQL, HTML5, CSS3.
* **Systems & Low-Latency:** Tokio (Async Runtime), Alloy Primitives (U256, Address, B256), WebSocket Stream Decoding, Zero-Heap Allocation Hot Paths, Fixed-Point Arithmetic (Q96), Microsecond Telemetry (tracing).
* **Web3 & Blockchain:** Arbitrum One (L2), Arbitrum Nitro Node Synchronization, Uniswap V3, Camelot V3 (Algebra), Flash Swaps, On-Chain Revert Guards, MEV Sequencer Optimization, EVM, Smart Contracts.
* **Full-Stack & Backend:** Node.js (Express, Fastify), Next.js (App Router), React, Django REST Framework, PostgreSQL, Supabase (Auth, RLS), Prisma ORM, RESTful APIs.
* **DevOps, Security & OS:** Linux (Ubuntu Server, Systemd Service Sandboxing, UFW Hardening, Hetzner Bare-Metal), Docker / Docker Compose, Windows Server 2019, Reverse Proxies (http-proxy-middleware), Git, GitHub Actions (CI/CD), Vercel.
* **Third-Party & Integrations:** Stripe API (Metered Billing & Webhooks), Google Gemini API (LLM Integration), WebSockets, JWT Authentication (HttpOnly Cookies).

---

## KEY FEATURED PROJECTS

### 1. Arbitrum One Cross-DEX Arbitrage Engine & Nitro Node (Commercial Project)
**Tech Stack:** Rust (Tokio, Alloy), Solidity, Docker, Systemd, Arbitrum Nitro, Hetzner Dedicated (Ubuntu 24.04)  
*Delivered in 5 consecutive commercial milestones on Freelancehunt (48,000 UAH budget, 10/10 verified client reviews).*
* **High-Frequency Engine:** Architected an ultra-low latency Arbitrum One cross-DEX arbitrage system monitoring concentrated liquidity pools on Uniswap V3 and Camelot V3 (Algebra) for USDT/USDC pairs.
* **Microsecond Execution (0–1 µs):** Engineered a zero-heap-allocation hot path using stack-allocated alloy::primitives (U256, Address, B256) and Tokio ring buffers (mpsc), achieving deterministic evaluation within 0 to 1 microsecond.
* **Fixed-Point Mathematical Precision:** Eliminated 0.4% floating-point drift by replacing float calculations with exact 256-bit integer fixed-point Q96 arithmetic (quote_zero_for_one_u256, sqrt_price_u256).
* **On-Chain Solidity Execution:** Developed ArbitrageExecutor.sol with Flash Swaps, dynamic priority fee estimation for the Arbitrum Sequencer, and an atomic On-Chain Revert Guard preventing slippage loss when dynamic net profit drops below gas thresholds.
* **Resilience & Node Infrastructure:** Implemented lossless stream cursor replay (StreamCursor) with exponential backoff reconnects, synchronized a local Arbitrum Nitro node via Docker on NVMe RAID0, and isolated the daemon via Linux kernel sandboxing (ProtectSystem=full, PrivateTmp, NoNewPrivileges, UFW firewall).
* **Test Coverage:** Achieved 100% test pass rate across 38 unit and integration tests (cargo test 38 passed, 0 failed).

### 2. Enterprise Multi-User Session Reverse Proxy (Commercial Infrastructure)
**Tech Stack:** Node.js, Express, http-proxy-middleware, Windows Server 2019, PowerShell  
*Built for an enterprise client to enable simultaneous multi-workstation access to a single-seat protected web catalog.*
* **Reverse Proxy Architecture:** Developed a specialized internal proxy tunneling requests to an external protected SPA catalog, normalizing cookies, User-Agents, and headers over local HTTP.
* **Bidirectional Storage Synchronization:** Engineered real-time bidirectional syncing of browser localStorage, sessionStorage, and Envoy session tokens across multiple LAN workstations using dynamic script injection.
* **Timestamp Conflict Resolution:** Solved complex race conditions and infinite auth redirect loops (/portal-ui) by introducing atomic client-server timestamp comparison (serverTimestamp vs clientTimestamp), preventing fresh login tokens from being overwritten by stale server states.
* **High Availability & Fault Recovery:** Deployed as an auto-recovering Windows Server scheduled service with debounced disk persistence (1,000 ms debounce), error socket trap handlers, and automatic session cache purge on remote 401/403 events.

### 3. PropText.ai — AI-Powered Real Estate SaaS Platform
**Tech Stack:** Next.js (App Router), TypeScript, Supabase (PostgreSQL, Auth, RLS), Stripe API, Google Gemini API, Tailwind CSS  
*Live Demo:* https://prop-text-ai.vercel.app
* **Production SaaS Architecture:** Designed and deployed a multi-tenant web platform generating automated, high-converting property descriptions for real estate agencies.
* **Metered Billing Infrastructure:** Integrated Stripe checkout and webhooks to manage a hybrid subscription and credit-consumption model, featuring atomic balance reconciliation and fraud prevention.
* **AI Model Pipeline:** Integrated Google Gemini API with automated key rotation, dynamic rate-limiting, and context-engineered prompt templates.
* **Document Generation Engine:** Built a client-side Unicode-compliant PDF export engine rendering branded, print-ready property flyers with responsive layouts.
* **Security & Database:** Configured Supabase Auth with granular PostgreSQL Row-Level Security (RLS) policies and Zod schema validation across all API boundaries.

### 4. Commercial E-Shop — High-Performance E-Commerce
**Tech Stack:** React (Vite), Django REST Framework, PostgreSQL, Tailwind CSS, JWT  
*Live Demo:* https://ecoshop-alpha.vercel.app
* **Full-Stack Implementation:** Engineered an end-to-end e-commerce store with dynamic catalog filtering (category, price range, stock availability), real-time cart state management, and an integrated checkout pipeline.
* **Secure Session Handling:** Implemented JWT authentication using HttpOnly, SameSite-strict cookies to mitigate XSS and CSRF attack vectors.
* **Database & Query Optimization:** Structured relational PostgreSQL schemas with optimized Django querysets, indexing, and REST serialization to achieve sub-50ms API response times.

---

## PROFESSIONAL EXPERIENCE

### Systems & Full-Stack Freelance Engineer
**Freelancehunt / Direct Commercial Contracts** | *2023 — Present*
* Architected and deployed high-performance backend daemons, low-latency Web3 arbitrage engines, and enterprise networking proxies for commercial clients across Europe and Ukraine.
* Achieved 100% 5-star customer rating across all completed safe-escrow contracts on Freelancehunt, including multi-stage milestone deliveries totaling over 48,000 UAH.
* Collaborated closely with clients to formulate precise technical specifications, establish deterministic testing pipelines, and configure production bare-metal servers (Ubuntu 24.04, Hetzner, Windows Server).

### Web Developer (Internship)
**Marine Plast Center / IT Internships** | *2024 (6 months)*
* Developed reactive UI modules using React, Tailwind CSS, and modern JavaScript, improving page load speeds and interface responsiveness.
* Participated in daily Agile/Scrum ceremonies, automated regression testing, code reviews, and Git feature-branch workflows.

---

## EDUCATION

* **Master of Science (M.S.) in Computer Science / Information Systems**  
  *Odessa National University named after I. I. Mechnikov* | *2023 — 2024*
* **Bachelor of Science (B.S.) in Applied Information Technology**  
  *Odessa State Ecological University* | *2021 — 2023*
* **Associate Degree in Software Engineering (Junior Specialist)**  
  *Odessa College of Computer Technologies* | *2017 — 2021*

---

## LANGUAGES
* **English:** Upper-Intermediate / Technical (B1/B2) — fluent technical documentation, code reviews, and professional communication.
* **Ukrainian:** Native (Рідна мова).
* **Russian:** Fluent.
