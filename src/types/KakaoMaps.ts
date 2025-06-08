type KakaoLatLng = object;

type KakaoMap = object;

interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
}

interface KakaoMarkerOptions {
  position: KakaoLatLng;
}

interface KakaoMarker {
  setMap: (map: KakaoMap) => void;
}

export default interface KakaoMaps {
  load: (callback: () => void) => void;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Map: new (
    container: HTMLElement | null,
    options: KakaoMapOptions,
  ) => KakaoMap;
  Marker: new (options: KakaoMarkerOptions) => KakaoMarker;
}
