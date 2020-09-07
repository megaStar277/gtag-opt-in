const GtagOptIn = require('./index');

const GA_MEASUREMENT_ID = 'UA-126456490-1';

describe('GtagOptIn', () => {
  beforeEach(() => {
    window.dataLayer = undefined;
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = undefined;
  });

  test('do NOT define dataLayer on object creation', () => {
    new GtagOptIn(GA_MEASUREMENT_ID);
    expect(window.dataLayer).toBeUndefined();
  });

  test('do NOT define GA-disable property on object creation', () => {
    new GtagOptIn(GA_MEASUREMENT_ID);
    expect(window[`ga-disable-${GA_MEASUREMENT_ID}`]).toBeUndefined();
  });

  test('do NOT modify dataLayer when enabled is not ran', () => {
    const gtagOptIn = new GtagOptIn(GA_MEASUREMENT_ID);
    gtagOptIn.disable();
    expect(window.dataLayer).toBeUndefined();
  });

  test('throw while running enable without GA Measurement ID', () => {
    const gtagOptIn = new GtagOptIn();
    expect(gtagOptIn.enable).toThrowError(/gaMeasurementId/);
  });

  test('push GA Measurement ID to dataLayer on enable', () => {
    const gtagOptIn = new GtagOptIn(GA_MEASUREMENT_ID);
    gtagOptIn.enable();
    expect(window.dataLayer[1][1]).toBe(GA_MEASUREMENT_ID);
  });

  test('do NOT push GA Measurement ID to dataLayer twice on multiple enable', () => {
    const gtagOptIn = new GtagOptIn(GA_MEASUREMENT_ID);
    gtagOptIn.enable();
    gtagOptIn.enable();
    expect(window.dataLayer.length).toBe(2);
  });

  test('set GA-disable as falsy on enable', () => {
    const gtagOptIn = new GtagOptIn(GA_MEASUREMENT_ID);
    gtagOptIn.enable();
    expect(window[`ga-disable-${GA_MEASUREMENT_ID}`]).toBeFalsy();
  });

  test('set GA-disable as truthy on disable', () => {
    const gtagOptIn = new GtagOptIn(GA_MEASUREMENT_ID);
    gtagOptIn.disable();
    expect(window[`ga-disable-${GA_MEASUREMENT_ID}`]).toBeTruthy();
  });
});