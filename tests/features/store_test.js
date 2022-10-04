Feature('Store page ');

Scenario('visit the store page', ({ I }) => {
  // given
  I.amOnPage('/');

  // when
  I.click('스토어');

  //then
  I.see(/mug/);
});

// Scenario('2페이지 상품을 보는 경우', ({ I }) => {
//   // given
//   I.amOnPage('/products');

//   // when
//   I.click('2');

//   //then
//   I.see(/??/);
// });
