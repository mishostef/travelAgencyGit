import { TravelAgencyPage } from './app.po';

describe('travel-agency App', function() {
  let page: TravelAgencyPage;

  beforeEach(() => {
    page = new TravelAgencyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
