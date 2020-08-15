import * as Pages from '../pages'

import paths from './paths'

interface Routes {
  [key: string]: {
    path: string
    page: React.ComponentClass<any, any> | React.FunctionComponent<any>
  }
}

const routes: Routes = {
  root: {
    path: paths.ROOT,
    page: Pages.StartPage,
  },
  cards: {
    path: paths.CARDS,
    page: Pages.CardsPage,
  },
}

export default routes
