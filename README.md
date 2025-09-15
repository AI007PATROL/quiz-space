
Quiz app (Cloudflare Pages ready)
================================

What is included:
- public/ : static frontend (index, login, quiz, admin pages)
  - data_questions.json : contains 50 questions imported from your Excel
  - data_users.json : contains 115 users imported from your Excel
- functions/api/ : Cloudflare Pages Functions (demo endpoints using static JSON)
- sql/schema.sql : SQL schema + INSERTs to seed a D1 database with questions & users
- README (this file)

How to use:
1) Upload repository to GitHub (push this folder)
2) On Cloudflare Pages, create a project and connect to the repo.
   - Framework preset: None
   - Build command: (leave empty)
   - Output directory: public
3) Deploy. The static site will be available and functions will be mapped under /api/*
4) For production persistence, create a Cloudflare D1 database and run the statements in sql/schema.sql
   - After creating D1, update your functions to query D1 instead of static JSON (examples provided)
5) Admin credentials (default in functions):
   - admin-007 / admin007
   - admin2-008 / admin008
   - admin3-001 / admin001
   - mohan-hari007 / mohan007

Notes:
- The functions in this package are demo-style: they read the bundled JSON files for easy testing.
- For production, replace read-from-JSON bits with D1 SQL queries.

