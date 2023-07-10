'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.ReturnPolicyServices = void 0
const return_model_1 = __importDefault(require('./return.model'))
const createReturnPolicy = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const existingReturnPolicy = yield return_model_1.default.findOne()
    if (existingReturnPolicy) {
      existingReturnPolicy.content = data.content
      yield existingReturnPolicy.save()
      return existingReturnPolicy
    } else {
      // Create new document if no existing document is found
      const returns = new return_model_1.default(data)
      yield returns.save()
      return returns
    }
  })
const getReturnPolicy = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const existingReturnPolicy = yield return_model_1.default.findOne()
    return existingReturnPolicy
  })
exports.ReturnPolicyServices = {
  createReturnPolicy,
  getReturnPolicy,
}
