import React, { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './route';

//解决 react-router@6 直接使用useRoutes时，出现useRoutes() may be used only in the context of a ＜Router＞ component.
function RoueContent() {
  const ele = useRoutes(routes);
  return <>{ele}</>;
}

function App() {
  console.log(333);
  return (
    <Suspense fallback={null}>
      <BrowserRouter basename="/">
        <RoueContent />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
