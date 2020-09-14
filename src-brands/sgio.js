// ***SGIO UET Tags for Tealium***
// Last Generated: 2020-05-21T11:38:55
// Number of tags converted: 0

window.load = window.load || {};
window.load.tags = window.load.tags || {};
window.load.tags.uetTagsTealium = window.load.tags.uetTagsTealium || {};
window.load.tags.uetTagsTealium.sgio = {
  'SGIO Quote Start: Boat': {
    'category': 'Quote',
    'action': 'Start',
    'insuranceType': 'boat-trailered',
    'targetPage': /\/quote\/boat.*\/step1\/?$/i
  },
  'SGIO Quote Start: Caravan': {
    'category': 'Quote',
    'action': 'Start',
    'insuranceType': 'caravan-touring',
    'targetPage': /\/quote\/caravan.*\/step1\/?$/i
  },
  'SGIO Quote Start: Business': {
    'category': 'Quote',
    'action': 'Start',
    'insuranceType': 'business-business',
    'targetPage': /quote\/business\/(((?!(business-pack)).)*\/splash|(business-pack\/eligibility))\/?$/i
  },
  'SGIO Quote Complete: Business': {
    'category': 'Quote',
    'action': 'Complete',
    'insuranceType': 'business-business',
    'targetPage': /quote\/business\/.*\/price$/i
  },
  'SGIO Quote Complete: Boat': {
    'category': 'Quote',
    'action': 'Complete',
    'insuranceType': 'boat-trailered',
    'targetPage': /\/quote\/boat.*\/quick-quote\/?$/i
  },
  'SGIO Quote Complete: Caravan': {
    'category': 'Quote',
    'action': 'Complete',
    'insuranceType': 'caravan-touring',
    'targetPage': /\/quote\/caravan.*\/quick-quote\/?$/i
  },
  'SGIO Buy Start: Boat': {
    'category': 'Buy',
    'action': 'Start',
    'insuranceType': 'boat-trailered',
    'targetPage': /\/quote\/boat.*\/start-buy\/?$/i
  },
  'SGIO Buy Start: Caravan': {
    'category': 'Buy',
    'action': 'Start',
    'insuranceType': 'caravan-caravan',
    'targetPage': /\/quote\/caravan.*\/start-buy\/?$/i
  },
  'SGIO Buy Start: Business': {
    'category': 'Buy',
    'action': 'Start',
    'insuranceType': 'business-business-pack',
    'targetPage': /quote\/business\/.*\/buy-business-details$/i
  },
  'SGIO Buy Complete: Boat': {
    'category': 'Buy',
    'action': 'Complete',
    'insuranceType': 'boat-trailered',
    'targetPage': /\/quote\/boat.*\/purchase-confirmation\/?$/i
  },
  'SGIO Buy Complete: Caravan': {
    'category': 'Buy',
    'action': 'Complete',
    'insuranceType': 'caravan-touring',
    'targetPage': /\/quote\/caravan.*\/purchase-confirmation\/?$/i
  },
  'SGIO Buy Complete: Business': {
    'category': 'Buy',
    'action': 'Complete',
    'insuranceType': 'business-business-pack',
    'targetPage': /quote\/business\/.*\/purchase-confirmation$/i
  }
};