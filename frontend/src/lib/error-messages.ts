/**
 * User-friendly error message mapper for analysis failures
 * Converts backend error messages to clear, actionable user messages
 */

export function getFriendlyErrorMessage(backendError: string | null | undefined): string {
  if (!backendError) {
    return "We couldn't analyze your code. Please try again.";
  }

  const error = backendError.toLowerCase();

  // GitHub token / auth issues
  if (
    error.includes("github token") ||
    error.includes("not linked") ||
    error.includes("decrypt")
  ) {
    return "We lost access to your GitHub account. Please reconnect your GitHub account in settings.";
  }

  // GitHub API rate limiting / errors
  if (
    error.includes("429") ||
    error.includes("rate limit") ||
    error.includes("too many requests")
  ) {
    return "GitHub API is busy right now. Please wait a moment and try again.";
  }

  // GitHub compare endpoint issues
  if (
    error.includes("compare") ||
    error.includes("404") ||
    error.includes("branch") ||
    error.includes("not found")
  ) {
    return "We couldn't find the branches you selected. Please make sure both branches exist and try again.";
  }

  // Timeout / service unavailable
  if (
    error.includes("503") ||
    error.includes("timeout") ||
    error.includes("unavailable")
  ) {
    return "Our service is temporarily unavailable. Please try again in a few moments.";
  }

  // LLM / AI issues
  if (
    error.includes("llm") ||
    error.includes("gemini") ||
    error.includes("api") ||
    error.includes("500")
  ) {
    return "Our AI encountered an issue processing your code. Please try again.";
  }

  // Default fallback
  return "We couldn't complete the analysis. Please try again.";
}

/**
 * Get a descriptive title for an error state
 */
export function getErrorTitle(backendError: string | null | undefined): string {
  if (!backendError) {
    return "Analysis Failed";
  }

  const error = backendError.toLowerCase();

  if (
    error.includes("github token") ||
    error.includes("not linked") ||
    error.includes("decrypt")
  ) {
    return "GitHub Access Lost";
  }

  if (
    error.includes("429") ||
    error.includes("rate limit")
  ) {
    return "GitHub API Busy";
  }

  if (
    error.includes("compare") ||
    error.includes("branch") ||
    error.includes("not found") ||
    error.includes("404")
  ) {
    return "Branches Not Found";
  }

  if (
    error.includes("503") ||
    error.includes("unavailable")
  ) {
    return "Service Unavailable";
  }

  return "Analysis Failed";
}
