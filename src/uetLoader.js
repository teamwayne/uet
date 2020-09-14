// Type your JavaScript code here...  
import UET_UTILS from './utils';

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
export default iagUet;