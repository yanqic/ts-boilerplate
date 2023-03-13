export default {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testMatch: ['**/?(*.)+(spec|test).[jt]s'],
    modulePaths: ['.'],
    moduleDirectories: ['node_modules', 'src'],
    transformIgnorePatterns: ['<rootDir>/node_modules'],
    moduleFileExtensions: ['js', 'ts']
};
