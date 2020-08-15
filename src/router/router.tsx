import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import routes from './routes'

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      {Object.keys(routes).map((id) => {
        const route = routes[id]

        return <Route exact key={id} route={id} path={route.path} component={route.page} />
      })}
    </Switch>
  </BrowserRouter>
)

export default Router
