import { useAppState } from 'src/hooks/useAppState';
import { mockData } from 'test/mockData';

jest.mock('src/hooks/useAppState');

(useAppState as jest.MockedFunction<typeof useAppState>).mockReturnValue({
  state: {
    technologies: mockData,
    selected: null,
  },
});
