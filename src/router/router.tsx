import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import routes from './routes'

const Router: React.FC = () => (
  <HashRouter>
    <Switch>
      {Object.keys(routes).map((id) => {
        const route = routes[id]

        return <Route exact key={id} path={route.path} component={route.page} />
      })}
    </Switch>
  </HashRouter>
)

export default Router
