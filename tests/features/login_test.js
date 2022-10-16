Feature('로그인');

// Given
Before(({ I }) => {
  I.amOnPage('/');

  I.click('로그인');
});

Scenario('유효한 정보를 입력해서 로그인에 성공한 경우', ({ I }) => {
  // When
  I.fillField('아이디', 'makaoKim');
  I.fillField('비밀번호', 'makaoKim92!');

  I.click('로그인하기');

  // Then
  I.see('로그아웃');
});

Scenario('아이디를 입력하지 않았을 경우', ({ I }) => {
  // When
  I.fillField('비밀번호', '1234');

  I.click('로그인하기');

  // Then
  I.see('아이디를 입력해주세요');
});

Scenario('비밀번호를 입력하지 않았을 경우', ({ I }) => {
  // When
  I.fillField('아이디', 'jel1y');

  I.click('로그인하기');

  // Then
  I.see('비밀번호를 입력해주세요');
});
 