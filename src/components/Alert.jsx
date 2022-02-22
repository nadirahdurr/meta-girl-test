
import { ExclamationIcon } from '@heroicons/react/solid'

const Alert = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
    <div className="flex justify-center">
      <div className="">
        <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div className="">
        <p className="text-sm text-yellow-700">
          <a href="#" className="font-medium text-yellow-700 hover:text-yellow-600">
          Your wallet is connected to the wrong network. Please switch to Ethereum Mainnet.
          </a>
        </p>
      </div>
    </div>
  </div>
  )
}


export default Alert