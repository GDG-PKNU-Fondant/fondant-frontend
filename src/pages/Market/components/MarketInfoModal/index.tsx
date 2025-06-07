import React, { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MarketDetail } from '@type/Market';
import useModal from '@hooks/useModal';
import useBodyScrollLock from '@hooks/useBodyScrollLock';
import Button from '@components/Button';
import BackIcon from '@assets/icons/back.svg?react';
import LocationIcon from '@assets/icons/location.svg?react';
import RoadViewIcon from '@assets/icons/road-view.svg?react';
import MapIcon from '@assets/icons/map.svg?react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MarketInfoModalProps {
  marketDetail: MarketDetail;
}

const MAP_CONFIG = {
  level: 3,
  scriptSrc: (appKey: string) =>
    `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`,
};

const createKakaoMapUrl = (name: string, lat: number, lng: number): string => {
  return `https://map.kakao.com/link/to/${encodeURIComponent(name || '목적지')},${lat},${lng}`;
};

const createRoadViewUrl = (lat: number, lng: number): string => {
  return `https://map.kakao.com/link/roadview/${lat},${lng}`;
};

const modalVariants = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '100%' },
};

const modalTransition = {
  duration: 0.3,
  ease: 'easeOut',
};

const MarketInfoModal: React.FC<MarketInfoModalProps> = ({ marketDetail }) => {
  const { isModalOpen, closeModal } = useModal();
  const { lockBodyScroll, unlockBodyScroll } = useBodyScrollLock();

  const isOpen = isModalOpen(`market-info-${marketDetail.id}`);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      lockBodyScroll();
      return () => unlockBodyScroll();
    }
  }, [isOpen, lockBodyScroll, unlockBodyScroll]);

  const initializeKakaoMap = useCallback(() => {
    if (!window.kakao?.maps || !mapRef.current) return;

    const { latitude, longitude } = marketDetail.profile;

    window.kakao.maps.load(() => {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: MAP_CONFIG.level,
      };

      const map = new window.kakao.maps.Map(container, options);
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
    });
  }, [marketDetail.profile.latitude, marketDetail.profile.longitude]);

  useEffect(() => {
    if (!isOpen || !mapRef.current) return;

    const script = document.createElement('script');
    script.src = MAP_CONFIG.scriptSrc(import.meta.env.VITE_KAKAO_MAP_APPKEY);
    script.async = true;
    script.onload = initializeKakaoMap;

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [isOpen, initializeKakaoMap]);

  const handleClose = useCallback(() => {
    closeModal(`market-info-${marketDetail.id}`);
  }, [closeModal]);

  const handleDirectionsClick = useCallback(() => {
    const { latitude, longitude } = marketDetail.profile;
    const kakaoMapUrl = createKakaoMapUrl(
      marketDetail.name,
      latitude,
      longitude,
    );
    window.open(kakaoMapUrl, '_blank');
  }, [
    marketDetail.name,
    marketDetail.profile.latitude,
    marketDetail.profile.longitude,
  ]);

  const handleRoadViewClick = useCallback(() => {
    const { latitude, longitude } = marketDetail.profile;
    const roadViewUrl = createRoadViewUrl(latitude, longitude);
    window.open(roadViewUrl, '_blank');
  }, [marketDetail.profile.latitude, marketDetail.profile.longitude]);

  const ModalHeader = () => (
    <header className="sticky top-0 left-0 right-0 w-full border-b border-beige-tertiary">
      <div className="flex h-[60px] bg-background items-center justify-between px-[16px]">
        <button
          className="cursor-pointer"
          type="button"
          onClick={handleClose}
          aria-label="닫기"
        >
          <BackIcon />
        </button>
        <div
          className="flex-grow text-brown-primary text-[19px] text-center font-bold mr-[24px]"
          aria-label="정보"
        >
          정보
        </div>
      </div>
    </header>
  );

  const MapSection = () => (
    <div>
      <div className="text-[16px] text-brown-primary font-semibold mb-[12px]">
        위치
      </div>
      <div
        ref={mapRef}
        className="w-full aspect-[2] border border-beige-primary rounded-[10px] overflow-hidden mb-[12px]"
      />
      <div className="flex flex-row items-center gap-[4px] mb-[12px]">
        <LocationIcon width={20} height={20} />
        <div className="text-[14px] text-brown-primary font-medium">
          {marketDetail.profile.address}
        </div>
      </div>
      <div className="flex gap-[8px]">
        <Button variant="secondary" block onClick={handleRoadViewClick}>
          <div className="flex flex-row items-center justify-center gap-[4px]">
            <RoadViewIcon />
            <span className="text-[14px] text-brown-primary font-medium">
              로드뷰
            </span>
          </div>
        </Button>
        <Button variant="secondary" block onClick={handleDirectionsClick}>
          <div className="flex flex-row items-center justify-center gap-[4px]">
            <MapIcon />
            <span className="text-[14px] text-brown-primary font-medium">
              길찾기
            </span>
          </div>
        </Button>
      </div>
    </div>
  );

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 w-full max-w-[480px] bg-background z-1 mx-auto"
          initial={modalVariants.initial}
          animate={modalVariants.animate}
          exit={modalVariants.exit}
          transition={modalTransition}
        >
          <ModalHeader />
          <div className="flex-1 overflow-y-auto p-[16px]">
            <MapSection />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default MarketInfoModal;
