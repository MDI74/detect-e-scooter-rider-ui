import { ImageSlider } from './ImageSlider';

describe('ImageSlider', () => {
  it(`
  GIVEN ImageSlider component 
  WHEN there are no uploaded images
  THEN component is not rendering
  `, () => {
    mountComponent({
      dataImageSrcList: [],
    });

    cy.get('.image-slider')
      .should('not.exist');
  });

  it(`
  GIVEN ImageSlider component with one image
  WHEN one image uploaded
  THEN component is rendering with one image
  `, () => {
    mountComponent({
      dataImageSrcList: ['image'],
    });

    cy.get('.image-slider')
      .should('exist');
  });

  it(`
  GIVEN ImageSlider component with two image
  WHEN user swipes the image to the right
  THEN second image will appear
  `, () => {
    mountComponent({
      dataImageSrcList: ['image', 'image2'],
    });

    cy.get('.image-slider')
      .should('exist');

    cy.get('.image-gallery-right-nav')
      .click();
  });
});

function mountComponent({
  dataImageSrcList,
}: {
  dataImageSrcList: string[];
}) {
  cy.mount(
    <ImageSlider dataImageSrcList={dataImageSrcList} />,
  );
}
