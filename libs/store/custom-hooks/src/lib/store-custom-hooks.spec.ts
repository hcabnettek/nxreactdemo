import { renderHook } from "@testing-library/react-hooks";
import { useFetch } from './store-custom-hooks';


describe('useFetch', () => {
  it('should work', () => {
    const url = `https://hn.algolia.com/api/v1/search?query=`;
    const { result } = renderHook(() => useFetch(url));
    const {current: {data, status} } = result;

    expect(status).toEqual('error');
    expect(data).toEqual([]);

  });
});
