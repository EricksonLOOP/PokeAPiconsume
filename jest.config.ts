export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Para suportar TypeScript
    },
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Para lidar com imports de CSS
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Para lidar com imagens
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Para facilitar asserts com jest-dom
    testMatch: ['**/?(*.)+(test).[jt]s?(x)'], // Procura por arquivos de teste que terminam com .test.ts ou .test.tsx
};
