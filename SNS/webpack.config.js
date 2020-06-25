const path = require("path");
const { NODE_ENV = "production" } = process.env;

module.exprots = {
    entry: "./src/app.ts",
    mode: NODE_ENV,
    target: "node",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.ts"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }      
        ]
    },
    devtool: "source-map"
};