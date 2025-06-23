import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => '1',
  }),
}));

import PhotoGrid from '@/components/PhotoGrid';
import type { Photo } from '@/types/index';

const mockPhotos: Photo[] = [
  { albumId: 1, id: 1, title: 'Photo 1', url: '', thumbnailUrl: 'thumb1.jpg' },
  { albumId: 1, id: 2, title: 'Photo 2', url: '', thumbnailUrl: 'thumb2.jpg' },
];

describe('PhotoGrid thumbnails and click', () => {
  it('renders different thumbnails for each photo and allows clicking', () => {
    render(<PhotoGrid photos={mockPhotos} />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);

    expect(images[0]).toHaveAttribute('src', expect.stringContaining('1'));
    expect(images[1]).toHaveAttribute('src', expect.stringContaining('2'));

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(2);

    fireEvent.click(links[0]);
    expect(screen.getByText('Photo 1')).toBeInTheDocument();
  });
});
