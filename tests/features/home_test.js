Feature('Home page ');

Scenario('visit the home page', ({ I }) => {
  // when
  I.amOnPage('/');

  // then
  I.see('특별한');
  I.see('아이템을 전하세요');
});

Scenario('Loign from home page', ({ I }) => {
  // when
  I.amOnPage('/');

  // then
  I.click('로그인');

  I.fillField('아이디', 'makaoKim');
  I.fillField('비밀번호', 'makaoKim92!');

  I.click('로그인하기');

  // Then

  I.see('내 잔액: 47,000원');
});
