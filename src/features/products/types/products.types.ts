export type FakeStoreProductRating = {
  readonly rate: number;
  readonly count: number;
};

export type FakeStoreProductApiResponse = {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly category: string;
  readonly image: string;
  readonly rating: FakeStoreProductRating;
};

export type FakeStoreProduct = {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly category: string;
  readonly image: string;
  readonly rating: FakeStoreProductRating;
};

export type StrapiMediaAsset = {
  readonly id: number;
  readonly documentId: string;
  readonly url: string;
};

export type ProductsPageLinkItem = {
  readonly id: number;
  readonly name: string;
  readonly url: string;
};

export type ProductsPageFooterLinkSection = {
  readonly id: number;
  readonly title: string;
  readonly linkItem: readonly ProductsPageLinkItem[];
};

export type ProductsPageApiResponse = {
  readonly id: number;
  readonly documentId: string;
  readonly Title: string;
  readonly description: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly publishedAt: string;
  readonly footerTitle: string;
  readonly banner: StrapiMediaAsset;
  readonly bannerMobile: StrapiMediaAsset;
  readonly footerLinks: readonly ProductsPageFooterLinkSection[];
};

export type ProductsPageContent = {
  readonly title: string;
  readonly description: string;
  readonly footerTitle: string;
  readonly bannerUrl: string;
  readonly bannerMobileUrl: string;
  readonly footerLinks: readonly ProductsPageFooterLinkSection[];
};
