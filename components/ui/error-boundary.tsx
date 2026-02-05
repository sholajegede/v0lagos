"use client";

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-muted/10">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          3D rendering encountered an error
        </p>
        <button
          onClick={reset}
          className="px-3 py-1 text-xs bg-background border border-border rounded-md hover:bg-muted/50 transition-colors"
        >
          Try again
        </button>
        {error && process.env.NODE_ENV === 'development' && (
          <details className="mt-2 text-xs text-muted-foreground text-left">
            <summary>Error details</summary>
            <pre className="mt-1 p-2 bg-background/50 rounded border overflow-auto max-h-32">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
