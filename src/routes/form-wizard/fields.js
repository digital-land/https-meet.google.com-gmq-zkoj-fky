import UploadFileController from '../../controllers/uploadFileController.js'
import UploadUrlController from '../../controllers/uploadUrlController.js'

export default {
  'data-subject': {
    validate: 'required',
    invalidates: ['dataset', 'upload-method', 'geomType']
  },
  dataset: {
    validate: 'required',
    invalidates: ['upload-method', 'geomType']
  },
  geomType: {
    validate: 'required'
  },
  'upload-method': {
    validate: 'required'
  },
  datafile: {
    validate: [
      { type: 'required', fn: UploadFileController.notUndefined },
      { type: 'fileType', fn: UploadFileController.extensionIsValid },
      { type: 'fileSize', fn: UploadFileController.sizeIsValid },
      { type: 'fileNameTooLong', fn: UploadFileController.fileNameIsntTooLong },
      { type: 'fileNameInvalidCharacters', fn: UploadFileController.fileNameIsValid },
      { type: 'fileNameDoubleExtension', fn: UploadFileController.fileNameDoesntContainDoubleExtension },
      { type: 'mimeType', fn: UploadFileController.fileMimeTypeIsValid },
      { type: 'mimeTypeMalformed', fn: UploadFileController.fileMimeTypeMatchesExtension }
    ]
  },
  url: {
    validate: [
      'required',
      { type: 'format', fn: UploadUrlController.urlIsValid },
      { type: 'length', fn: UploadUrlController.urlIsNotTooLong }
    ]
  },
  dataLooksCorrect: {
    validate: 'required'
  }
}
