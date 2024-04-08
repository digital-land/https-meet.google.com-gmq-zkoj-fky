import UploadController from './uploadController.js'
import { postUrlRequest } from '../utils/asyncRequestApi.js'
import { URL } from 'url'

class SubmitUrlController extends UploadController {
  async post (req, res, next) {
    this.resetValidationErrorMessage()
    if (!SubmitUrlController.localUrlValidation(req.body.url)) {
      this.validationError('format', '', null, req)
    } else {
      try {
        const id = await postUrlRequest({ ...this.getBaseFormData(req), url: req.body.url })
        req.body.request_id = id
      } catch (error) {
        this.handleApiError(error, req)
      }
    }
    super.post(req, res, next)
  }

  static localUrlValidation (url) {
    return SubmitUrlController.urlIsValid(url) && SubmitUrlController.urlIsNotTooLong(url)
  }

  static urlIsValid (url) {
    try {
      // eslint-disable-next-line no-new
      new URL(url)
      return true
    } catch (err) {
      return false
    }
  }

  static urlIsNotTooLong (url) {
    return url.length <= 2048
  }
}

export default SubmitUrlController
