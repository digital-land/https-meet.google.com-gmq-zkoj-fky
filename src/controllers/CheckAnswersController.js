import PageController from './pageController.js'
import { JiraIssue } from '../utils/JiraIssue.js'

class ChooseDatasetController extends PageController {
  post (req, res, next) {
    const issue = new JiraIssue({
      summary: `New ${req.sessionModel.get('dataset')} dataset endpoint submission from ${req.sessionModel.get('lpa')}`,
      description: `A new dataset endpoint submission has been made by ${req.sessionModel.get('name')} from ${req.sessionModel.get('lpa')}.\n\n
                        The dataset is a ${req.sessionModel.get('dataset')} dataset and the endpoint URL is ${req.sessionModel.get('endpoint-url')}.\n\n
                        Documentation for the dataset can be found at ${req.sessionModel.get('documentation-url')}.\n\n
                        The user has confirmed that they have the necessary licence to share this data.`,
      customField_10000: [req.sessionModel.get('email')]
    })

    issue.saveToJira()

    super.post(req, res, next)
  }
}

export default ChooseDatasetController
