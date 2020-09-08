function GTagOptIn(gaMeasurementId) {
  let isInitialized = false;

  this.gaMeasurementId = gaMeasurementId;

  this.optout = () => {
    throwIfGAMeasurementIdIsUndefined();
    window[`ga-disable-${this.gaMeasurementId}`] = true;
  };

  this.optin = () => {
    throwIfGAMeasurementIdIsUndefined();
    initGTagIfNeeded();
    window[`ga-disable-${this.gaMeasurementId}`] = false;
  };

  const throwIfGAMeasurementIdIsUndefined = () => {
    if (!this.gaMeasurementId) {
      throw new Error('gtag-opt-in: no value found for Analytics ID. Make sure to initialize properly the object and set its value as a constructor parameter.');
    }
  };

  const initGTagIfNeeded = () => {
    if (!isInitialized) {
      initGTag();
      isInitialized = true;
    }
  };

  const initGTag = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', this.gaMeasurementId);
  };
}

const register = (props) => {
  return new GTagOptIn(props);
};

export {
  register
};
