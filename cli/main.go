package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/AlecAivazis/survey/v2"
	"github.com/fatih/color"
	"github.com/schollz/progressbar/v3"
)

var (
	brown    = color.New(color.FgYellow).SprintFunc()              // Brown-ish color
	red      = color.New(color.FgRed, color.Bold).SprintFunc()
	lightRed = color.New(color.FgHiRed).SprintFunc()
	darkRed  = color.New(color.FgRed).SprintFunc()
	orange   = color.New(color.FgHiYellow, color.Bold).SprintFunc()
)

type ProjectConfig struct {
	Name            string
	Format          string
	BackendLanguage string
	BackendFramework string
	Frontend        string
	Features        []string
}

func printBanner() {
	fmt.Println(red(`
███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗ ███████╗██████╗  ██████╗ ███████╗
██╔════╝██╔═══██╗██║   ██║████╗  ██║██╔══██╗██╔════╝██╔══██╗██╔═══██╗██╔════╝
█████╗  ██║   ██║██║   ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝██║   ██║███████╗
██╔══╝  ██║   ██║██║   ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗██║   ██║╚════██║
██║     ╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝███████╗██║  ██║╚██████╔╝███████║
╚═╝      ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
	`))
	fmt.Println(brown("  Bootstrap your next project in seconds ⚡"))
	fmt.Println()
	fmt.Println(orange("  Commands:"))
	fmt.Println(lightRed("    found <project-name>") + " - Create a new project")
	fmt.Println(lightRed("    help") + "              - Show this help message")
	fmt.Println(lightRed("    exit") + "              - Exit FounderOS")
	fmt.Println()
}

func handleFoundCommand(projectName string) {
	if projectName == "" {
		fmt.Println(color.RedString("❌ Error: project name is required"))
		fmt.Println(orange("   Usage: found <project-name>"))
		return
	}

	config := ProjectConfig{Name: projectName}
	
	printWelcome()
	
	if err := selectProjectFormat(&config); err != nil {
		fmt.Println(color.RedString("Error: %v", err))
		return
	}

	if config.Format == "fullstack web" {
		if err := selectBackend(&config); err != nil {
			fmt.Println(color.RedString("Error: %v", err))
			return
		}

		if err := selectFrontend(&config); err != nil {
			fmt.Println(color.RedString("Error: %v", err))
			return
		}

		if err := selectFeatures(&config); err != nil {
			fmt.Println(color.RedString("Error: %v", err))
			return
		}

		createProject(config)
	} else {
		fmt.Println(orange("\n⚠️  This format is not yet implemented in the demo!"))
	}
	fmt.Println()
}

func printWelcome() {
	fmt.Println()
	fmt.Println(red("════════════════════════════════════════════════════════"))
	fmt.Println(red("  Welcome to FounderOS - Project Bootstrap Wizard ✨"))
	fmt.Println(red("════════════════════════════════════════════════════════"))
	fmt.Println()
}

func selectProjectFormat(config *ProjectConfig) error {
	prompt := &survey.Select{
		Message: "What type of project would you like to create?",
		Options: []string{"fullstack web", "mobile", "microservice"},
		Default: "fullstack web",
	}
	
	return survey.AskOne(prompt, &config.Format, survey.WithIcons(func(icons *survey.IconSet) {
		icons.Question.Text = "🎯"
	}))
}

func selectBackend(config *ProjectConfig) error {
	languagePrompt := &survey.Select{
		Message: "Select your backend language:",
		Options: []string{"TypeScript (Node.js)", "Python", "Go", "Rust"},
	}
	
	if err := survey.AskOne(languagePrompt, &config.BackendLanguage, survey.WithIcons(func(icons *survey.IconSet) {
		icons.Question.Text = "⚙️"
	})); err != nil {
		return err
	}

	var frameworkOptions []string
	switch config.BackendLanguage {
	case "TypeScript (Node.js)":
		frameworkOptions = []string{"Express.js", "NestJS", "Fastify", "Koa"}
	case "Python":
		frameworkOptions = []string{"FastAPI", "Django", "Flask", "Tornado"}
	case "Go":
		frameworkOptions = []string{"Gin", "Echo", "Fiber", "Chi"}
	case "Rust":
		frameworkOptions = []string{"Actix-web", "Rocket", "Axum", "Warp"}
	}

	frameworkPrompt := &survey.Select{
		Message: "Select your backend framework:",
		Options: frameworkOptions,
	}
	
	return survey.AskOne(frameworkPrompt, &config.BackendFramework, survey.WithIcons(func(icons *survey.IconSet) {
		icons.Question.Text = "🔧"
	}))
}

func selectFrontend(config *ProjectConfig) error {
	prompt := &survey.Select{
		Message: "Select your frontend technology:",
		Options: []string{"React", "Next.js", "Vue", "Nuxt", "Angular", "Svelte"},
	}
	
	return survey.AskOne(prompt, &config.Frontend, survey.WithIcons(func(icons *survey.IconSet) {
		icons.Question.Text = "🎨"
	}))
}

func selectFeatures(config *ProjectConfig) error {
	prompt := &survey.MultiSelect{
		Message: "Select additional features (press SPACE to toggle, ENTER when done):",
		Options: []string{"Message Queues", "Caching Layer", "Logging System", "Scheduled Jobs"},
		Help:    "Use arrow keys to navigate, space bar to select/deselect, enter to confirm",
	}
	
	return survey.AskOne(prompt, &config.Features, 
		survey.WithIcons(func(icons *survey.IconSet) {
			icons.Question.Text = "✨"
			icons.SelectFocus.Text = ">"
			icons.UnmarkedOption.Text = "[ ]"
			icons.MarkedOption.Text = "[x]"
		}),
		survey.WithKeepFilter(false),
	)
}

func createProject(config ProjectConfig) {
	fmt.Println()
	fmt.Println(red("════════════════════════════════════════════════════════"))
	fmt.Println(red("  Configuration Summary"))
	fmt.Println(red("════════════════════════════════════════════════════════"))
	fmt.Println()
	fmt.Printf("  %s %s\n", brown("Project Name:"), lightRed(config.Name))
	fmt.Printf("  %s %s\n", brown("Project Type:"), lightRed(config.Format))
	fmt.Printf("  %s %s\n", brown("Backend:"), lightRed(config.BackendLanguage + " + " + config.BackendFramework))
	fmt.Printf("  %s %s\n", brown("Frontend:"), lightRed(config.Frontend))
	
	if len(config.Features) > 0 {
		fmt.Printf("  %s ", brown("Features:"))
		for i, feature := range config.Features {
			if i > 0 {
				fmt.Print(", ")
			}
			fmt.Print(lightRed(feature))
		}
		fmt.Println()
	}
	
	fmt.Println()
	fmt.Println(red("════════════════════════════════════════════════════════"))
	fmt.Println()
	
	// Simulate project creation with a beautiful progress bar
	fmt.Println(darkRed("🚀 Initializing your project..."))
	fmt.Println()
	
	steps := []string{
		"📦 Setting up project structure",
		"⚙️  Configuring backend (" + config.BackendFramework + ")",
		"🎨 Setting up frontend (" + config.Frontend + ")",
		"🔌 Installing dependencies",
		"📝 Creating configuration files",
		"🔐 Setting up security defaults",
		"🌐 Configuring API routes",
		"💾 Setting up database schema",
	}

	if contains(config.Features, "Message Queues") {
		steps = append(steps, "📬 Configuring message queues")
	}
	if contains(config.Features, "Caching Layer") {
		steps = append(steps, "⚡ Setting up caching layer")
	}
	if contains(config.Features, "Logging System") {
		steps = append(steps, "📊 Initializing logging system")
	}
	if contains(config.Features, "Scheduled Jobs") {
		steps = append(steps, "⏰ Configuring scheduled jobs")
	}

	steps = append(steps, "✅ Finalizing project setup")

	for _, step := range steps {
		fmt.Println(orange(step))
		
		bar := progressbar.NewOptions(100,
			progressbar.OptionSetWidth(50),
			progressbar.OptionSetDescription("   "),
			progressbar.OptionSetTheme(progressbar.Theme{
				Saucer:        "█",
				SaucerHead:    "█",
				SaucerPadding: "░",
				BarStart:      "[",
				BarEnd:        "]",
			}),
			progressbar.OptionSetRenderBlankState(true),
			progressbar.OptionSetElapsedTime(false),
			progressbar.OptionSetPredictTime(false),
			progressbar.OptionClearOnFinish(),
		)

		for i := 0; i <= 100; i += 2 {
			bar.Add(2)
			time.Sleep(20 * time.Millisecond)
		}
		
		time.Sleep(100 * time.Millisecond)
	}

	fmt.Println()
	fmt.Println(red("════════════════════════════════════════════════════════"))
	fmt.Println(lightRed("  ✨ Success! Your project is ready! ✨"))
	fmt.Println(red("════════════════════════════════════════════════════════"))
	fmt.Println()
	fmt.Println("  Next steps:")
	fmt.Printf("    %s cd %s\n", orange("1."), lightRed(config.Name))
	fmt.Printf("    %s %s\n", orange("2."), lightRed("npm install"))
	fmt.Printf("    %s %s\n", orange("3."), lightRed("npm run dev"))
	fmt.Println()
	fmt.Println(brown("  Happy coding! 🎉"))
	fmt.Println()
}

func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}

func main() {
	printBanner()
	
	reader := bufio.NewReader(os.Stdin)
	
	for {
		// Display prompt
		fmt.Print(red("founder") + orange(" > "))
		
		// Read user input
		input, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println(color.RedString("Error reading input: %v", err))
			continue
		}
		
		// Clean up the input
		input = strings.TrimSpace(input)
		
		// Skip empty input
		if input == "" {
			continue
		}
		
		// Parse command and arguments
		parts := strings.Fields(input)
		command := parts[0]
		
		// Handle commands
		switch command {
		case "found":
			if len(parts) < 2 {
				fmt.Println(color.RedString("❌ Error: project name is required"))
				fmt.Println(orange("   Usage: found <project-name>"))
			} else {
				projectName := parts[1]
				handleFoundCommand(projectName)
			}
			
		case "help":
			printBanner()
			
		case "exit", "quit", "q":
			fmt.Println(brown("\n👋 Thanks for using FounderOS! Happy coding! 🎉\n"))
			os.Exit(0)
			
		default:
			fmt.Println(color.RedString("❌ Unknown command: %s", command))
			fmt.Println(orange("   Type 'help' to see available commands"))
		}
	}
}

