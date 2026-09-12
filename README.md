# ReflectRN

A reflective practice SaaS for nurses to log procedures, track emotional growth, and visualize clinical progress over time.

**Live app:** [click here](https://reflect-rn.vercel.app)

<img width="1496" height="862" alt="image" src="https://github.com/user-attachments/assets/02c8c0ee-3987-46fd-91e8-26c489faf63c" />
<img width="1511" height="861" alt="image" src="https://github.com/user-attachments/assets/1c3e65c7-dd33-4964-913e-ade948d4bd6e" />
<img width="1512" height="865" alt="image" src="https://github.com/user-attachments/assets/3247b1bf-ad51-43b0-b787-90fb5008a078" />
<img width="1512" height="866" alt="image" src="https://github.com/user-attachments/assets/ff1e1d4f-4baa-4f1c-8217-eca6cca35f16" />


---

## What it does

ReflectRN gives nurses a private space to log every procedure they perform, with comfort ratings, enjoyment ratings, emotion tags, and performance type (independent, assisted, or observed). Procedures are organized by specialty or rotation, and a dashboard surfaces trends over time through interactive charts.

**Core features:**
- Log procedures with comfort (1–5), enjoyment (1–5), emotion, and performance type
- Organize procedures and diagnoses by specialty/rotation
- Dashboard with procedures over time, comfort trend, and emotion breakdown charts
- Diagnoses library tied to specialties
- Multi-user auth, every nurse's data is completely private
- Responsive design across all screen sizes

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL via Neon |
| ORM | Prisma 7 + PrismaNeon adapter |
| Auth | Clerk (with webhook sync) |
| Charts | Recharts |
| Styling | Tailwind CSS |
| Deployment | Vercel |

---
