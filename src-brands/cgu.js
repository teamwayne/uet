// ***CGU UET Tags for Tealium***
// Last Generated: 2020-05-21T04:59:51
// Number of tags converted: 0

window.load = window.load || {};
window.load.tags = window.load.tags || {};
window.load.tags.uetTagsTealium = window.load.tags.uetTagsTealium || {};
window.load.tags.uetTagsTealium.cgu = {
  'CGU Quote Start: Boat': {
    'category': 'Quote',
    'action': 'Start',
    'insuranceType': 'boat-trailered',
    'targetPage': /boat-quote\/step1\/?$/i
  },
  'CGU Quote Start: Caravan': {
    'category': 'Quote',
    'action': 'Start',
    'insuranceType': 'caravan-touring',
    'targetPage': /caravan-quote\/step1\/?$/i
  },
  'CGU Quote Start: Business': {
    'category': 'Quote',
    'action': 'Start',
    'insuranceType': 'business-business',
    'targetPage': /quote\/business\/(((?!(business-pack)).)*\/splash|(business-pack\/eligibility))\/?$/i
  },
  'CGU Quote Complete: Business': {
    'category': 'Quote',
    'action': 'Complete',
    'insuranceType': 'business-business',
    'targetPage': /quote\/business\/.*\/price$/i
  },
  'CGU Quote Complete: Caravan': {
    'category': 'Quote',
    'action': 'Complete',
    'insuranceType': 'caravan-touring',
    'targetPage': /caravan-quote\/quote-confirmation\/?$/i
  },
  'CGU Quote Complete: Boat': {
    'category': 'Quote',
    'action': 'Complete',
    'insuranceType': 'boat-trailered',
    'targetPage': /boat-quote\/quote-confirmation\/?$/i
  },
  'CGU Buy Start: Business': {
    'category': 'Buy',
    'action': 'Start',
    'insuranceType': 'business-business',
    'targetPage': /quote\/business\/.*\/buy-business-details$/i
  },
  'CGU Buy Complete: Business': {
    'category': 'Buy',
    'action': 'Complete',
    'insuranceType': 'business-business',
    'targetPage': /quote\/business\/.*\/purchase-confirmation$/i
  }
};