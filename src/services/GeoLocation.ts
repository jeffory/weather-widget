export class GeoLocation {
  static locateUser = new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Browser does not support geolocation feature.'));
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => resolve(position),
      () => reject(new Error('Could not find location')),
    );
  });
}
