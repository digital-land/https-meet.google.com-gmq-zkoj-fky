module.exports = {
  '/start': {
    entryPoint: true,
    resetJourney: true,
    next: 'data-subject'
  },
  '/data-subject': {
    fields: ['data-subject'],
    next: 'dataset'
  },
  '/dataset': {
    controller: require('../../controllers/datasetController'),
    fields: ['dataset'],
    next: 'upload'
  },
  '/upload': {
    controller: require('../../controllers/uploadController'),
    fields: ['datafile', 'path'],
    next: 'submit'
  },
  '/submit': {
    controller: require('../../controllers/submitForm'),
    next: 'done'
  }
}
