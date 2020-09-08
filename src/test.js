import * as GTagOptIn from './index';

const GA_MEASUREMENT_ID = 'UA-126456490-1';

describe('GTagOptIn', () => {
  beforeEach(() => {
    window.dataLayer = undefined;
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = undefined;
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
    const gtag = GTagOptIn.register(GA_MEASUREMENT_ID);
    gtag.optout();
    expect(window.dataLayer).toBeUndefined();
  });

  test('throw on opt-in without GA Measurement ID', () => {
    const gtag = GTagOptIn.register();
    expect(gtag.optin).toThrowError(/Analytics ID/);
  });

  test('throw on opt-out without GA Measurement ID', () => {
    const gtag = GTagOptIn.register();
    expect(gtag.optout).toThrowError(/Analytics ID/);
  });

  test('push GA Measurement ID to dataLayer on opt-in', () => {
    const gtag = GTagOptIn.register(GA_MEASUREMENT_ID);
    gtag.optin();
    expect(window.dataLayer[1][1]).toBe(GA_MEASUREMENT_ID);
  });

  test('do NOT push GA Measurement ID to dataLayer twice on double opt-in', () => {
    const gtag = GTagOptIn.register(GA_MEASUREMENT_ID);
    gtag.optin();
    gtag.optin();
    expect(window.dataLayer.length).toBe(2);
  });

  test('set GA-disable as falsy on opt-in', () => {
    const gtag = GTagOptIn.register(GA_MEASUREMENT_ID);
    gtag.optin();
    expect(window[`ga-disable-${GA_MEASUREMENT_ID}`]).toBeFalsy();
  });

  test('set GA-disable as truthy on opt-out', () => {
    const gtag = GTagOptIn.register(GA_MEASUREMENT_ID);
    gtag.optout();
    expect(window[`ga-disable-${GA_MEASUREMENT_ID}`]).toBeTruthy();
  });
});
