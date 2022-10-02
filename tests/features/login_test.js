Feature('로그인');

// Given
Before(({ I }) => {
  I.setupDatabase();

  I.changeAmount({ useId: 1, amount: 1000 });
  I.changeAmount({ useId: 2, amount: 2000 });
});

Scenario('1번 사용자 로그인', ({ I }) => {
  // when
  I.amOnPage('/');

  I.click('로그인');

  I.fillField('계좌 번호', '1234');
  I.fillField('패스워드', 'password');
  I.click('[type=submit]');

  // when
  I.click('잔액 확인');

  // then
  I.see('계좌번호: 1234');
  I.see('잔액: 1,000원');
});

Scenario('2번 사용자 로그인', ({ I }) => {
  // when
  I.amOnPage('/');

  I.click('로그인');

  I.fillField('계좌 번호', '1234567890');
  I.fillField('패스워드', 'password');
  I.click('[type=submit]');

  // when
  I.click('잔액 확인');

  // then
  I.see('계좌번호: 1234567890');
  I.see('잔액: 2,000원');
});
