browser.webNavigation.onBeforeNavigate.addListener( useGmaps);
browser.webNavigation.onHistoryStateUpdated.addListener(useGmaps);

function useGmaps(details) {
    const url = new URL(details.url);
    // Check if we are on DuckDuckGo and the map tab is active
    if (url.hostname.includes("duckduckgo.com") && url.searchParams.get("iaxm") === "maps") {
        const query = url.searchParams.get("q");
        if (query && !query.includes("!m")) {
            // Construct a new URL utilizing the !m bang
            const newUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}+!m`;
            browser.tabs.update(details.tabId, { url: newUrl }).catch(console.error);
        }
    }
}