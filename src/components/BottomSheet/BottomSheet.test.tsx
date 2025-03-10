import { render, screen, fireEvent } from '@testing-library/react';
import BottomSheet from '@components/BottomSheet';

describe('BottomSheet Component', () => {
  test('모달이 열리고 콘텐츠 표시 확인', () => {
    render(
      <BottomSheet isOpen onClose={vi.fn()}>
        <div>모달 내용</div>
      </BottomSheet>,
    );

    expect(screen.getByText('모달 내용')).toBeInTheDocument();
  });

  test('배경을 클릭하면 onClose가 호출 확인', () => {
    const onCloseMock = vi.fn();
    render(
      <BottomSheet isOpen onClose={onCloseMock}>
        <div>모달 내용</div>
      </BottomSheet>,
    );

    fireEvent.click(screen.getByTestId('bottom-sheet-overlay'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('닫기 버튼을 클릭하면 onClose가 호출되는지 확인', () => {
    const onCloseMock = vi.fn();
    render(
      <BottomSheet isOpen onClose={onCloseMock}>
        <div>모달 내용</div>
      </BottomSheet>,
    );
    const closeButton = screen.getByTestId('bottom-sheet-close-button');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('모달 내부 클릭 시 onClick={(e) => e.stopPropagation()} 확인', () => {
    const onCloseMock = vi.fn();
    render(
      <BottomSheet isOpen onClose={onCloseMock}>
        <div data-testid="modal-content">모달 내용</div>
      </BottomSheet>,
    );

    fireEvent.click(screen.getByTestId('modal-content'));
    expect(onCloseMock).not.toHaveBeenCalled();
  });
  // 확인 후 테스트 코드 추가 예정
  //   test('모달을 아래로 드래그해서 onClose가 호출되는 지 확인', () => {
  //     const onCloseMock = vi.fn();
  //     render(
  //       <BottomSheet isOpen={true} onClose={onCloseMock}>
  //         <div data-testid="modal-content">
  //           모달 내용
  //           <div>dddd</div>
  //           <div>dddd</div>
  //           <div>dddd</div>
  //           <div>dddd</div>
  //           <div>dddd</div>
  //         </div>
  //       </BottomSheet>,
  //     );

  //     const modal = screen.getByTestId('modal-content');

  //     const modalRect = modal.getBoundingClientRect();
  //     const modalBottom = modalRect.bottom;

  //     fireEvent.pointerDown(modal, { clientY: modalBottom });
  //     fireEvent.pointerMove(modal, { clientY: modalBottom + 50 });
  //     fireEvent.pointerUp(modal);

  //     expect(onCloseMock).toHaveBeenCalledTimes(1);
  //   });
});
