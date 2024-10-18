import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/router';
import store from 'src/store';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
