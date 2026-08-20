import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { ProofPage } from './ProofPage';

describe('ProofPage', () => {
  // Catches the proof page being absent or losing its semantic PACE content/start action.
  it('presents the PACE foundation with one clear start action', () => {
    render(<ProofPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'PACE' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Your personal running coach.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });
});
