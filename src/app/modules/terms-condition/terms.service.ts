import { ITerms } from './terms.interface'
import termsModel from './terms.model'

const createTermsConditionService = async (data: ITerms) => {
  const existingTerms = await termsModel.findOne()

  if (existingTerms) {
    existingTerms.content = data.content

    await existingTerms.save()

    return existingTerms
  } else {
    // Create new document if no existing document is found
    const terms = new termsModel(data)
    await terms.save()

    return terms
  }
}

const getTermsConditionService = async () => {
  const existingTerms = await termsModel.findOne()
  return existingTerms
}

export const TermsConditionService = {
  createTermsConditionService,
  getTermsConditionService,
}
