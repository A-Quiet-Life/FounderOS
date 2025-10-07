"use client";

import { useState, useEffect } from "react";
import { X, Loader2, CheckCircle, Code, Database, Package } from "lucide-react";
import type { Component, Connection } from "./ArchitectureCanvas";
import WaitlistForm from "./WaitlistForm";

interface GenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  components: Component[];
  connections: Connection[];
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
          // Results State
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

            {/* Services Report */}
            {services.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
                  <Database className="w-6 h-6 text-blue-500" />
                  Services Generated
                </h2>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-zinc-100 mb-1">
                            {service.label}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded">
                              {service.language}
                            </span>
                            {service.framework && (
                              <span className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded">
                                {service.framework}
                              </span>
                            )}
                          </div>
                        </div>
                        <Code className="w-6 h-6 text-orange-500" />
                      </div>

                      <div className="space-y-3">
                        {/* Generated Files */}
                        <div>
                          <p className="text-sm font-medium text-zinc-300 mb-1">
                            Generated Files:
                          </p>
                          <ul className="text-sm text-zinc-400 space-y-1">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Server configuration & middleware
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Database models & migrations
                            </li>
                            {service.apiEndpoints &&
                              service.apiEndpoints.length > 0 && (
                                <li className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  {service.apiEndpoints.length} API endpoint
                                  {service.apiEndpoints.length !== 1
                                    ? "s"
                                    : ""}{" "}
                                  with types
                                </li>
                              )}
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Environment variables template
                            </li>
                          </ul>
                        </div>

                        {/* Modules */}
                        {service.modules && service.modules.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-zinc-300 mb-1 flex items-center gap-2">
                              <Package className="w-4 h-4" />
                              Integrated Modules:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {service.modules.map((module) => (
                                <span
                                  key={module.id}
                                  className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded"
                                >
                                  {module.name}
                                  {module.authType &&
                                    ` (${
                                      module.authType === "api_key"
                                        ? "API Key"
                                        : "OAuth"
                                    })`}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Web Clients Report */}
            {webClients.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
                  <Code className="w-6 h-6 text-purple-500" />
                  Web Clients Generated
                </h2>
                <div className="space-y-4">
                  {webClients.map((client) => (
                    <div
                      key={client.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-zinc-100 mb-1">
                            {client.label}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-zinc-400">
                            {client.framework && (
                              <span className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded">
                                {client.framework}
                              </span>
                            )}
                          </div>
                        </div>
                        <Code className="w-6 h-6 text-orange-500" />
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-zinc-300 mb-1">
                            Generated Files:
                          </p>
                          <ul className="text-sm text-zinc-400 space-y-1">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Component library setup
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Routing configuration
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              API client with type-safe hooks
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              State management setup
                            </li>
                          </ul>
                        </div>

                        {client.modules && client.modules.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-zinc-300 mb-1 flex items-center gap-2">
                              <Package className="w-4 h-4" />
                              Integrated Modules:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {client.modules.map((module) => (
                                <span
                                  key={module.id}
                                  className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded"
                                >
                                  {module.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Clients Report */}
            {mobileClients.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
                  <Code className="w-6 h-6 text-pink-500" />
                  Mobile Clients Generated
                </h2>
                <div className="space-y-4">
                  {mobileClients.map((client) => (
                    <div
                      key={client.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-zinc-100 mb-1">
                            {client.label}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-zinc-400">
                            {client.framework && (
                              <span className="px-2 py-1 bg-pink-600/20 text-pink-400 rounded">
                                {client.framework}
                              </span>
                            )}
                          </div>
                        </div>
                        <Code className="w-6 h-6 text-orange-500" />
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-zinc-300 mb-1">
                            Generated Files:
                          </p>
                          <ul className="text-sm text-zinc-400 space-y-1">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Mobile UI components
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Navigation setup
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              API client with type-safe hooks
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              State management setup
                            </li>
                          </ul>
                        </div>

                        {client.modules && client.modules.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-zinc-300 mb-1 flex items-center gap-2">
                              <Package className="w-4 h-4" />
                              Integrated Modules:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {client.modules.map((module) => (
                                <span
                                  key={module.id}
                                  className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded"
                                >
                                  {module.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Databases Report */}
            {databases.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
                  <Database className="w-6 h-6 text-green-500" />
                  Databases Configured
                </h2>
                <div className="space-y-4">
                  {databases.map((database) => (
                    <div
                      key={database.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-zinc-100 mb-1">
                            {database.label}
                          </h3>
                        </div>
                        <Database className="w-6 h-6 text-green-500" />
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-zinc-300 mb-1">
                            Generated Configuration:
                          </p>
                          <ul className="text-sm text-zinc-400 space-y-1">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Database schema and migrations
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Connection pooling setup
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Backup and recovery scripts
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Environment configuration
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Waitlist CTA */}
            <div className="mt-12 p-8 bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl text-center">
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                Wanna see what comes next?
              </h2>
              <p className="text-zinc-400 mb-6">Join</p>
              <WaitlistForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
