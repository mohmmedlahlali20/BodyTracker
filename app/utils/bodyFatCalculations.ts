 const calculateBodyFat = (gender: 'male' | 'female', waist: number, neck: number, height: number, hip?: number): number => {
    let bodyFatPercentage: number;

    if (gender === 'male') {
        bodyFatPercentage = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
        if (hip === undefined) {
            throw new Error('Hip measurement is required for female calculations');
        }
        bodyFatPercentage = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }

    return Math.max(0, Math.min(bodyFatPercentage, 100));
};



export default calculateBodyFat;