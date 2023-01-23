import { useRef, useCallback, useMemo } from 'react';

export default function usePersistCallback(fn) {
    const ref = useRef();

    ref.current = useMemo(() => fn, [fn]);

    return useCallback(
        (...args) => {
            const fn = ref.current;
            return fn && fn(...args);
        },
        [ref],
    );
}