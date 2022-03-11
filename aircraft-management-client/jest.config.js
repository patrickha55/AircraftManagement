module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [
        './src/setupTests.js',
        "@testing-library/jest-dom/extend-expect"
    ],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
}