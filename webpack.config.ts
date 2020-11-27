import * as webpack from 'webpack';
import * as path from 'path';
import * as nodeExternals from 'webpack-node-externals';

export const ROOT_PATH = __dirname;

const DIST_PATH = path.join(__dirname, 'dist');
const SRC_PATH = path.join(__dirname, 'src');

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = parseInt(process.env.PORT || '2016', 0);

const config = {
    context: SRC_PATH,
    mode: NODE_ENV,
    module: {
        rules: []
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    filename: 'js/static.js',
                    name: 'static',
                    test: /node_modules|vendors/
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.PORT': JSON.stringify(process.env.PORT || 2016)
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
        alias: {
            "@kitcon/core": path.join(ROOT_PATH, '..', 'kitcon-core', 'src'),
            "@kitcon/ui": path.join(ROOT_PATH, '..', 'kitcon-ui', 'src'),
            "@kitcon/node": path.join(ROOT_PATH, '..', 'kitcon-node', 'src')
        }
    }
};

module.exports = [
    {
        ...config,
        devtool: NODE_ENV === 'development' ? 'source-map' : null,
        entry: {
            server: path.join(SRC_PATH, 'auth.bootstrap.ts')
        },
        module: {
            rules: [
                ...config.module.rules,
                {
                    test: /\.(ts|tsx)?$/,
                    use: {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: 'tsconfig.json'
                        }
                    }
                }
            ]
        },
        output: {
            filename: '[name].js',
            path: path.join(DIST_PATH)
        },
        externals: [
            nodeExternals({
                allowlist: [/kitcon\//]
            })
        ],
        plugins: [
            ...config.plugins,
            new webpack.DefinePlugin({
                'global.ROOT_PATH': JSON.stringify(ROOT_PATH),
            })
        ],
        target: 'node'
    }
];
