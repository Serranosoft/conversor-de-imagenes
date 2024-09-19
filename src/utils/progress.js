export function startProgress(setProgress) {

    let time = 0;
    const interval = setInterval(() => {
        time += 0.1;
        if (time <= 1.1) {
            setProgress(time);
        } else {
            clearInterval(interval);
        }
    }, 100);
}