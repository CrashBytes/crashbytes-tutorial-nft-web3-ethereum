import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

// Provide a minimal window.ethereum stub so wallet-aware components mount and
// unmount cleanly in jsdom (no real MetaMask provider is available in tests).
beforeEach(() => {
  window.ethereum = {
    on: jest.fn(),
    removeListener: jest.fn(),
    request: jest.fn().mockResolvedValue([]),
  };
});

afterEach(() => {
  cleanup();
  delete window.ethereum;
});

describe('App', () => {
  test('renders the CrashBytes NFT title', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /crashbytes nft/i })
    ).toBeInTheDocument();
  });

  test('renders the Connect Wallet button when no wallet is connected', () => {
    render(<App />);
    expect(
      screen.getByRole('button', { name: /connect wallet/i })
    ).toBeInTheDocument();
  });

  test('renders the tutorial footer link', () => {
    render(<App />);
    const link = screen.getByRole('link', { name: /crashbytes nft tutorial/i });
    expect(link).toHaveAttribute('href');
  });
});
