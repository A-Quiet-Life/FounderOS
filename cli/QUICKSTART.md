# Quick Start Guide 🚀

## Running the Demo

1. **Build the CLI tool** (if not already built):

   ```bash
   go build -o founder
   ```

2. **Start the interactive session**:

   ```bash
   ./founder
   ```

3. **Enter commands** at the prompt:

   ```
   founder > found my-startup
   ```

4. **Navigate through the prompts**:

   - Use arrow keys ↑↓ to navigate options
   - Press Enter to confirm selection (for single-select prompts)
   - **For multi-select (features):**
     - Use ↑↓ arrow keys to navigate
     - Press **SPACE** to toggle selection on/off (you'll see [x] for selected)
     - Press **ENTER** when you're done selecting (not after each item!)

5. **Create more projects** without restarting:

   ```
   founder > found another-project
   ```

6. **Exit when done**:

   ```
   founder > exit
   ```

## Example Session

Here's what a typical session looks like:

```
$ ./founder

███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗ ███████╗██████╗  ██████╗ ███████╗
...
  Bootstrap your next project in seconds ⚡

  Commands:
    found <project-name> - Create a new project
    help              - Show this help message
    exit              - Exit FounderOS

founder > found my-saas-app

════════════════════════════════════════════════════════
  Welcome to FounderOS - Project Bootstrap Wizard ✨
════════════════════════════════════════════════════════

🎯 What type of project would you like to create?
  > fullstack web
    mobile
    microservice

⚙️  Select your backend language:
  > TypeScript (Node.js)
    Python
    Go
    Rust

🔧 Select your backend framework:
    Express.js
  > NestJS
    Fastify
    Koa

🎨 Select your frontend technology:
    React
  > Next.js
    Vue
    Nuxt
    Angular
    Svelte

✨ Select additional features:
  [x] Message Queues
  [x] Caching Layer
  [ ] Logging System
  [x] Scheduled Jobs

════════════════════════════════════════════════════════
  Configuration Summary
════════════════════════════════════════════════════════

  Project Name: my-saas-app
  Project Type: fullstack web
  Backend: TypeScript (Node.js) + NestJS
  Frontend: Next.js
  Features: Message Queues, Caching Layer, Scheduled Jobs

════════════════════════════════════════════════════════

🚀 Initializing your project...

📦 Setting up project structure
   [████████████████████████████████████] 100%
⚙️  Configuring backend (NestJS)
   [████████████████████████████████████] 100%
🎨 Setting up frontend (Next.js)
   [████████████████████████████████████] 100%
... (more progress bars)

════════════════════════════════════════════════════════
  ✨ Success! Your project is ready! ✨
════════════════════════════════════════════════════════

  Next steps:
    1. cd my-saas-app
    2. npm install
    3. npm run dev

  Happy coding! 🎉
```

## Tips

- The session is long-running - you can create multiple projects without exiting
- Type `help` at any time to see available commands
- The tool validates that you provide a project name
- Currently only "fullstack web" is fully implemented
- **Multi-select tip:** When selecting features, use SPACE to check/uncheck items (you'll see [x]). Only press ENTER when you're completely done selecting!
- The progress bars and setup are simulated (this is a demo!)
- All output is colorful (red/brown theme) and emoji-enhanced for better UX
- Use `exit`, `quit`, or `q` to exit the session

## Testing Different Stacks

Try different combinations to see how the tool adapts. Start the session once and try multiple projects:

```bash
$ ./founder

founder > found api-project
# Select: fullstack web → Python → FastAPI → Vue → [features]

founder > found go-app
# Select: fullstack web → Go → Gin → React → [features]

founder > found rust-app
# Select: fullstack web → Rust → Axum → Svelte → [features]

founder > exit
```

Enjoy exploring the different technology combinations in one continuous session! 🎨
