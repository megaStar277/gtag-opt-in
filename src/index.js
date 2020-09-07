module.exports = function GTagOptIn(gaMeasurementId) {
  let isInitialized = false;

  this.gaMeasurementId = gaMeasurementId;

  this.disable = () => {
    window[`ga-disable-${this.gaMeasurementId}`] = true;
  };

  this.enable = () => {
    throwIfGAMeasurementIdIsUndefined();
    initGtagIfNeeded();
    window[`ga-disable-${this.gaMeasurementId}`] = false;
  };

  const throwIfGAMeasurementIdIsUndefined = () => {
    if (!this.gaMeasurementId) {
      throw new Error('gtag-opt-in: the value of `gaMeasurementId` is invalid. Make sure to initialize properly and pass the Analytics ID on the constructor.');
    }
  };

  const initGtagIfNeeded = () => {
    if (!isInitialized) {
      initGtag();
      isInitialized = true;
    }
  };

  const initGtag = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', this.gaMeasurementId);
  };
};
