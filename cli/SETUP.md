# CLI Setup Guide 🛠️

Complete setup instructions for the FounderOS CLI tool.

## Prerequisites

- **Go 1.21 or later** - [Download Go](https://go.dev/dl/)
- Terminal/Command Line access

## Installation

### 1. Navigate to CLI Directory

```bash
cd cli
```

### 2. Install Dependencies

The project uses Go modules. Dependencies will be automatically downloaded during build.

Required packages:

- [survey/v2](https://github.com/AlecAivazis/survey) - Interactive prompts
- [color](https://github.com/fatih/color) - Colorful terminal output
- [progressbar/v3](https://github.com/schollz/progressbar) - Progress bars

Install manually if needed:

```bash
go get github.com/AlecAivazis/survey/v2
go get github.com/fatih/color
go get github.com/schollz/progressbar/v3
```

### 3. Build the Binary

```bash
go build -o founder
```

This creates a `founder` executable in the current directory.

### 4. Make it Executable (Unix/Linux/macOS)

```bash
chmod +x founder
```

### 5. Optional: Add to PATH

To run `founder` from anywhere:

**macOS/Linux:**

```bash
# Move to a directory in your PATH
sudo mv founder /usr/local/bin/

# Or add current directory to PATH
echo 'export PATH=$PATH:'$(pwd) >> ~/.zshrc  # or ~/.bashrc
source ~/.zshrc
```

**Windows:**

```powershell
# Add the directory to your PATH environment variable
# Or move founder.exe to a directory already in PATH
```

## Usage

### Starting FounderOS

Launch the interactive session:

```bash
./founder
```

You'll see the FounderOS welcome screen with ASCII art logo.

### Available Commands

Once in the FounderOS session:

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `found <project-name>` | Create a new project             |
| `help`                 | Show help and available commands |
| `exit`, `quit`, or `q` | Exit FounderOS                   |

### Interactive Prompts

After entering a `found` command, you'll be guided through:

#### 1. Project Format

- ✅ **Fullstack Web** (implemented)
- 📱 Mobile (coming soon)
- 🔧 Microservice (coming soon)

#### 2. Backend Language

- TypeScript (Node.js)
- Python
- Go
- Rust

#### 3. Backend Framework

Options vary by language:

**TypeScript:**

- Express.js
- NestJS
- Fastify
- Koa

**Python:**

- FastAPI
- Django
- Flask
- Tornado

**Go:**

- Gin
- Echo
- Fiber
- Chi

**Rust:**

- Actix-web
- Rocket
- Axum
- Warp

#### 4. Frontend Technology

- React
- Next.js
- Vue
- Nuxt
- Angular
- Svelte

#### 5. Additional Features (Multi-select)

Use **SPACE** to toggle, **ENTER** to confirm:

- Message Queues
- Caching Layer
- Logging System
- Scheduled Jobs

**Important:** Press SPACE to select/deselect, then press ENTER when done!

## Example Session

```bash
$ ./founder

███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗ ███████╗██████╗  ██████╗ ███████╗
...
  Bootstrap your next project in seconds ⚡

  Commands:
    found <project-name> - Create a new project
    help              - Show this help message
    exit              - Exit FounderOS

founder > found my-saas-app

# Select interactively:
# - Format: fullstack web
# - Backend: TypeScript → NestJS
# - Frontend: Next.js
# - Features: [x] Message Queues, [x] Caching Layer

🚀 Initializing your project...

📦 Setting up project structure
   [████████████████████████████████████] 100%
⚙️  Configuring backend (NestJS)
   [████████████████████████████████████] 100%
🎨 Setting up frontend (Next.js)
   [████████████████████████████████████] 100%

════════════════════════════════════════════════════════
  ✨ Success! Your project is ready! ✨
════════════════════════════════════════════════════════

founder > found another-project
# Create another project without restarting!

founder > exit
👋 Thanks for using FounderOS! Happy coding! 🎉
```

## Tips & Best Practices

### Navigation

- Use **↑↓** arrow keys to navigate options
- Press **ENTER** to confirm single selections
- Press **SPACE** to toggle multi-select options
- Look for **[x]** to see selected items

### Session Management

- The CLI is **long-running** - create multiple projects in one session
- Type `help` anytime to see available commands
- Use `exit`, `quit`, or `q` to exit gracefully

### Multi-Select Features

When selecting features:

1. Navigate with arrow keys
2. Press SPACE to check/uncheck (you'll see [x])
3. Only press ENTER when completely done selecting

## Troubleshooting

### Build Errors

**"go: command not found"**

```bash
# Install Go from https://go.dev/dl/
# Verify installation:
go version
```

**"package not found"**

```bash
# Run go mod tidy to sync dependencies
go mod tidy

# Then rebuild
go build -o founder
```

### Runtime Issues

**"permission denied: ./founder"**

```bash
# Make the file executable
chmod +x founder
```

**Prompt rendering issues**

```bash
# Ensure your terminal supports ANSI colors
# Try a modern terminal like iTerm2, Windows Terminal, or Hyper
```

## Development

### Project Structure

```
cli/
├── main.go              # Main CLI application
├── go.mod              # Go module definition
├── go.sum              # Dependency checksums
├── founder             # Compiled binary (gitignored)
├── SETUP.md            # This file
└── QUICKSTART.md       # Quick usage guide
```

### Code Overview

The CLI is built with:

- **survey/v2** for interactive prompts
- **color** for terminal colors
- **progressbar/v3** for progress animations

Key functions:

- `main()` - Entry point, session loop
- `showWelcome()` - ASCII art and welcome message
- `parseCommand()` - Command parsing
- `createProject()` - Project creation flow
- `showProgress()` - Progress bar animations

### Rebuilding

After making changes:

```bash
go build -o founder
./founder
```

## Demo Mode

⚠️ **Important**: This is a **demo tool**!

- It doesn't actually create files or directories
- It simulates the project setup process
- Perfect for showcasing UX and workflows
- Progress bars and setup steps are animated simulations

## Future Enhancements

- [ ] Mobile app project support
- [ ] Microservice architecture templates
- [ ] Docker configuration generation
- [ ] CI/CD pipeline setup
- [ ] Database selection and ORM setup
- [ ] Authentication boilerplate
- [ ] Testing framework integration
- [ ] Actual file generation (optional mode)

## Need Help?

- Check `QUICKSTART.md` for quick examples
- Review the main `README.md` in the project root
- Review the code in `main.go` - it's well commented!

---

Built with ❤️ for the vibe coding era
