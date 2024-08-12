import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './views/Login'; // Adjust the import path as necessary
import axiosClient from './axiosClient'; // Mock axiosClient for testing
import '@testing-library/jest-dom';

jest.mock('./axiosClient', () => ({
  post: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks();
});

test('renders Login component and handles errors', async () => {
  // Mocking successful response
  axiosClient.post.mockResolvedValue({
    data: {
      user: { id: 1, name: 'Test User' },
      token: 'fake-token',
    },
  });

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  // Simulate user input
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'luella80@example.org' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123@' } });

  // Simulate form submission
  fireEvent.click(screen.getByText(/login/i));

  // Wait for async actions
  await waitFor(() => {
    // Assert no error message is visible if inputs are valid
    expect(screen.queryByText(/error/i)).toBeNull();
  });

  // Mocking error response
  axiosClient.post.mockRejectedValue({
    response: {
      status: 422,
      data: {
        errors: {
          email: ['Email is required.'],
        },
      },
    },
  });

  // Simulate invalid input
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: '' } }); // Invalid email
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '' } }); // Invalid password
  fireEvent.click(screen.getByText(/login/i)); // Submit again

  // Wait for async actions
  await waitFor(() => {
    // Assert error message is visible after invalid input
    expect(screen.getByText(/Email is required./i)).toBeInTheDocument();
  });
});
