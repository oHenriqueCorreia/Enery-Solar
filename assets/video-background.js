(function () {
  const videoId = "qSIq8vPbIFw";
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    muted: "1",
    loop: "1",
    playlist: videoId,
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    cc_load_policy: "0",
    enablejsapi: "1",
    vq: "hd1080",
    origin: window.location.origin,
  });
  const cleanEmbedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;

  function sendPlayerCommand(iframe, func, args = []) {
    if (!iframe.contentWindow) return;
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "*",
    );
  }

  function forceBackgroundPlayback(iframe) {
    sendPlayerCommand(iframe, "mute");
    sendPlayerCommand(iframe, "setLoop", [true]);
    sendPlayerCommand(iframe, "setPlaybackQuality", ["hd1080"]);
    sendPlayerCommand(iframe, "playVideo");
  }

  function enhanceHeroVideo() {
    const iframe = document.querySelector(".hero-bg-video");
    if (!iframe) return false;

    if (iframe.dataset.videoBackgroundReady !== "true") {
      iframe.dataset.videoBackgroundReady = "true";
      iframe.src = cleanEmbedUrl;
      iframe.title = "Video institucional Solar Energy";
      iframe.tabIndex = -1;
      iframe.setAttribute("aria-hidden", "true");
      iframe.setAttribute("loading", "eager");
      iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture; web-share");
      iframe.removeAttribute("allowfullscreen");
      iframe.style.pointerEvents = "none";
      iframe.addEventListener("load", function () {
        setTimeout(() => forceBackgroundPlayback(iframe), 800);
        setTimeout(() => forceBackgroundPlayback(iframe), 2400);
        setTimeout(() => forceBackgroundPlayback(iframe), 5000);
      });
    }

    forceBackgroundPlayback(iframe);
    return true;
  }

  if (!enhanceHeroVideo()) {
    const observer = new MutationObserver(function () {
      if (enhanceHeroVideo()) {
        observer.disconnect();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }
})();
