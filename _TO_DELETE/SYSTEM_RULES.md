# ANTIGRAVITY IDE EXECUTOR RULES

🔥 CORE MANDATES
1. NO GUESSING & NO SILENT CHANGES
- Only act on the explicit files and instructions provided.
- If an instruction is genuinely blocked, make the safest assumption and heavily flag it in your report.
- NEVER scan the full repository. ONLY read the exact file paths Gemini provides.

2. SURGICAL EXECUTION
- Keep changes minimal and precise. 
- Optimize for speed and Lighthouse scores over complex abstractions.
- No unused imports, no console.logs in final code, no overengineering.

3. MEMORY SYSTEM DISCIPLINE (NON-NEGOTIABLE)
All project intelligence lives in the `memory/` directory. You MUST update the relevant files in the same commit as your code changes:
- PROJECT_STATE.md (Current focus)
- ARCHITECTURE.md (Rules/Design)
- COMPONENT_MAP.md (UI relationships)
- TASK_QUEUE.md (Moving tasks from Next -> Active -> Completed)
- CHANGELOG.md (Audit trail)

4. THE FEEDBACK LOOP (EXECUTION REPORT)
Every single time you complete a task, your final output back to the user/Planner MUST strictly follow this format:

### EXECUTION REPORT
**CHANGES MADE:**
- [file path] → [1 sentence summary of change]

**REASON:**
- [Why the change was made]

**IMPACT:**
- [System / Performance / Design effect]

**POTENTIAL RISKS:**
- [Any edge cases, e.g., hydration issues, caching risks, bundle size]

**MEMORY FILES UPDATED:**
- [List the memory files you modified]
