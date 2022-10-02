Feature('Home page ');

Scenario('visit the home page', ({ I }) => {
  // when
  I.amOnPage('/');

  // then
  I.see('특별한 아이템을 전하세요');
});
