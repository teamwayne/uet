// ***SGIC UET Tags for Tealium***
// Last Generated: 2020-05-21T11:38:20
// Number of tags converted: 0

window.load = window.load || {};
window.load.tags = window.load.tags || {};
window.load.tags.uetTagsTealium = window.load.tags.uetTagsTealium || {};
window.load.tags.uetTagsTealium.sgic = {
  'SGIC Quote Start: Boat': {
    'category': 'Quote',
    'action': 'Start',
    'insuranceType': 'boat-trailered',
    'targetPage': /\/quote\/boat.*\/step1\/?$/i
  },
  'SGIC Quote Start: Caravan': {
    'category': 'Quote',
    'action': 'Start',
    'insuranceType': 'caravan-touring',
    'targetPage': /\/quote\/caravan.*\/step1\/?$/i
  },
  'SGIC Quote Start: Business': {
    'category': 'Quote',
    'action': 'Start',
    'insuranceType': 'business-business',
    'targetPage': /quote\/business\/(((?!(business-pack)).)*\/splash|(business-pack\/eligibility))\/?$/i
  },
  'SGIC Quote Complete: Business': {
    'category': 'Quote',
    'action': 'Complete',
    'insuranceType': 'business-business',
    'targetPage': /quote\/business\/.*\/price$/i
  },
  'SGIC Quote Complete: Boat': {
    'category': 'Quote',
    'action': 'Complete',
    'insuranceType': 'boat-trailered',
    'targetPage': /\/quote\/boat.*\/quick-quote\/?$/i
  },
  'SGIC Quote Complete: Caravan': {
    'category': 'Quote',
    'action': 'Complete',
    'insuranceType': 'caravan-touring',
    'targetPage': /\/quote\/caravan.*\/quick-quote\/?$/i
  },
  'SGIC Buy Start: Boat': {
    'category': 'Buy',
    'action': 'Start',
    'insuranceType': 'boat-trailered',
    'targetPage': /\/quote\/boat.*\/start-buy\/?$/i
  },
  'SGIC Buy Start: Caravan': {
    'category': 'Buy',
    'action': 'Start',
    'insuranceType': 'caravan-caravan',
    'targetPage': /\/quote\/caravan.*\/start-buy\/?$/i
  },
  'SGIC Buy Start: Business': {
    'category': 'Buy',
    'action': 'Start',
    'insuranceType': 'business-business-pack',
    'targetPage': /quote\/business\/.*\/buy-business-details$/i
  },
  'SGIC Buy Complete: Boat': {
    'category': 'Buy',
    'action': 'Complete',
    'insuranceType': 'boat-trailered',
    'targetPage': /\/quote\/boat.*\/purchase-confirmation\/?$/i
  },
  'SGIC Buy Complete: Caravan': {
    'category': 'Buy',
    'action': 'Complete',
    'insuranceType': 'caravan-touring',
    'targetPage': /\/quote\/caravan.*\/purchase-confirmation\/?$/i
  },
  'SGIC Buy Complete: Business': {
    'category': 'Buy',
    'action': 'Complete',
    'insuranceType': 'business-business-pack',
    'targetPage': /quote\/business\/.*\/purchase-confirmation$/i
  }
};