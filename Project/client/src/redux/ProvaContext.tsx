import { createContext } from "react";

interface ProvaContextType {
    count: number;
    setCount(arg0: number): void;
}

export const ProvaContext = createContext<ProvaContextType>({
    count: 0,
    setCount(value) {
        this.count = value;
    },
});