import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { ApiType } from '../src/types';
import { useService } from '../src/index';

describe('useService', () => {
  it('should return successful', async () => {
    let response: any = null;

    function Page(): JSX.Element {
      const { data, error } = useService(
        'ram',
        'ListUsers',
        {
          apiType: ApiType.open,
          method: 'post',
          url: 'https://mocks.alibaba-inc.com/mock/oneconsole/data/api.json',
          data: {
            sec_token: '',
            collina: '',
            umid: '',
            region: '',
          },
        },
        {},
        true
      );

      if (error) console.log('response Error:', error);

      response = data;

      return <div>{JSON.stringify(data)}</div>;
    }
    const { container } = render(<Page />);

    await waitFor(
      () => {
        if (response === undefined) throw new Error('not response');
        expect(response).not.toBeNull();
      },
      { container }
    );
  });
});
