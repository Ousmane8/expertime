import data from '../data/payload-rmp.json';
import BrandData from '../data/brands.json'

export const arr = data.requests;
export const arrr = BrandData;

export const getFilteredData = (filter, data) => {
  if (!filter) {
    return data;
  }
  return data.filter(item =>
    item.campaignName.toLowerCase().includes(filter.toLowerCase())
  );
};
export const getFilteredBrandData = (filterBrandData, BrandData) => {
  if (!filterBrandData) {
    return BrandData;
  }
  return BrandData.filter(item =>
    item.name.toLowerCase().includes(filterBrandData.toLowerCase())
  );
};
