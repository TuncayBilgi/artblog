import React from 'react';
//import { act, render, waitFor } from '@testing-library/react';
import renderer,{act} from 'react-test-renderer';
import Header from '../components/Header';
import { getCategories } from '../services';

jest.mock('../services', () => ({
  getCategories: jest.fn(),
}));



describe('Header', () => {

  beforeEach(() => {
    (getCategories as jest.Mock).mockResolvedValue([{ name: 'category', slug: 'slug' }, { name: 'category3', slug: 'slug2' }]);
  });

  it('renders correctly', async () => {
      const element = renderer.create(<Header/>).toJSON();
      expect(element).toMatchSnapshot();
  });
});