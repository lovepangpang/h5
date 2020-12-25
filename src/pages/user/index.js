import 'src/commons/styles/base.scss';
let env = '';
if (process.env.NODE_ENV === 'development') {
    env = '开发环境！';
} else if (process.env.NODE_ENV === 'production') {
    env = '生产环境！';
} else if (process.env.NODE_ENV === 'uat') {
    env = '生产环境uat！';
} else if (process.env.NODE_ENV === 'test') {
    env = '生产环境test！';
}

document.write(`我是用户页面${env}`);