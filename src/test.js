describe('GTagOptIn', () => {
  const GA_MEASUREMENT_ID = 'UA-126456490-1';

  let GTagOptIn;

  beforeEach(() => {
    window.dataLayer = undefined;
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = undefined;

    /**
     * Fixes an issue where module's local variables remain with old values between tests.
     */
    return import('./index').then(module => {
      GTagOptIn = module;
      jest.resetModules();
    });
  });

  test('throw on register without GA Measurement ID', () => {
    expect(GTagOptIn.register).toThrowError(/Analytics ID/);
  });

  test('throw on opt-in without previous registration', () => {
    expect(GTagOptIn.optIn).toThrowError(/Analytics ID/);
  });

  test('throw on opt-out without previous registration', () => {
    expect(GTagOptIn.optOut).toThrowError(/Analytics ID/);
  });

  test('do NOT define dataLayer on registration', () => {
    GTagOptIn.register(GA_MEASUREMENT_ID);
    expect(window.dataLayer).toBeUndefined();
  });

  test('do NOT define GA-disable property on registration', () => {
    GTagOptIn.register(GA_MEASUREMENT_ID);
    expect(window[`ga-disable-${GA_MEASUREMENT_ID}`]).toBeUndefined();
  });

  test('do NOT modify dataLayer on opt-out', () => {
    GTagOptIn.register(GA_MEASUREMENT_ID);
    GTagOptIn.optOut();
    expect(window.dataLayer).toBeUndefined();
  });

  test('push GA Measurement ID to dataLayer on opt-in', () => {
    GTagOptIn.register(GA_MEASUREMENT_ID);
    GTagOptIn.optIn();
    expect(window.dataLayer[1][1]).toBe(GA_MEASUREMENT_ID);
  });

  test('do NOT push GA Measurement ID to dataLayer twice on double opt-in', () => {
    GTagOptIn.register(GA_MEASUREMENT_ID);
    GTagOptIn.optIn();
    GTagOptIn.optIn();
    expect(window.dataLayer.length).toBe(2);
  });

  test('set config to anonymize IP on opt-in', () => {
    GTagOptIn.register(GA_MEASUREMENT_ID);
    GTagOptIn.optIn();
    expect(window.dataLayer[1][2]).toEqual({'anonymize_ip': true});
  });

  test('enable GA on opt-in', () => {
    GTagOptIn.register(GA_MEASUREMENT_ID);
    GTagOptIn.optIn();
    expect(window[`ga-disable-${GA_MEASUREMENT_ID}`]).toBeFalsy();
  });

  test('disable GA on opt-out', () => {
    GTagOptIn.register(GA_MEASUREMENT_ID);
    GTagOptIn.optOut();
    expect(window[`ga-disable-${GA_MEASUREMENT_ID}`]).toBeTruthy();
  });
});
