# FounderOS CLI 🚀

Interactive command-line tool for bootstrapping new projects with your preferred technology stack.

## Quick Start

```bash
# Build the tool
go build -o founder

# Run it
./founder

# Create a project
founder > found my-awesome-startup
```

## Features

✨ **Interactive CLI** - Beautiful, colorful prompts  
⚡ **Multiple Tech Stacks** - Popular backend and frontend frameworks  
🎨 **Beautiful UI** - Colorful output with progress bars  
🔧 **Customizable** - Multiple languages, frameworks, and features  
📦 **Long-running Session** - Create multiple projects without restarting

## Supported Stacks

**Backend Languages:** TypeScript, Python, Go, Rust  
**Frameworks:** Express, NestJS, FastAPI, Django, Gin, Echo, Actix, Axum, and more  
**Frontend:** React, Next.js, Vue, Nuxt, Angular, Svelte  
**Features:** Message Queues, Caching, Logging, Scheduled Jobs

## Commands

| Command                | Description          |
| ---------------------- | -------------------- |
| `found <project-name>` | Create a new project |
| `help`                 | Show help message    |
| `exit`, `quit`, `q`    | Exit FounderOS       |

## Documentation

📚 **For detailed setup instructions, see [SETUP.md](./SETUP.md)**

Includes:

- Installation and prerequisites
- Usage examples
- Navigation tips
- Troubleshooting
- Development guide

📖 **For quick examples, see [QUICKSTART.md](./QUICKSTART.md)**

## Demo Mode

⚠️ **Important**: This is a demo tool! It simulates the project setup process without creating actual files. Perfect for showcasing UX and workflows.

## Example Session

```bash
$ ./founder

███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗ ███████╗██████╗  ██████╗ ███████╗
...
founder > found my-saas-app

# Select your stack interactively
# Watch beautiful progress bars
# Get your project summary

founder > found another-project
# Create multiple projects in one session!
```

## Dependencies

- Go 1.21+
- [survey/v2](https://github.com/AlecAivazis/survey) - Interactive prompts
- [color](https://github.com/fatih/color) - Terminal colors
- [progressbar/v3](https://github.com/schollz/progressbar) - Progress bars

## Need Help?

- See [SETUP.md](./SETUP.md) for complete installation guide
- See [QUICKSTART.md](./QUICKSTART.md) for usage examples
- See [../README.md](../README.md) for project overview

---

Built with ❤️ for the vibe coding era
