import UploadFileController from '../../controllers/uploadFileController.js'
import UploadUrlController from '../../controllers/uploadUrlController.js'

export default {
  'data-subject': {
    validate: 'required',
    invalidates: ['dataset', 'validationResult', 'upload-method', 'geomType']
  },
  dataset: {
    validate: 'required',
    invalidates: ['validationResult', 'upload-method', 'geomType']
  },
  geomType: {
    validate: 'required',
    invalidates: ['validationResult']
  },
  'upload-method': {
    validate: 'required',
    invalidates: ['validationResult']
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
    ],
    invalidates: ['validationResult']
  },
  url: {
    validate: [
      'required',
      { type: 'format', fn: UploadUrlController.urlIsValid },
      { type: 'length', fn: UploadUrlController.urlIsNotTooLong }
    ],
    invalidates: ['validationResult']
  },
  dataLooksCorrect: {
    validate: 'required'
  }
}
