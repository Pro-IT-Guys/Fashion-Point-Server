import { IReturn } from './return.interface'
import returnPolicyModel from './return.model'

const createReturnPolicy = async (data: IReturn) => {
  const existingReturnPolicy = await returnPolicyModel.findOne()

  if (existingReturnPolicy) {
    existingReturnPolicy.content = data.content

    await existingReturnPolicy.save()

    return existingReturnPolicy
  } else {
    // Create new document if no existing document is found
    const returns = new returnPolicyModel(data)
    await returns.save()

    return returns
  }
}

const getReturnPolicy = async () => {
  const existingReturnPolicy = await returnPolicyModel.findOne()
  return existingReturnPolicy
}

export const ReturnPolicyServices = {
  createReturnPolicy,
  getReturnPolicy,
}
