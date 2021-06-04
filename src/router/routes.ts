import App from '../App'
import TextComponent from '../text/text'

import paths from './paths'

interface Routes {
  [key: string]: {
    path: string
    page: React.ComponentClass<any, any> | React.FunctionComponent<any>
  }
}

const routes: Routes = {
  root: {
    path: paths.root,
    page: App,
  }
}

export default routes
