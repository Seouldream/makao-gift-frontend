Feature('로그아웃');

Before(({ I }) => {
  I.amOnPage('/login');

});

Scenario('로그아웃', ({ I }) => {
  // given
  I.fillField('아이디', 'makaoKim');
  I.fillField('비밀번호', 'makaoKim92!');

  I.click('로그인하기');

  I.see('내 잔액: 47,000원');

  // when
  I.click('로그아웃');
  // then

  I.dontSee('내 잔액: 47,000원');
  I.dontSee('로그아웃');

  I.see('로그인');
});
