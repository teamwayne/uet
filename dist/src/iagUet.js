        /*! date: 2020-08-26T11:06:23.722Z */
        (function() {
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
// Type your JavaScript code here...  


var iagUet = {
  config: {
    // Profile
    cgu: {
      accountId: '36002050',
      apptype: /brochureware|journey|ssc|easysure/,
      appname: /ssc|whitelabel|retail-web/
    },
    nrma: {
      accountId: '36002051',
      apptype: /brochureware|journey/,
      appname: /retail-web/
    },
    sgic: {
      accountId: '36002053',
      apptype: /brochureware|journey/,
      appname: /retail-web/
    },
    sgio: {
      accountId: '36002052',
      apptype: /brochureware|journey/,
      appname: /retail-web/
    },
    easysure: {
      accountId: '36002050',
      apptype: /whitelabel/,
      appname: /easysure/
    },
    main: {
      brands: {
        nrma: {
          accountId: '36002051',
          appname: /sme|caravan|boat|express-payment|retrieve-quote/,
          apptype: /journey/
        },
        cgu: {
          accountId: '36002050',
          appname: /sme/,
          apptype: /journey/
        },
        sgic: {
          accountId: '36002053',
          appname: /sme|caravan|boat|express-payment|retrieve-quote/,
          apptype: /journey/
        },
        sgio: {
          accountId: '36002052',
          appname: /sme|caravan|boat|express-payment|retrieve-quote/,
          apptype: /journey/
        }
      }
    },
  },

  // Caravan, Boat, Express Payment, doesn't have brand.

  loadUetTag: function(accountId) {
    if (load.config.uet && load.config.uet.enable) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      var code  = '(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:'+accountId+'};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");';
      script.appendChild(document.createTextNode(code));
      document.body.appendChild(script);
    }
  },


  tealiumProfileChecking: function(profile) {
    if (!this.config[profile]) return;

    // Check appname and conifg are the same as load.config
    if (window.load.config.appname && window.load.config.apptype && profile !== 'main') {
      if (this.config[profile].apptype.test(window.load.config.apptype)) {
        this.loadUetTag(this.config[profile].accountId);
      }
    } else {
      // Main Profile without load.config object.
      var brand = UET_UTILS.checkAppBrand();
      // When brand is not part of the brand list in UET, return.
      if (!this.config[brand]) return;
      this.loadUetTag(this.config[profile].brands[brand].accountId);
    }

  },
  executeLoader: function() {
    if (!load.config) return;
    try {
      var profile = UET_UTILS.checkTealiumProfile();
      if (profile === 'easysure' && load.config.brand !== 'cgu') return;
      this.tealiumProfileChecking(profile);
    } catch (e) {
      console.log(e);
    }
  }
};
if (!window.uetq) iagUet.executeLoader();
// Safely load load object.
window.load = window.load || {};
window.load.tags = window.load.tags || {};
// Inherit common Tealium helper tools from IAG Common Tealium Helpers Extension
window.utag_data = window.utag_data || {};
// Use load.tools, but if doesn't exist, use utag_data.tools
var tools = window.load.tools || window.utag_data.tools || {};

var UETTAGS = {  
  pageId: '',
  // Stores each tag which has been fired to avoid double-firing of tags.
  fired: {},
  // Boolean if logged to console.
  logged: false,
  // Uet tag library version
  appVersion: 'uet-1.0',

  /* Run the main function of this library. See this.execut e() for further information.
   * Note the parameters of this.handleUETTags() is the dcmtags object set globally in window.load.tags.
   * This is dependent on tag container.
   */
  executeLibrary: function(brand) {
    return this.handleUETTags(window.load.tags['uetTags' + UET_UTILS.container], brand);
  },
  /**
   * Timeout function to avoid things double firing for whatever reason.
   */
  timeOut: function(flag, milliSec) {
    this[flag] = true;
    var that = this;
    setTimeout(function() {
      that[flag] = false;
    }, milliSec);
  },
  /**
   * Enable Logging: Log to console if load.tools.enterDebugMode() on.
  */
  logger: function(firedTagObj) {
    if (window.localStorage && window.localStorage.getItem('siteTrackingDebug')) {
      if (!this.logged) {
        console.log('%c UET(s) Fired on ' + this.pageId + ' ', 'background: #0f9d58; color: #DDDDDD; font-weight: bold'); // eslint-disable-line no-console
        this.timeOut('logged', 500);
      }
      console.table(firedTagObj); // eslint-disable-line no-console
    }
  },
  /**
   * Function to log things to Splunk for debugging purposes.
   * @param {string} queryStr a URL encoded string separated by name value pairs which logs information to Splunk.
  */
  fireSplunk: function(queryStr) {
    if(!queryStr) return;
    var reqId = new Date().getTime() + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    var srcStr = 'https://apps.nrma.com.au/si/track.gif' +
    '?reqId=' +
    reqId +
    queryStr;
    var img = new Image();
    img.src = srcStr;
  },

  /**
   * Helper to merge (or extend) two objects together forming one big and flat object
   * @param {object} obj New object you wish to merge.
   * @param {object} src Existing object.
   */
  extendObj: function(obj, src) {
    if (!obj) return;
    Object.keys(src).forEach(function(key) {
      obj[key] = src[key];
    });
    return obj;
  },
  /**
   * Handler to decide how to fire the Uet tag, preferencing the gTag method with pixel as backup.
   * Also logs the firing of the tag to Splunk and pushes to fired tag to the this.fired array.
   * @param {string} tag The key name from the single tag object. This is the Uet tag name.
   * @param {object} tagObj The single tag object from the for in loop from window.load.tags.dcmtags
   * @param {object} brand Object returned by this.getBrand()
   */
  handleTagFire: function(tag, tagObj, brand) {
    window.load.tags.uetTagsFired = window.load.tags.uetTagsFired  || [];
    window.uetq = window.uetq || [];  
    // Check current pageId is it the same previous pageId to avoid double fire.
    if (window.load.tags.uetTagsFired[window.load.tags.uetTagsFired.length-1] === __pageId) return;
    window.uetq.push (
      'event', tagObj.action , 
      {
        'event_category': tagObj.category,
        'event_label': tagObj.insuranceType
      });  
    // Avoid double firing.
    window.load.tags.uetTagsFired.push(__pageId);
    // Add tag fired obj
    var firedTag = {};
    firedTag[tag] = tagObj;
    this.logger(firedTag);
    
    this.fired = this.extendObj(firedTag, this.fired);
    // Log to Splunk
    if (!/retargeting\sslice\sallocation/i.test(tag)) {
      this.fireSplunk('&Uet=' + encodeURIComponent(tag)
        + '&domain=' + encodeURIComponent(window.location.hostname  + window.location.pathname)
        + '&brand=' + encodeURIComponent(UET_UTILS.checkAppBrand())
        + '&insurancetype=' + encodeURIComponent(tagObj.insuranceType)
        + '&catergory=' + encodeURIComponent(tagObj.category)
        + '&targetPage=' + encodeURIComponent(tagObj.targetPage)
        + '&pageId=' + encodeURIComponent(this.pageId)
      );
    }
  },

  /**
   * Key handler to deciding what Uet tag to fire.
   * Iterates through each uet tag object and decides if it should be fired or not.
   * Uses a guard clause pattern as opposed to nested if statements to aid clarity.
   * @param {object} allTagsObj The global tag object set in load: window.load.tags.dcmtags
   */
  handleUETTags: function(allTagsObj, brand) {
    var tagsObj = allTagsObj[brand];
    // Exception handling
    if (!tagsObj) throw 'No UET tags found for this Brand';

    // Note that continue; skips (not exits) the loop iteration
    for (var tag in tagsObj) {
      // Skip if tag already fired on this page
      if (this.fired[tag]) continue;
      
      // Use loadRules handler to determine if tag should fire. Also handles multiPage scenarios.
      if (tools.loadRules.handler(tagsObj[tag], this.pageId)) {
        this.handleTagFire(tag, tagsObj[tag], brand);
        continue;
      }
    }
  },

  /**
   * Execute function is fired in different places dependent on tag container.
   */
  execute: function () {
    try {
      if (!window.uetq || !(load.config.uet && load.config.uet.enable)) return;
      this.pageId = UET_UTILS.getPageId();
      var brand = UET_UTILS.checkAppBrand();
      var profile = UET_UTILS.checkTealiumProfile();
      if (profile === 'easysure' && load.config.brand !== 'cgu') return;
      this.executeLibrary(brand);
    } catch (error) {
      if (tools.log) tools.log('UET Tag Error: ' + error);
      this.fireSplunk('&UetError=' + encodeURIComponent(error)
        + '&domain=' + encodeURIComponent(window.location.hostname)
        + '&brand=' +  encodeURIComponent(brand)
        + '&pageId=' + encodeURIComponent(this.pageId)
        + '&appVersion=' + this.appVersion + '-' + UET_UTILS.container
      );
    }
  },
};
UETTAGS.execute();
        })();