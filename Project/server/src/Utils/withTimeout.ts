// src/utils/withTimeout.ts
export function withTimeout<T>(
    promise: Promise<T>,
    ms: number,
    errorMessage = "Operation timed out"
): Promise<T> {
    let timer: NodeJS.Timeout;
    const timeoutPromise = new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
            reject(new Error(errorMessage));
        }, ms);
    });

    // Appena una delle due (promise o timeout) si risolve, 
    // cancella il timer per non tenerlo in memoria.
    return Promise.race([promise, timeoutPromise]).then((result) => {
        clearTimeout(timer);
        return result as T;
    });
}
