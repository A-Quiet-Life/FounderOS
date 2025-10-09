"use client";

import { useState, useEffect } from "react";
import {
  X,
  Loader2,
  CheckCircle,
  Code,
  Database,
  Package,
  FileCode,
} from "lucide-react";
import type { Component, Connection } from "./ArchitectureCanvas";
import WaitlistForm from "./WaitlistForm";

interface GenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  components: Component[];
  connections: Connection[];
}

// Function to generate YAML content for a component
function generateComponentYAML(
  component: Component,
  connections: Connection[]
): string {
  const lines: string[] = [];

  lines.push(`# ${component.label} Configuration`);
  lines.push("");
  lines.push("component:");
  lines.push(`  name: "${component.label}"`);
  lines.push(`  id: ${component.id}`);
  lines.push(`  type: ${component.type}`);

  if (component.language) {
    lines.push(`  language: ${component.language}`);
  }

  if (component.framework) {
    lines.push(`  framework: ${component.framework}`);
  }

  // Add API endpoints if they exist
  if (component.apiEndpoints && component.apiEndpoints.length > 0) {
    lines.push("");
    lines.push("  api_endpoints:");
    component.apiEndpoints.forEach((endpoint) => {
      lines.push(`    - name: "${endpoint.name}"`);
      lines.push(`      status_code: ${endpoint.statusCode}`);
      if (endpoint.jsonData) {
        lines.push(`      response:`);
        try {
          const parsed = JSON.parse(endpoint.jsonData);
          const yamlData = JSON.stringify(parsed, null, 2)
            .split("\n")
            .map((line) => `        ${line}`)
            .join("\n");
          lines.push(yamlData);
        } catch {
          lines.push(`        data: ${endpoint.jsonData}`);
        }
      }
    });
  }

  // Add modules if they exist
  if (component.modules && component.modules.length > 0) {
    lines.push("");
    lines.push("  modules:");
    component.modules.forEach((module) => {
      lines.push(`    - name: "${module.name}"`);
      lines.push(`      description: "${module.description}"`);
      lines.push(`      enabled: ${module.enabled}`);
      if (module.authType) {
        lines.push(`      auth_type: ${module.authType}`);
      }
    });
  }

  // Add connections
  const outgoingConnections = connections.filter(
    (c) => c.from === component.id
  );
  const incomingConnections = connections.filter((c) => c.to === component.id);

  if (outgoingConnections.length > 0 || incomingConnections.length > 0) {
    lines.push("");
    lines.push("  connections:");

    if (outgoingConnections.length > 0) {
      lines.push("    outgoing:");
      outgoingConnections.forEach((conn) => {
        lines.push(`      - to: ${conn.to}`);
        lines.push(`        use_sdk: ${conn.useSDK || false}`);
      });
    }

    if (incomingConnections.length > 0) {
      lines.push("    incoming:");
      incomingConnections.forEach((conn) => {
        lines.push(`      - from: ${conn.from}`);
        lines.push(`        use_sdk: ${conn.useSDK || false}`);
      });
    }
  }

  return lines.join("\n");
}

export default function GenerationModal({
  isOpen,
  onClose,
  components,
  connections,
}: GenerationModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Simulate generation time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const services = components.filter((c) => c.type === "service");
  const webClients = components.filter((c) => c.type === "web");
  const mobileClients = components.filter((c) => c.type === "mobile");
  const databases = components.filter((c) => c.type === "database");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full h-full bg-zinc-950 overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-10 p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-all"
        >
          <X size={24} />
        </button>

        {isLoading ? (
          // Loading State
          <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">
              Generating Your Code...
            </h2>
            <p className="text-zinc-400">
              Analyzing architecture and creating production-ready code
            </p>
          </div>
        ) : (
          // Results State with YAML Files
          <div className="max-w-6xl mx-auto px-8 py-12">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-4xl font-bold text-zinc-100 mb-2">
                Code Generation Complete!
              </h1>
              <p className="text-lg text-zinc-400">
                Successfully generated {components.length} component
                {components.length !== 1 ? "s" : ""} with {connections.length}{" "}
                connection
                {connections.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Generated Files Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
                <FileCode className="w-6 h-6 text-orange-500" />
                Generated Configuration Files
              </h2>
              <p className="text-zinc-400 mb-6">
                Below are some example configuration files generated for each
                component in your architecture. At launch, FounderOS will, in
                addition to these YAML files, also scaffold all the boilerplate
                you need for API, Web, and Mobile clients.
              </p>
              <p className="text-zinc-400 mb-6">
                Once your services are generated, you can use an agent or
                implement the business logic yourself.
              </p>

              <div className="space-y-6">
                {components.map((component) => {
                  const yamlContent = generateComponentYAML(
                    component,
                    connections
                  );
                  const fileName = `${component.label
                    .toLowerCase()
                    .replace(/\s+/g, "-")}.yaml`;

                  return (
                    <div
                      key={component.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
                    >
                      {/* File Header */}
                      <div className="flex items-center justify-between px-6 py-4 bg-zinc-800/50 border-b border-zinc-700">
                        <div className="flex items-center gap-3">
                          <FileCode className="w-5 h-5 text-orange-500" />
                          <span className="font-mono text-sm text-zinc-300">
                            {fileName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {component.type === "service" && (
                            <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded">
                              Service
                            </span>
                          )}
                          {component.type === "web" && (
                            <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded">
                              Web
                            </span>
                          )}
                          {component.type === "mobile" && (
                            <span className="px-2 py-1 bg-pink-600/20 text-pink-400 text-xs rounded">
                              Mobile
                            </span>
                          )}
                          {component.type === "database" && (
                            <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded">
                              Database
                            </span>
                          )}
                        </div>
                      </div>

                      {/* YAML Content in Markdown Style */}
                      <div className="p-6">
                        <pre className="font-mono text-sm text-zinc-300 overflow-x-auto bg-zinc-950 rounded-lg p-4 border border-zinc-800">
                          <code className="language-yaml">{yamlContent}</code>
                        </pre>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Section */}
            <div className="mb-12 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-green-500" />
                Architecture Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-zinc-800 rounded-lg">
                  <div className="text-3xl font-bold text-blue-400">
                    {services.length}
                  </div>
                  <div className="text-sm text-zinc-400 mt-1">Services</div>
                </div>
                <div className="text-center p-4 bg-zinc-800 rounded-lg">
                  <div className="text-3xl font-bold text-purple-400">
                    {webClients.length}
                  </div>
                  <div className="text-sm text-zinc-400 mt-1">Web Clients</div>
                </div>
                <div className="text-center p-4 bg-zinc-800 rounded-lg">
                  <div className="text-3xl font-bold text-pink-400">
                    {mobileClients.length}
                  </div>
                  <div className="text-sm text-zinc-400 mt-1">
                    Mobile Clients
                  </div>
                </div>
                <div className="text-center p-4 bg-zinc-800 rounded-lg">
                  <div className="text-3xl font-bold text-green-400">
                    {databases.length}
                  </div>
                  <div className="text-sm text-zinc-400 mt-1">Databases</div>
                </div>
              </div>
            </div>

            {/* Waitlist CTA */}
            <div className="mt-12 p-8 bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl text-center">
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                Wanna see what comes next?
              </h2>
              <p className="text-zinc-400 mb-6">
                Join our waitlist to be the first to experience the full
                platform
              </p>
              <WaitlistForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
