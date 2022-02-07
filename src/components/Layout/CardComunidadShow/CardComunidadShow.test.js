import { fireEvent } from '@testing-library/react';
// Providers
import { MemoryRouter } from 'react-router-dom';
import { render } from '../../../__test__/test-utils';

// Component
import CardComunidadShow from './CardComunidadShow';

test('render content', () => {
  const title = 'Hola desde Test';
  const users = 100;
  const checks = 12;
  const image = 'ruta de imagen';

  const component = render(
    <CardComunidadShow
      title={title}
      users={users}
      checks={checks}
      image={image}
    />
  );
  component.getByText('Hola desde Test');
});

test('clicking the button calls event handler', () => {
  const title = 'Action';
  const mockHandler = jest.fn();
  const component = render(
    <MemoryRouter>
      <CardComunidadShow title={title} goTo={mockHandler} />
    </MemoryRouter>
  );

  const button = component.getByText('Action');
  fireEvent.click(button);
  expect(mockHandler).toHaveBeenCalledTimes(1);
});
