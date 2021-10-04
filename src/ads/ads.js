var adsManager;
var adsLoader;
var adDisplayContainer;
var videoContent;
var adsInitialized;
var autoplayAllowed;
var autoplayRequiresMuted;

function initDesktopAutoplayExample() {
  videoContent = document.getElementById("contentElement");
  setUpIMA();
  autoplayAllowed = true;
  autoplayRequiresMuted = false;
  autoplayChecksResolved();
}

function setUpIMA() {
  createAdDisplayContainer();
  adsLoader = new google.ima.AdsLoader(adDisplayContainer);
  adsLoader.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false
  );
  adsLoader.addEventListener(
    google.ima.AdErrorEvent.Type.AD_ERROR,
    onAdError,
    false
  );

  videoContent.onended = contentEndedListener;
}

function contentEndedListener() {
  videoContent.onended = null;
  if (adsLoader) {
    adsLoader.contentComplete();
  }
}

function autoplayChecksResolved() {
  var adsRequest = new google.ima.AdsRequest();
  adsRequest.adTagUrl =
    "https://pubads.g.doubleclick.net/gampad/ads?" +
    "sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&" +
    "impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&" +
    "cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=";

  adsRequest.setAdWillAutoPlay(autoplayAllowed);
  adsRequest.setAdWillPlayMuted(autoplayRequiresMuted);
  adsLoader.requestAds(adsRequest);
}

function createAdDisplayContainer() {
  adDisplayContainer = new google.ima.AdDisplayContainer(
    document.getElementById("adContainer"),
    videoContent
  );
}

function playAds() {
  try {
    if (!adsInitialized) {
      adDisplayContainer.initialize();
    }

    adsManager.init(SCENE_WIDTH, SCENE_HEIGHT, google.ima.ViewMode.NORMAL);
    adsManager.start();
  } catch (adError) {
    var event = new Event(AD_COMPLETE_EVENT);
    dispatchEvent(event);
  }
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
  var adsRenderingSettings = new google.ima.AdsRenderingSettings();
  adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
  adsManager = adsManagerLoadedEvent.getAdsManager(
    videoContent,
    adsRenderingSettings
  );

  const adVolume = autoplayAllowed && autoplayRequiresMuted ? 0 : 1;
  adsManager.setVolume(adVolume);

  adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
  adsManager.addEventListener(
    google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
    onContentPauseRequested
  );
  adsManager.addEventListener(
    google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
    onContentResumeRequested
  );
  adsManager.addEventListener(
    google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
    onAdEvent
  );

  adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, onAdEvent);
  adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, onAdEvent);
  adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, onAdEvent);

  if (autoplayAllowed) {
    playAds();
  }
}

function onAdEvent(adEvent) {
  var ad = adEvent.getAd();

  switch (adEvent.type) {
    case google.ima.AdEvent.Type.LOADED:
      if (!ad.isLinear()) {
        videoContent.play();
      }
      break;

    case google.ima.AdEvent.Type.STARTED:
      var content = document.getElementById("content");
      content.style.visibility = "visible";
      break;

    case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
      var content = document.getElementById("content");
      content.style.visibility = "hidden";
      videoContent.pause();
      var event = new Event(AD_COMPLETE_EVENT);
      dispatchEvent(event);
      break;
  }
}

function onAdError(adErrorEvent) {
  console.log(adErrorEvent.getError());
  adsManager.destroy();
  var event = new Event(AD_COMPLETE_EVENT);
  dispatchEvent(event);
}

function onContentPauseRequested() {
  videoContent.onended = null;
}

function onContentResumeRequested() {
  videoContent.onended = contentEndedListener;
}