import { useEffect } from 'react'

// @ https://usehooks.com/useOnClickOutside/
const useClickOutside = (ref, handler) => {
    useEffect(() => {
            const listener = (event) => {
                if(!ref.current.contains(event.target)) {
                    handler(event)
                }
                }
            document.addEventListener("mousedown", listener);

            return () => {
                document.removeEventListener("mousedown", listener);
              };
        }, [ref, handler]
    )

}

export default useClickOutside