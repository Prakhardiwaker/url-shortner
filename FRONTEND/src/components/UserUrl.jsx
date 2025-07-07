import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserUrls } from "../api/user.api";

const UserUrl = () => {
  const {
    data: urls,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="glass-effect rounded-2xl p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-300 font-medium">Loading your URLs...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="glass-effect rounded-2xl p-6 border border-red-500/20">
        <div className="flex items-center space-x-3 text-red-400">
          <svg
            className="w-6 h-6 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-semibold">Error Loading URLs</h3>
            <p className="text-sm text-red-300">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="glass-effect rounded-2xl p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400"
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
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No URLs Found
            </h3>
            <p className="text-gray-400">
              You haven't created any shortened URLs yet.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Start by shortening your first URL above!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span>Your URLs</span>
        </h2>
        <div className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
          {urls.urls.length} URL{urls.urls.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* URL Cards */}
      <div className="space-y-4">
        {urls.urls.reverse().map((url) => (
          <div
            key={url._id}
            className="glass-effect rounded-xl p-6 hover:bg-gray-800/30 transition-all duration-300 group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* URL Info */}
              <div className="flex-1 space-y-3">
                {/* Original URL */}
                <div>
                  <p className="text-xs text-gray-400 mb-1">Original URL</p>
                  <p className="text-white break-all text-sm lg:text-base">
                    {url.full_url}
                  </p>
                </div>

                {/* Short URL */}
                <div>
                  <p className="text-xs text-gray-400 mb-1">Short URL</p>
                  <a
                    href={`http://localhost:3000/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 break-all font-medium"
                  >
                    localhost:3000/{url.short_url}
                  </a>
                </div>
              </div>

              {/* Stats and Actions */}
              <div className="flex items-center justify-between lg:flex-col lg:items-end lg:space-y-4 lg:ml-6">
                {/* Click Stats */}
                <div className="text-center">
                  <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-4 py-2 rounded-xl border border-indigo-500/20">
                    <p className="text-2xl font-bold text-white">
                      {url.clicks}
                    </p>
                    <p className="text-xs text-gray-400">
                      {url.clicks === 1 ? "Click" : "Clicks"}
                    </p>
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() =>
                    handleCopy(
                      `http://localhost:3000/${url.short_url}`,
                      url._id
                    )
                  }
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 btn-hover ${
                    copiedId === url._id
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600"
                  }`}
                >
                  {copiedId === url._id ? (
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4"
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
                        className="w-4 h-4"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserUrl;
