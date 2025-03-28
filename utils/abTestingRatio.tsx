
export const abTestingRatio = (abRatio: number) => {
    const sessionAbTesting = localStorage.getItem("abTesting");
    if (sessionAbTesting !== null) {
        return sessionAbTesting === "true";
    } else {
         //0.9 90% true 10% false 0.1 90% false 10% true
        const abCalc = Math.random() < abRatio;
        localStorage.setItem("abTesting", String(abCalc))
        return abCalc
    }
}