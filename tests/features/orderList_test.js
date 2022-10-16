Feature('주문 목록 확인 - 고객은 자신이 선물한 이력을 확인하기 위해 주문 목록을 확인할 수 있다.');

// Given
Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('로그인 하지 않고 주문 내역을 클릭할 경우', ({ I }) => {
  // When
  I.click('주문조회');

  // Then
  I.see('USER LOGIN');
});

Scenario('주문 내역이 없는 경우', ({ I }) => {
  // Given
  I.amOnPage('/login');

  I.fillField('아이디', 'makaoKim');
  I.fillField('비밀번호', 'makaoKim92!');

  I.click('로그인하기');

  // When
  I.click('주문조회');

  // Then
  I.see('내가 주문한 내역입니다');
  I.see('LUCETE');
  I.see('To.돼지갈비냠냠');
});
