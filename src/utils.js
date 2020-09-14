var UET_UTILS = {
  //*********** SETTINGS START (User configurable settings for this library) ***********/
  // Tag container where UET is executed. ** DO NOT CHANGE THIS STRING ** It's used in this.retrieveUParams().
  container: 'Tealium',
  /**
   * Function to retrieve pageId string.
   * Is set as function so it doesn't execute at the time the library is loaded as the pageId might not be ready yet.
   */
  getPageId: function() {
    if (typeof b !== 'undefined' && b.pageId) return b.pageId;
    if (window.__pageId) return window.__pageId;
    if (window.utag && window.utag.data && window.utag.data.pageId) return window.utag.data.pageId;
    return '';
  },

  checkAppBrand: function() {
    // If load.config brand is available, return brand from load.config.
    if (window.load.config && window.load.config.brand) return window.load.config.brand;

    var dataLayer = window.iagDataLayer || window.dataLayer;
    var pageName = dataLayer[0].pageId;
    var brand = pageName.split('/')[1].toLowerCase();
    return brand;
  },

  checkTealiumProfile: function() {
    return load.config.profile[0];
  },
  /** 
   * Function to return an array of possible strings which contain the IAG brand name.
   * Is set as function so it doesn't execute at the time the library is loaded as the pageId might not be ready yet.
  */
  getBrandArr: function() {
    return [
      window.load.config && window.load.config.brand ? window.load.config.brand : false,
      typeof b !== 'undefined' && b.pageId ? b.pageId : false,
      window.__pageId,
      window.utag && window.utag.data && window.utag.data.pageId ? window.utag.data.pageId : false,
      window.location.search,
      window.location.pathname,
      window.location.hostname
    ];
  },
  /*********** SETTINGS END ***********/
};

export default UET_UTILS;