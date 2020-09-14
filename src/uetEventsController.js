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