import { test } from '@playwright/test'
import StartPOM from './PageObjectModels/startPOM'
import DatasetPOM from './PageObjectModels/datasetPOM'
import GeometryTypePOM from './PageObjectModels/geometryTypePOM'
import UploadMethodPOM from './PageObjectModels/uploadMethodPOM'
import UploadFilePOM from './PageObjectModels/uploadFilePOM'
import UploadURLPOM from './PageObjectModels/uploadURLPOM'

test.use({ javaScriptEnabled: false })

test.describe('Back buttons work as expected without js for', () => {
  test('data set page', async ({ page, baseURL }) => {
    const startPOM = new StartPOM(page)
    const datasetPOM = new DatasetPOM(page)

    await startPOM.navigateHere()
    await startPOM.clickStartNow()

    await datasetPOM.waitForPage()
    await datasetPOM.goBack()

    await startPOM.waitForPage()
  })

  test('geometry type page', async ({ page, baseURL }) => {
    const startPOM = new StartPOM(page)
    const datasetPOM = new DatasetPOM(page)
    const geometryTypePOM = new GeometryTypePOM(page)

    await startPOM.navigateHere()
    await startPOM.clickStartNow()

    await datasetPOM.waitForPage()
    await datasetPOM.selectUploadMethod(DatasetPOM.datasets.Tree)

    await geometryTypePOM.waitForPage()
    await geometryTypePOM.goBack()

    await datasetPOM.waitForPage()
    await datasetPOM.goBack()

    await startPOM.waitForPage()
  })

  test('upload method page', async ({ page, baseURL }) => {
    const startPOM = new StartPOM(page)
    const datasetPOM = new DatasetPOM(page)
    const uploadMethodPOM = new UploadMethodPOM(page)

    await startPOM.navigateHere()
    await startPOM.clickStartNow()

    await datasetPOM.waitForPage()
    await datasetPOM.selectDataset(DatasetPOM.datasets.Article_4_direction_area_dataset)
    await datasetPOM.clickContinue()

    await uploadMethodPOM.waitForPage()
    await uploadMethodPOM.goBack()

    await datasetPOM.waitForPage()
    await datasetPOM.goBack()

    await startPOM.waitForPage()
  })

  test('upload method page (from geometry type)', async ({ page, baseURL }) => {
    const startPOM = new StartPOM(page)
    const datasetPOM = new DatasetPOM(page)
    const geometryTypePOM = new GeometryTypePOM(page)
    const uploadMethodPOM = new UploadMethodPOM(page)

    await startPOM.navigateHere()
    await startPOM.clickStartNow()

    await datasetPOM.waitForPage()
    await datasetPOM.selectDataset(DatasetPOM.datasets.Tree)
    await datasetPOM.clickContinue()

    await geometryTypePOM.waitForPage()
    await geometryTypePOM.selectUploadMethod(GeometryTypePOM.geometryTypes.Point)
    await geometryTypePOM.clickContinue()

    await uploadMethodPOM.waitForPage()
    await uploadMethodPOM.goBack()

    // for now we go back to the dataset selection page, maybe in the future we might want to go back to the geometry type page here
    await datasetPOM.waitForPage()
    await datasetPOM.goBack()

    await startPOM.waitForPage()
  })

  test('upload file page', async ({ page, baseURL }) => {
    const startPOM = new StartPOM(page)
    const datasetPOM = new DatasetPOM(page)
    const uploadMethodPOM = new UploadMethodPOM(page)
    const uploadFilePOM = new UploadFilePOM(page)

    await startPOM.navigateHere()
    await startPOM.clickStartNow()

    await datasetPOM.waitForPage()
    await datasetPOM.selectDataset(DatasetPOM.datasets.Article_4_direction_area_dataset)
    await datasetPOM.clickContinue()

    await uploadMethodPOM.waitForPage()
    await uploadMethodPOM.selectUploadMethod(UploadMethodPOM.uploadMethods.File)
    await uploadMethodPOM.clickContinue()

    await uploadFilePOM.waitForPage()
    await uploadFilePOM.goBack()

    await uploadMethodPOM.waitForPage()
    await uploadMethodPOM.goBack()

    await datasetPOM.waitForPage()
    await datasetPOM.goBack()

    await startPOM.waitForPage()
  })

  test('upload url page', async ({ page, baseURL }) => {
    const startPOM = new StartPOM(page)
    const datasetPOM = new DatasetPOM(page)
    const uploadMethodPOM = new UploadMethodPOM(page)
    const uploadURLPOM = new UploadURLPOM(page)

    await startPOM.navigateHere()
    await startPOM.clickStartNow()

    await datasetPOM.waitForPage()
    await datasetPOM.selectDataset(DatasetPOM.datasets.Article_4_direction_area_dataset)
    await datasetPOM.clickContinue()

    await uploadMethodPOM.waitForPage()
    await uploadMethodPOM.selectUploadMethod(UploadMethodPOM.uploadMethods.URL)
    await uploadMethodPOM.clickContinue()

    await uploadURLPOM.waitForPage()
    await uploadURLPOM.goBack()

    await uploadMethodPOM.waitForPage()
    await uploadMethodPOM.goBack()

    await datasetPOM.waitForPage()
    await datasetPOM.goBack()

    await startPOM.waitForPage()
  })
})
