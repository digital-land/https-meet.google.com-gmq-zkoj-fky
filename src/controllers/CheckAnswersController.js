import PageController from './pageController.js'
import { sendEmail } from '../utils/mailClient.js'
import config from '../../config/index.js'

const dataManagementEmail = config.email.dataManagementEmail

class CheckAnswersController extends PageController {
  /**
   * Handles the HTTP POST request for choosing a dataset.
   * during this, we will perform a few actions
   * firstly, we will email Jira causing the creation of a ticket (this will be implemented at a later date)
   * secondly, we will email the management team to inform them of the request
   * finally, we will email the LPA/organisation to inform them that their request has been acknowledged
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function.
  */
  post (req, res, next) {
    this.sendEmails(req, res, next)

    super.post(req, res, next)
  }

  sendEmails (req, res, next) {
    const name = req.sessionModel.get('name')
    const email = req.sessionModel.get('email')
    const organisation = req.sessionModel.get('lpa')
    const dataset = req.sessionModel.get('dataset')
    const documentationUrl = req.sessionModel.get('documentation-url')
    const endpoint = req.sessionModel.get('endpoint-url')

    const { RequestTemplateId, AcknowledgementTemplateId } = config.email.templates

    // send request email to data management team
    sendEmail(dataManagementEmail, RequestTemplateId, {
      name,
      email,
      organisation,
      endpoint,
      'documentation-url': documentationUrl,
      dataset
    })

    // send acknowledgement email to LPA
    sendEmail(email, AcknowledgementTemplateId, {
      name,
      dataset,
      email: dataManagementEmail
    })
  }
}

export default CheckAnswersController