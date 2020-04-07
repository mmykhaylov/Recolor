import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import Loading from './General/Loading';

const Hero = React.lazy(() => import('./Hero/Hero'));
const Palette = React.lazy(() => import('./Palette/Palette'));
const CreatePalette = React.lazy(() => import('./CreatePalette/CreatePalette'));

function App() {
  return (
    <>
      <Normalize />
      <Router>
        <Switch>
          <Route path="/palette/new" exact>
            <Suspense fallback={<Loading />}>
              <CreatePalette />
            </Suspense>
          </Route>
          <Route path="/" exact>
            <Suspense fallback={<Loading />}>
              <Hero />
            </Suspense>
          </Route>
          <Route path="/palette/:paletteId" exact>
            <Suspense fallback={<Loading />}>
              <Palette />
            </Suspense>
          </Route>
          <Route path="/palette/:paletteId/:colorId" exact>
            <Suspense fallback={<Loading />}>
              <Palette singleColor />
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
