import { render, screen, fireEvent, act } from '@testing-library/react';
import BottomSheet from '@components/BottomSheet';
import useModal from '@hooks/useModal';

vi.mock('@hooks/useModal', () => {
  const openModalMock = vi.fn();
  const closeModalMock = vi.fn();
  const isModalOpenMock = vi.fn((key: string) => key === 'testSheet');

  return {
    default: () => ({
      isModalOpen: isModalOpenMock,
      openModal: openModalMock,
      closeModal: closeModalMock,
    }),
  };
});

describe('BottomSheet Component', () => {
  test('모달이 열리고 콘텐츠가 표시되는지 확인', () => {
    const { isModalOpen, openModal } = useModal();

    render(
      <BottomSheet sheetKey="testSheet">
        <div>내용</div>
      </BottomSheet>,
    );

    act(() => {
      openModal('testSheet');
    });

    expect(isModalOpen).toHaveBeenCalledWith('testSheet');
    expect(screen.getByText('내용')).toBeInTheDocument();
  });

  test('배경을 클릭하면 모달이 닫히는지 확인', () => {
    const { closeModal, openModal } = useModal();

    render(
      <BottomSheet sheetKey="testSheet">
        <div>내용</div>
      </BottomSheet>,
    );

    act(() => {
      openModal('testSheet');
    });

    expect(screen.getByText('내용')).toBeInTheDocument();

    const overlay = screen.getByTestId('bottom-sheet-overlay');
    fireEvent.click(overlay);

    expect(closeModal).toHaveBeenCalledWith('testSheet');
  });

  test('닫기 버튼을 클릭하면 모달이 닫히는지 확인', () => {
    const { closeModal, openModal } = useModal();

    render(
      <BottomSheet sheetKey="testSheet">
        <div>내용</div>
      </BottomSheet>,
    );

    act(() => {
      openModal('testSheet');
    });

    expect(screen.getByText('내용')).toBeInTheDocument();

    const closeButton = screen.getByTestId('bottom-sheet-close-button');
    fireEvent.click(closeButton);

    expect(closeModal).toHaveBeenCalledWith('testSheet');
  });

  test('모달을 아래로 드래그하면 닫히는지 확인', () => {
    const { closeModal, openModal } = useModal();

    render(
      <BottomSheet sheetKey="testSheet">
        <div data-testid="content">내용</div>
      </BottomSheet>,
    );

    act(() => {
      openModal('testSheet');
    });

    expect(screen.getByText('내용')).toBeInTheDocument();

    const modal = screen.getByTestId('content');
    fireEvent.pointerDown(modal, { clientY: 100 });
    fireEvent.pointerMove(modal, { clientY: 200 });
    fireEvent.pointerUp(modal);

    expect(closeModal).toHaveBeenCalledWith('testSheet');
  });
});
