import { router } from 'expo-router';

export const navigateToScreenTwo = () => {
    router.push('./(boarding)/screentwo');
};

export const navigateToScreenThree = () => {
    router.push('./(boarding)/screenthree');
};

export const navigateToScreenOne = () => {
    router.push('../../app/(boarding)/screenone');
};

export const navigateToSignIn = () => {
    router.push('../../app/(auth)/sign_in');
};


export const navigateToIndexPage = () => {
    router.push('../../app/index');
};

