import { useState, useEffect } from "react";

type DocumentSize = {
    width: number;
    height: number;
} | null;

function useDocumentSize(): DocumentSize {
    const [size, setSize] = useState<DocumentSize>(typeof window !== "undefined" ? {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    } : null);

    useEffect(() => {
        function handleResize() {
            setSize({
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return size;
}

export { useDocumentSize };