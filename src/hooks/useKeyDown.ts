import {useEffect} from "react";

export default function useKeyDown(callback: () => void, keys: string[]) {
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            const wasKeyPressed = keys.some((key) => e.key === key);

            if (wasKeyPressed) {
                e.preventDefault();
                callback();
            }
        }
        
        document.addEventListener("keydown", onKeyDown);
        
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        }
    })
}