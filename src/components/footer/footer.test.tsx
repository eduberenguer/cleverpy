import { render, screen } from '@testing-library/react';
import { Footer } from './footer';
import '@testing-library/jest-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Given a Footer component', () => {
  describe('When it is intantiated', () => {
    render(
      <Router>
        <Provider store={store}>
          <Footer></Footer>
        </Provider>
      </Router>
    );

    test('Then it should be in the document', () => {
      const element = screen.getByRole('contentinfo');
      expect(element).toBeInTheDocument();
    });
  });
});
