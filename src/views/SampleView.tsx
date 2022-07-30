import { useDispatch } from 'react-redux';

import { useAppSelector } from '../hooks/useAppSelector';
import { increment } from '../store/modules/sample/actions';

export const SampleView = () => {
  const dispatch = useDispatch();
  const count = useAppSelector((state) => state.sampleReducer.count);

  return (
    <main>
      <section>
        <h1 className="font-bold text-2xl">Hello world!</h1>
        <div className="flex flex-col">
          <span>Current count: {count}</span>
          <button className="border border-blue-400" onClick={() => dispatch(increment())}>
            Increment
          </button>
        </div>
      </section>
    </main>
  );
};
