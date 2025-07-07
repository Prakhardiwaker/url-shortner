import React, { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [customSlug, setCustomSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    try {
      const surl = await createShortUrl(url, customSlug);
      setShortUrl(surl);
      // queryClient.invalidateQueries({ queryKey: ["userUrls"] });
    } catch (error) {
      console.error("Error creating short URL:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const resetForm = () => {
    setUrl("");
    setCustomSlug("");
    setShortUrl("");
    setCopied(false);
  };

  return (
    <div className="space-y-8">
      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL Input */}
        <div className="space-y-2">
          <label
            htmlFor="url"
            className="block text-gray-300 text-sm font-semibold"
          >
            Enter your URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com/your-long-url"
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 input-focus transition-all duration-300"
            />
          </div>
        </div>

        {/* Custom Slug (for authenticated users) */}
        {isAuthenticated && (
          <div className="space-y-2">
            <label
              htmlFor="customSlug"
              className="block text-gray-300 text-sm font-semibold"
            >
              Custom URL (optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={(event) => setCustomSlug(event.target.value)}
                placeholder="my-custom-link"
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 input-focus transition-all duration-300"
              />
            </div>
            <p className="text-xs text-gray-400">
              Create a memorable custom URL for your link
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 btn-hover ${
            loading || !url.trim()
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Shortening URL...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Shorten URL</span>
            </div>
          )}
        </button>
      </form>

      {/* Result Display */}
      {shortUrl && (
        <div className="glass-effect rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Your shortened URL</span>
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="w-full p-4 bg-gray-800/70 border border-gray-600 rounded-xl text-white pr-4 select-all"
              />
            </div>
            <button
              onClick={handleCopy}
              className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 btn-hover ${
                copied
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600"
              }`}
            >
              {copied ? (
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Copied!</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  <span>Copy</span>
                </div>
              )}
            </button>
          </div>

          {/* Original URL Display */}
          <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <p className="text-xs text-gray-400 mb-1">Original URL:</p>
            <p className="text-sm text-gray-300 break-all">{url}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
