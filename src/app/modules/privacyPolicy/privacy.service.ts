import { IPrivacy } from "./privacy.interface"
import privacyModel from "./privacy.model"


const createPrivacyPolicy = async (data: IPrivacy) => {
  const existingTerms = await privacyModel.findOne()

  if (existingTerms) {
    existingTerms.content = data.content

    await existingTerms.save()

    return existingTerms
  } else {
    // Create new document if no existing document is found
    const terms = new privacyModel(data)
    await terms.save()

    return terms
  }
}

const getPrivacyPolicy = async () => {
    const existingTerms = await privacyModel.findOne()
    return existingTerms
}

export const PrivacyServices = {
    createPrivacyPolicy,
getPrivacyPolicy
}
