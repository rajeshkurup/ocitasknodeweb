import { render, screen } from '@testing-library/react';
import OciTaskTable from './OciTaskTable.js';

test('renders oci tasks header', () => {
  render(<OciTaskTable />);
  const linkElement = screen.getByText(/oci tasks/i);
  expect(linkElement).toBeInTheDocument();
});
