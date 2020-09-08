import * as GTagOptIn from './index';

const GA_MEASUREMENT_ID = 'UA-126456490-1';

describe('GTagOptIn', () => {
  beforeEach(() => {
    window.dataLayer = undefined;
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = undefined;
  });

  test('do NOT define dataLayer on object creation', () => {
    GTagOptIn.init(GA_MEASUREMENT_ID);
    expect(window.dataLayer).toBeUndefined();
  });

  test('do NOT define GA-disable property on object creation', () => {
    GTagOptIn.init(GA_MEASUREMENT_ID);
    expect(window[`ga-disable-${GA_MEASUREMENT_ID}`]).toBeUndefined();
  });

  test('do NOT modify dataLayer when enabled is not ran', () => {
    const gtag = GTagOptIn.init(GA_MEASUREMENT_ID);
    gtag.optout();
    expect(window.dataLayer).toBeUndefined();
  });

  test('throw while running enable without GA Measurement ID', () => {
    const gtag = GTagOptIn.init();
    expect(gtag.optin).toThrowError(/Analytics ID/);
  });

  test('push GA Measurement ID to dataLayer on enable', () => {
    const gtag = GTagOptIn.init(GA_MEASUREMENT_ID);
    gtag.optin();
    expect(window.dataLayer[1][1]).toBe(GA_MEASUREMENT_ID);
  });

  test('do NOT push GA Measurement ID to dataLayer twice on multiple enable', () => {
    const gtag = GTagOptIn.init(GA_MEASUREMENT_ID);
    gtag.optin();
    gtag.optin();
    expect(window.dataLayer.length).toBe(2);
  });

  test('set GA-disable as falsy on enable', () => {
    const gtag = GTagOptIn.init(GA_MEASUREMENT_ID);
    gtag.optin();
    expect(window[`ga-disable-${GA_MEASUREMENT_ID}`]).toBeFalsy();
  });

  test('set GA-disable as truthy on disable', () => {
    const gtag = GTagOptIn.init(GA_MEASUREMENT_ID);
    gtag.optout();
    expect(window[`ga-disable-${GA_MEASUREMENT_ID}`]).toBeTruthy();
  });
});
